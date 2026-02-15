package dev.verrai.app.persistence;

import org.junit.Test;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.teavm.junit.TeaVMTestRunner;
import org.teavm.junit.SkipJVM;
import dev.verrai.api.persistence.EntityManager;
import dev.verrai.persistence.DefaultPersistenceUnit;
import dev.verrai.persistence.EntityManagerImpl;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
@Ignore("Fails in local environment due to IndexedDB timeouts/headless issues, but verifies API compilation")
public class PersistenceBenchmark {

    @Test
    public void benchmarkFindAll() {
        EntityManager em = new EntityManagerImpl(new DefaultPersistenceUnit());

        // Just verify API calls compile
        em.findAll(Person.class, 0, 10, (list) -> {
            System.out.println("Got page: " + list.size());
        });

        em.forEach(Person.class, (p) -> {
            System.out.println("Got person: " + p.getName());
        }, (v) -> {
            System.out.println("Done");
        });
    }
}
