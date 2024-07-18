package io.flexwork.platform.db.service;

import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.LiquibaseException;
import liquibase.resource.ClassLoaderResourceAccessor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Service
public class LiquibaseService {

    private static final Logger log = LoggerFactory.getLogger(LiquibaseService.class);

    private DataSource dataSource;

    public LiquibaseService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @SneakyThrows
    public void createTenantDbSchema(String schema) {
        try (Connection connection = dataSource.getConnection()) {
            log.info("Going to create a schema {}", schema);
            connection.prepareCall("CREATE SCHEMA IF NOT EXISTS " + schema).execute();
            // Create the database for the default tenant
            Database database =
                    DatabaseFactory.getInstance()
                            .findCorrectDatabaseImplementation(new JdbcConnection(connection));
            database.setDefaultSchemaName(schema);
            Liquibase liquibase =
                    new Liquibase(
                            "config/liquibase/tenant/master.xml",
                            new ClassLoaderResourceAccessor(),
                            database);
            liquibase.update(new Contexts(), new LabelExpression());
        }
    }
}
