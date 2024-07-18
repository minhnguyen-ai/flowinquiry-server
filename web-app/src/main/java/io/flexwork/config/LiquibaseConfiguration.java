package io.flexwork.config;

import java.util.concurrent.Executor;
import javax.sql.DataSource;
import liquibase.integration.spring.SpringLiquibase;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseDataSource;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import tech.jhipster.config.liquibase.SpringLiquibaseUtil;

@Configuration
public class LiquibaseConfiguration {

    private static final Logger log = LoggerFactory.getLogger(LiquibaseConfiguration.class);

    private final Environment env;

    public LiquibaseConfiguration(Environment env) {
        this.env = env;
    }

    @SneakyThrows
    @Bean
    public SpringLiquibase liquibase(
            @Qualifier("taskExecutor") Executor executor,
            LiquibaseProperties liquibaseProperties,
            @LiquibaseDataSource ObjectProvider<DataSource> liquibaseDataSource,
            ObjectProvider<DataSource> dataSourceProvider,
            DataSourceProperties dataSourceProperties) {
        SpringLiquibase liquibase;

        liquibase =
                SpringLiquibaseUtil.createSpringLiquibase(
                        liquibaseDataSource.getIfAvailable(),
                        liquibaseProperties,
                        dataSourceProvider.getIfUnique(),
                        dataSourceProperties);
        liquibase.setChangeLog("classpath:config/liquibase/master/master.xml");
        liquibase.setContexts(liquibaseProperties.getContexts());
        //        liquibase.setDefaultSchema(DbConstants.MASTER_SCHEMA);
        liquibase.setLiquibaseSchema(liquibaseProperties.getLiquibaseSchema());
        liquibase.setLiquibaseTablespace(liquibaseProperties.getLiquibaseTablespace());
        liquibase.setDatabaseChangeLogLockTable(
                liquibaseProperties.getDatabaseChangeLogLockTable());
        liquibase.setDatabaseChangeLogTable(liquibaseProperties.getDatabaseChangeLogTable());
        liquibase.setDropFirst(liquibaseProperties.isDropFirst());
        liquibase.setLabelFilter(liquibaseProperties.getLabelFilter());
        liquibase.setChangeLogParameters(liquibaseProperties.getParameters());
        liquibase.setRollbackFile(liquibaseProperties.getRollbackFile());
        liquibase.setTestRollbackOnUpdate(liquibaseProperties.isTestRollbackOnUpdate());
        liquibase.setShouldRun(true);
        return liquibase;
    }
}
