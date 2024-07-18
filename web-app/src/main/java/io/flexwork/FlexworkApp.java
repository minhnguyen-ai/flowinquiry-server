package io.flexwork;

import io.flexwork.config.ApplicationProperties;
import io.flexwork.security.domain.Tenant;
import io.flexwork.security.service.TenantService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;
import javax.sql.DataSource;

import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.integration.spring.SpringLiquibase;
import liquibase.resource.ClassLoaderResourceAccessor;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;
import tech.jhipster.config.DefaultProfileUtil;
import tech.jhipster.config.JHipsterConstants;

@SpringBootApplication
@EnableConfigurationProperties({LiquibaseProperties.class, ApplicationProperties.class})
@EntityScan("io.flexwork")
public class FlexworkApp implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(FlexworkApp.class);

    private TenantService tenantService;

    private DataSource dataSource;

    private final Environment env;

    public FlexworkApp(Environment env, DataSource dataSource, TenantService tenantService) {
        this.env = env;
        this.tenantService = tenantService;
        this.dataSource = dataSource;
    }

    /**
     * Initializes flexwork.
     *
     * <p>Spring profiles can be configured with a program argument
     * --spring.profiles.active=your-active-profile
     *
     * <p>You can find more information on how profiles work with JHipster on <a
     * href="https://www.jhipster.tech/profiles/">https://www.jhipster.tech/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
                && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)) {
            log.error(
                    "You have misconfigured your application! It should not run "
                            + "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
                && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)) {
            log.error(
                    "You have misconfigured your application! It should not "
                            + "run with both the 'dev' and 'cloud' profiles at the same time.");
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(FlexworkApp.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static void logApplicationStartup(Environment env) {
        String protocol =
                Optional.ofNullable(env.getProperty("server.ssl.key-store"))
                        .map(key -> "https")
                        .orElse("http");
        String applicationName = env.getProperty("spring.application.name");
        String serverPort = env.getProperty("server.port");
        String contextPath =
                Optional.ofNullable(env.getProperty("server.servlet.context-path"))
                        .filter(StringUtils::isNotBlank)
                        .orElse("/");
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info("----------------------------------------------------------");
        log.info("\tApplication '{}' is running! Access URLs:", applicationName);
        log.info("\tLocal: \t\t{}://localhost:{}{}", protocol, serverPort, contextPath);
        log.info("\tExternal: \t{}://{}:{}{}", protocol, hostAddress, serverPort, contextPath);
        log.info(
                "\tProfile(s): \t{}",
                env.getActiveProfiles().length == 0
                        ? env.getDefaultProfiles()
                        : env.getActiveProfiles());
    }

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        Tenant defaultTenant = tenantService.getDefaultTenant();
        log.debug("Default tenant: {}", defaultTenant);
        try (Connection connection = dataSource.getConnection()) {
            connection.prepareCall("CREATE SCHEMA IF NOT EXISTS flexwork").execute();
            // Create the database for the default tenant
            Database database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(new JdbcConnection(connection));
            database.setDefaultSchemaName(defaultTenant.getName());
            Liquibase liquibase = new Liquibase("config/liquibase/tenant/master.xml", new ClassLoaderResourceAccessor(), database);
            liquibase.update(new Contexts(), new LabelExpression());
        }
    }
}
