package io.flexwork.security.service;

import io.flexwork.security.domain.User;
import org.keycloak.admin.client.Keycloak;
import org.springframework.stereotype.Service;

@Service
public class KeyCloakService {

    private Keycloak keycloak;

    public KeyCloakService(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    public void saveUser(User user) {}
}
