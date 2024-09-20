package io.flexwork.config;

import jakarta.ws.rs.DefaultValue;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "flexwork")
public record FlexworkProperties(Mail mail) {

    public record Mail(@DefaultValue("") String from, @DefaultValue("") String baseUrl) {}
}
