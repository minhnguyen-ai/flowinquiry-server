package io.flexwork.security.service;

import static io.flexwork.platform.db.DbConstants.DEFAULT_TENANT;
import static io.flexwork.security.service.mapper.TenantMapper.INSTANCE;

import io.flexwork.platform.db.service.LiquibaseService;
import io.flexwork.security.domain.Tenant;
import io.flexwork.security.repository.TenantRepository;
import io.flexwork.security.service.dto.TenantDTO;
import jakarta.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TenantService {

    private static final Logger log = LoggerFactory.getLogger(TenantService.class);

    private KeyCloakService keyCloakService;

    private TenantRepository tenantRepository;

    private LiquibaseService liquibaseService;

    public TenantService(
            TenantRepository tenantRepository,
            KeyCloakService keyCloakService,
            LiquibaseService liquibaseService) {
        this.tenantRepository = tenantRepository;
        this.keyCloakService = keyCloakService;
        this.liquibaseService = liquibaseService;
    }

    /**
     * @param tenant
     * @return the tenant realm
     */
    @SneakyThrows
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
        tenant.setNameId(tenant.getRealm().replace("-", ""));

        tenantRepository.save(tenant);
        keyCloakService.createNewRealmForNewTenant(tenant);
        liquibaseService.createTenantDbSchema(tenant.getNameId());
        return tenant.getRealm();
    }

    public Tenant getDefaultTenant() {
        return tenantRepository
                .findByNameIgnoreCase(DEFAULT_TENANT)
                .orElseThrow(() -> new IllegalArgumentException("Default tenant not found"));
    }

    public Page<TenantDTO> findAllTenants(Pageable pageable) {
        return tenantRepository.findAll(pageable).map(INSTANCE::tenantToTenantDTO);
    }
}
