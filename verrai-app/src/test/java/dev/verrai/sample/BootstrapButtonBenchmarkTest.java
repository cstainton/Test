package dev.verrai.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.TeaVMTestRunner;
import org.teavm.junit.SkipJVM;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class BootstrapButtonBenchmarkTest {

    @Test
    public void benchmarkAddStyle() {
        BootstrapButton btn = new BootstrapButton();
        // Warmup
        for (int i = 0; i < 1000; i++) {
            btn.addStyle("warmup-" + i);
        }

        long start = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            btn.addStyle("test-class-" + i);
        }
        long end = System.currentTimeMillis();
        long duration = end - start;
        System.out.println("BENCHMARK_RESULT: Time taken: " + duration + "ms");
    }
}
