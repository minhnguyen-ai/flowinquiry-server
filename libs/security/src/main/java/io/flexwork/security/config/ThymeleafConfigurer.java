package io.flexwork.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Configuration
public class ThymeleafConfigurer {

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
