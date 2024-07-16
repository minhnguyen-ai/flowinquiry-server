package io.flexwork.config;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.test.context.ContextConfigurationAttributes;
import org.springframework.test.context.ContextCustomizer;
import org.springframework.test.context.ContextCustomizerFactory;

public class KeycloakTestContainerSpringContextCustomizer implements ContextCustomizerFactory {

    private static final Logger log =
            LoggerFactory.getLogger(KeycloakTestContainerSpringContextCustomizer.class);

    private KeycloakTestContainer keycloakContainer;

    @Override
    public ContextCustomizer createContextCustomizer(
            Class<?> testClass, List<ContextConfigurationAttributes> configAttributes) {
        return (context, mergedConfig) -> {
            EmbeddedKeycloak keycloadAnnotation =
                    AnnotatedElementUtils.findMergedAnnotation(testClass, EmbeddedKeycloak.class);
            ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
            if (keycloadAnnotation != null) {
                log.debug(
                        "detected the EmbeddedKeycloak annotation on class {}",
                        testClass.getName());
                log.info("Warming up the keycloak container");
                if (keycloakContainer == null) {
                    keycloakContainer = beanFactory.createBean(KeycloakTestContainer.class);
                    beanFactory.registerSingleton(
                            KeycloakTestContainer.class.getName(), keycloakContainer);
                }
                keycloakContainer.getKeycloakContainer().start();
                TestPropertyValues testValues = TestPropertyValues.empty();
                testValues =
                        testValues.and(
                                "application.keycloak.username="
                                        + keycloakContainer
                                                .getKeycloakContainer()
                                                .getAdminUsername());
                testValues =
                        testValues.and(
                                "application.keycloak.password="
                                        + keycloakContainer
                                                .getKeycloakContainer()
                                                .getAdminPassword());
                testValues =
                        testValues.and(
                                "application.keycloak.server-url="
                                        + keycloakContainer
                                                .getKeycloakContainer()
                                                .getAuthServerUrl());
                testValues = testValues.and("application.keycloak.client-id=admin-cli");
                testValues = testValues.and("application.keycloak.realm=master");
                testValues.applyTo(context);
            }
        };
    }
}
