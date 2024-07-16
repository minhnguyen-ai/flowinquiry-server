package io.flexwork.security.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Configuration
public class ThymeleafConfigurer {

    @Configuration
    public static class ThymeleafConfig {
        public ThymeleafConfig(
                TemplateEngine templateEngine,
                @Qualifier("keycloakJsonTemplateResolver") SpringResourceTemplateResolver jsonMessageTemplateResolver) {
            templateEngine.addTemplateResolver(jsonMessageTemplateResolver);
        }
    }

    @Bean(name = "keycloakJsonTemplateResolver")
    public ClassLoaderTemplateResolver jsonMessageTemplateResolver() {
        ClassLoaderTemplateResolver theResourceTemplateResolver = new ClassLoaderTemplateResolver();
        theResourceTemplateResolver.setPrefix("/templates/");
        theResourceTemplateResolver.setSuffix(".json");
        theResourceTemplateResolver.setCharacterEncoding("UTF-8");
        theResourceTemplateResolver.setCacheable(false);
        theResourceTemplateResolver.setOrder(2);
        return theResourceTemplateResolver;
    }
}
