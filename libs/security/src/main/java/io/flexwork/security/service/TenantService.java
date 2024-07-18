package io.flexwork.security.service;

import static io.flexwork.platform.db.DbConstants.DEFAULT_TENANT;

import io.flexwork.security.domain.Tenant;
import io.flexwork.security.repository.TenantRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TenantService {

    private static final Logger log = LoggerFactory.getLogger(TenantService.class);

    private KeyCloakService keyCloakService;

    private TenantRepository tenantRepository;

    public TenantService(TenantRepository tenantRepository, KeyCloakService keyCloakService) {
        this.tenantRepository = tenantRepository;
        this.keyCloakService = keyCloakService;
    }

    /**
     * @param tenant
     * @return the tenant realm
     */
    @Transactional
    public String registerNewTenant(Tenant tenant) {
        log.info("Registering new tenant: {}", tenant);

        Optional<Tenant> existingTenant = tenantRepository.findByNameIgnoreCase(tenant.getName());
        if (existingTenant.isPresent()) {
            throw new IllegalArgumentException("Tenant already exists: " + tenant.getName());
        }

        existingTenant = tenantRepository.findByDomainContainingIgnoreCase(tenant.getDomain());
        if (existingTenant.isPresent()) {
            throw new IllegalArgumentException("Domain already exists: " + tenant.getDomain());
        }

        log.debug("Registering new tenant: {}", tenant.getName());
        tenant.setRealm(UUID.randomUUID().toString());

        tenantRepository.save(tenant);
        keyCloakService.createNewRealmForNewTenant(tenant);
        return tenant.getRealm();
    }

    public Tenant getDefaultTenant() {
        return tenantRepository
                .findByNameIgnoreCase(DEFAULT_TENANT)
                .orElseThrow(() -> new IllegalArgumentException("Default tenant not found"));
    }
}
