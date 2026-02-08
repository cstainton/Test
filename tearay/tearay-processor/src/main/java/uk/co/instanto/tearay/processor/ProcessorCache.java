package uk.co.instanto.tearay.processor;

import javax.annotation.processing.Filer;
import javax.annotation.processing.Messager;
import javax.annotation.processing.ProcessingEnvironment;
import javax.tools.Diagnostic;
import javax.tools.FileObject;
import javax.tools.StandardLocation;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

public class ProcessorCache {
    private static final String CACHE_FILE = "META-INF/tearay-processor-cache.properties";
    private final Filer filer;
    private final Messager messager;
    private final Properties cache = new Properties();
    private boolean loaded = false;

    public ProcessorCache(ProcessingEnvironment processingEnv) {
        this.filer = processingEnv.getFiler();
        this.messager = processingEnv.getMessager();
    }

    private void load() {
        if (loaded) return;
        try {
            FileObject resource = filer.getResource(StandardLocation.CLASS_OUTPUT, "", CACHE_FILE);
            try (InputStream is = resource.openInputStream()) {
                cache.load(is);
                // messager.printMessage(Diagnostic.Kind.NOTE, "Tearay: Processor cache loaded.");
            }
        } catch (IOException e) {
            // Cache file might not exist yet, ignore
            // messager.printMessage(Diagnostic.Kind.NOTE, "Tearay: No existing processor cache found.");
        }
        loaded = true;
    }

    public boolean isChanged(String className, String signature) {
        if ("true".equalsIgnoreCase(System.getProperty("tearay.cache.disabled"))) {
            return true;
        }

        load();
        String cachedSignature = cache.getProperty(className);
        boolean changed = cachedSignature == null || !cachedSignature.equals(signature);

        if (!changed) {
            messager.printMessage(Diagnostic.Kind.NOTE, "Tearay: Skipping generation for " + className + " (Unchanged)");
        }

        return changed;
    }

    public void update(String className, String signature) {
        cache.setProperty(className, signature);
    }

    public void save() {
        if ("true".equalsIgnoreCase(System.getProperty("tearay.cache.disabled"))) {
             return;
        }
        try {
            FileObject resource = filer.createResource(StandardLocation.CLASS_OUTPUT, "", CACHE_FILE);
            try (OutputStream os = resource.openOutputStream()) {
                cache.store(os, "Tearay Processor Cache");
                // messager.printMessage(Diagnostic.Kind.NOTE, "Tearay: Processor cache saved.");
            }
        } catch (IOException e) {
            messager.printMessage(Diagnostic.Kind.WARNING, "Tearay: Failed to save processor cache: " + e.getMessage());
        }
    }
}
