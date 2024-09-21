package io.flexwork.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;

@ConfigurationProperties(prefix = "flexwork")
@Getter
public class FlexworkProperties {

    private final Mail mail = new Mail();

    private final Http http = new Http();

    private final Cache cache = new Cache();

    private final CorsConfiguration cors = new CorsConfiguration();

    @Getter
    @Setter
    public static class Mail {
        private boolean enabled = false;
        private String from = "";
        private String baseUrl = "";
    }

    @Getter
    public static class Cache {
        private final Ehcache ehcache = new Ehcache();

        @Getter
        @Setter
        public static class Ehcache {
            private int timeToLiveSeconds = 3600;
            private long maxEntries = 100L;
        }
    }

    @Getter
    public static class Http {
        private final Cache cache = new Cache();

        @Getter
        @Setter
        public static class Cache {
            private int timeToLiveInDays = 1461;
        }
    }
}
