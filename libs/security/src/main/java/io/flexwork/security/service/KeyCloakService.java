package io.flexwork.security.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.flexwork.security.domain.Tenant;
import io.flexwork.security.domain.User;
import java.util.HashMap;
import java.util.UUID;
import lombok.SneakyThrows;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RealmRepresentation;
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

    public void saveUser(User user) {}

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
