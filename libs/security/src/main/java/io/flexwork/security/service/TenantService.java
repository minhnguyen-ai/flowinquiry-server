package io.flexwork.security.service;

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

    @Transactional
    public void registerNewTenant(Tenant tenant) {
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
    }
}
