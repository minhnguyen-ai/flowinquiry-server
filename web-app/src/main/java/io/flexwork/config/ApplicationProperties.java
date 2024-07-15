package io.flexwork.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Flexwork App.
 *
 * <p>Properties are configured in the {@code application.yml} file. See {@link
 * tech.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
@Getter
public class ApplicationProperties {

    private final Liquibase liquibase = new Liquibase();

    private final Keycloak keycloak = new Keycloak();

    @Getter
    @Setter
    public static class Liquibase {
        private Boolean asyncStart;
    }

    @Getter
    @Setter
    public static class Keycloak {
        private String realm;
        private String clientId;
        private String serverUrl;
        private String username;
        private String password;
    }
}
