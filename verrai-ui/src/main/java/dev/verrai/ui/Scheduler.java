package dev.verrai.ui;

public interface Scheduler {
    Cancellable scheduleDeferred(Runnable command);
    Cancellable scheduleDelay(int delayMs, Runnable command);
    Cancellable scheduleFixedPeriod(int periodMs, Runnable command);
    Cancellable scheduleAnimation(Runnable command);
}
