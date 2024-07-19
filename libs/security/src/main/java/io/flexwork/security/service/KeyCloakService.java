package io.flexwork.security.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.flexwork.exceptions.DuplicatedRecordException;
import io.flexwork.platform.db.TenantContext;
import io.flexwork.security.domain.Tenant;
import io.flexwork.security.domain.User;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.UUID;
import lombok.SneakyThrows;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
public class KeyCloakService {

    private static Logger log = LoggerFactory.getLogger(KeyCloakService.class);

    private SpringTemplateEngine templateEngine;

    private ObjectMapper om = new ObjectMapper();

    private Keycloak keycloak;

    public KeyCloakService(Keycloak keycloak, SpringTemplateEngine templateEngine) {
        this.keycloak = keycloak;
        this.templateEngine = templateEngine;
    }

    public void saveUser(User user) {
        String tenantId = TenantContext.getCurrentTenant();
        UsersResource usersResource = keycloak.realm(tenantId).users();
        log.info("Saving user {} in tenant {}", user, tenantId);
        if (usersResource.get(user.getLogin()) != null) {
            throw new DuplicatedRecordException(
                    "User with login " + user.getLogin() + " already exists");
        }
        UserRepresentation userRepresentation = new UserRepresentation();
        Response response = usersResource.create(userRepresentation);
        if (response.getStatus() != Response.Status.CREATED.getStatusCode()) {
            throw new SecurityException(
                    "Failed to create user " + user.getLogin() + ": " + response.getStatus());
        }
    }

    @SneakyThrows
    public void createNewRealmForNewTenant(Tenant tenant) {
        log.info("Creating new realm {} for new tenant {}", tenant.getNameId(), tenant.getName());

        Context templateContext = new Context();
        templateContext.setVariables(
                new HashMap<>() {
                    {
                        put("realm_id", tenant.getNameId());
                        put("realm_name", tenant.getNameId());
                        put("var", new VariableGenerator());
                    }
                });
        String keycloadRealConfig = templateEngine.process("flexwork-realm.json", templateContext);
        RealmRepresentation realmRepresentation =
                om.readValue(keycloadRealConfig, RealmRepresentation.class);
        keycloak.realms().create(realmRepresentation);
    }

    static class VariableGenerator {
        private String defaultRoleId;

        private String clientRealmManagementId;

        private String clientAccountId;

        private String readTokenId;

        public String randomValue() {
            return UUID.randomUUID().toString();
        }

        public String getDefaultRoleId() {
            if (defaultRoleId == null) {
                defaultRoleId = randomValue();
            }
            return defaultRoleId;
        }

        public String getClientRealmManagementId() {
            if (clientRealmManagementId == null) {
                clientRealmManagementId = randomValue();
            }
            return clientRealmManagementId;
        }

        public String getClientAccountId() {
            if (clientAccountId == null) {
                clientAccountId = randomValue();
            }
            return clientAccountId;
        }

        public String getReadTokenId() {
            if (readTokenId == null) {
                readTokenId = randomValue();
            }
            return readTokenId;
        }
    }
}
