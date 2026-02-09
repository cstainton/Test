package uk.co.instanto.tearay.persistence;

import java.util.ServiceLoader;

public class DefaultPersistenceUnit extends PersistenceUnit {

    public DefaultPersistenceUnit() {
        for (EntityMapper<?> mapper : ServiceLoader.load(EntityMapper.class)) {
            register((Class) mapper.getEntityClass(), (EntityMapper) mapper);
        }
    }

    @Override
    public String getDatabaseName() {
        return "tearay-db";
    }

    @Override
    public int getDatabaseVersion() {
        return 1;
    }
}
