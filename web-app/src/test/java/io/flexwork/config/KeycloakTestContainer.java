package io.flexwork.config;

import dasniko.testcontainers.keycloak.KeycloakContainer;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

public class KeycloakTestContainer implements InitializingBean, DisposableBean {
    private KeycloakContainer keycloakContainer;

    @Override
    public void destroy() throws Exception {
        if (keycloakContainer != null && keycloakContainer.isRunning()) {
            keycloakContainer.stop();
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        if (keycloakContainer == null) {
            keycloakContainer = new KeycloakContainer("quay.io/keycloak/keycloak:25.0.1");
        } else if (!keycloakContainer.isRunning()) {
            keycloakContainer.start();
        }
    }

    public KeycloakContainer getKeycloakContainer() {
        return keycloakContainer;
    }
}
