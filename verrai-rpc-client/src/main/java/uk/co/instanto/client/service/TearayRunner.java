package uk.co.instanto.client.service;

import dev.verrai.rpc.common.transport.stomp.StompClient;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TearayRunner {

    private static final Logger logger = LoggerFactory.getLogger(TearayRunner.class);

    public interface Configurer {
        void configure(UnitRegistry registry);
    }

    public static <T extends TearayApplication> void run(Class<T> appClass, Configurer configurer) {
        try {
            // 1. Create App Instance
            T appInstance = appClass.getDeclaredConstructor().newInstance();

            // 2. Setup Registry
            UnitRegistry registry = UnitRegistry.getInstance();
            configurer.configure(registry);

            // 3. Scan for @Inject fields AND @Service implementations
            List<Field> injectFields = new ArrayList<>();
            for (Field field : appClass.getDeclaredFields()) {
                // Dependency Injection
                if (field.isAnnotationPresent(Inject.class)) {
                    injectFields.add(field);
                }

                // Automatic Service Registration (Provider)
                try {
                    field.setAccessible(true);
                    Object value = field.get(appInstance);
                    if (value != null) {
                        registerProvider(registry, value);
                    }
                } catch (Exception e) {
                    // Ignore
                }
            }

            if (injectFields.isEmpty()) {
                appInstance.onStart();
                return;
            }

            // 4. Wait for dependencies
            AtomicInteger remaining = new AtomicInteger(injectFields.size());

            for (Field field : injectFields) {
                field.setAccessible(true);
                Class<?> type = field.getType();

                // Handle Caller<T> injection
                if (Caller.class.isAssignableFrom(type)) {
                    java.lang.reflect.ParameterizedType pt = (java.lang.reflect.ParameterizedType) field
                            .getGenericType();
                    Class<?> serviceType = (Class<?>) pt.getActualTypeArguments()[0];

                    registry.awaitService(serviceType, serviceStub -> {
                        try {
                            Caller<?> caller = new CallerImpl<>(serviceStub);
                            field.set(appInstance, caller);
                            checkDone(remaining, appInstance);
                        } catch (IllegalAccessException e) {
                            e.printStackTrace();
                        }
                    });
                } else {
                    // Direct Service Injection
                    registry.awaitService(type, serviceStub -> {
                        try {
                            field.set(appInstance, serviceStub);
                            checkDone(remaining, appInstance);
                        } catch (IllegalAccessException e) {
                            e.printStackTrace();
                        }
                    });
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to run TearayApplication", e);
        }
    }

    private static <T> void checkDone(AtomicInteger remaining, T appInstance) {
        if (remaining.decrementAndGet() == 0) {
            // All dependencies resolved!
            if (appInstance instanceof TearayApplication) {
                ((TearayApplication) appInstance).onStart();
            }
        }
    }

    private static void registerProvider(UnitRegistry registry, Object value) {
        boolean implAnnotated = isService(value.getClass());

        for (Class<?> iface : value.getClass().getInterfaces()) {
            boolean ifaceAnnotated = isService(iface);

            if (implAnnotated || ifaceAnnotated) {
                if (iface.getName().startsWith("java.") || iface.getName().startsWith("javax.")) {
                    continue;
                }

                // Try to load Dispatcher to confirm it is a valid service
                try {
                    String dispatcherName = iface.getName() + "_Dispatcher";
                    Class<?> dispatcherClass = Class.forName(dispatcherName);

                    logger.info("Auto-registering local service: {}", iface.getName());
                    registry.registerLocal(iface.getName(), value);

                    // Use no-arg constructor if possible, or look for specific one
                    uk.co.instanto.client.service.transport.ServiceDispatcher dispatcher = (uk.co.instanto.client.service.transport.ServiceDispatcher) dispatcherClass
                            .getDeclaredConstructor().newInstance();
                    registry.registerDispatcher(iface.getName(), dispatcher);
                } catch (Exception e) {
                    // Dispatcher not found, so maybe not a service or not generated yet.
                    if (ifaceAnnotated) {
                        logger.warn("Service dispatcher not found for {}", iface.getName());
                    }
                }
            }
        }
    }

    private static boolean isService(Class<?> cls) {
        // Simple check: does it have @Service annotation?
        // We look for name ending in .Service to avoid import deps if possible,
        // or just check valid annotation
        for (java.lang.annotation.Annotation ann : cls.getAnnotations()) {
            if (ann.annotationType().getName().endsWith(".Service")) {
                return true;
            }
        }
        return false;
    }
}
