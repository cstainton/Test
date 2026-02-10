package uk.co.instanto.tearay.app.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.TeaVMTestRunner;
import org.teavm.junit.SkipJVM;
import uk.co.instanto.tearay.api.persistence.EntityManager;
import uk.co.instanto.tearay.persistence.DefaultPersistenceUnit;
import uk.co.instanto.tearay.persistence.EntityManagerImpl;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class PersistenceTest {

    @Test
    public void testPersistAndFind() throws InterruptedException {
        final boolean[] done = {false};
        final Person[] result = {null};
        final String[] error = {null};

        Person p = new Person();
        p.setName("John");
        p.setAge(30);

        EntityManager em = new EntityManagerImpl(new DefaultPersistenceUnit());

        em.persist(p, (v) -> {
            // Need to check if ID was generated
            if (p.getId() == null) {
                error[0] = "ID not generated";
                done[0] = true;
                return;
            }

            em.find(Person.class, p.getId(), (found) -> {
                if (found == null) {
                    error[0] = "Not found";
                } else {
                    result[0] = found;
                }
                done[0] = true;
            });
        });

        long start = System.currentTimeMillis();
        while (!done[0]) {
             if (System.currentTimeMillis() - start > 5000) {
                 throw new RuntimeException("Timeout waiting for persist/find");
             }
             Thread.sleep(100);
        }

        if (error[0] != null) throw new RuntimeException(error[0]);
        if (result[0] == null) throw new RuntimeException("Result is null");
        if (!"John".equals(result[0].getName())) throw new RuntimeException("Name mismatch: " + result[0].getName());
        if (result[0].getAge() != 30) throw new RuntimeException("Age mismatch: " + result[0].getAge());
        if (result[0].getId() == null) throw new RuntimeException("ID is null");
    }
}
