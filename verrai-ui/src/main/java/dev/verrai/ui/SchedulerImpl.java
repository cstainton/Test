package dev.verrai.ui;

import org.teavm.jso.browser.Window;
import dev.verrai.api.ApplicationScoped;

@ApplicationScoped
public class SchedulerImpl implements Scheduler {

    @Override
    public Cancellable scheduleDeferred(Runnable command) {
        return scheduleDelay(0, command);
    }

    @Override
    public Cancellable scheduleDelay(int delayMs, Runnable command) {
        int id = Window.current().setTimeout(() -> command.run(), delayMs);
        return () -> Window.current().clearTimeout(id);
    }

    @Override
    public Cancellable scheduleFixedPeriod(int periodMs, Runnable command) {
        int id = Window.current().setInterval(() -> command.run(), periodMs);
        return () -> Window.current().clearInterval(id);
    }

    @Override
    public Cancellable scheduleAnimation(Runnable command) {
        int id = Window.current().requestAnimationFrame(timestamp -> command.run());
        return () -> Window.current().cancelAnimationFrame(id);
    }
}
