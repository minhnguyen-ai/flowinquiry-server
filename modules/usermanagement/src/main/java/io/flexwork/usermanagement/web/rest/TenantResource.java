package io.flexwork.usermanagement.web.rest;

import io.flexwork.security.domain.Tenant;
import io.flexwork.security.service.TenantService;
import io.flexwork.security.service.dto.TenantDTO;
import io.flexwork.security.service.mapper.TenantMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TenantResource {

    private static final Logger log = LoggerFactory.getLogger(TenantResource.class);

    private final TenantService tenantService;

    public TenantResource(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @PostMapping("/tenants")
    public String createTenant(@RequestBody TenantDTO tenantDTO) {
        Tenant tenant = TenantMapper.instance.tenantDtoToTenant(tenantDTO);
        return tenantService.registerNewTenant(tenant);
    }

    @GetMapping("/tenants")
    public Page<TenantDTO> findAllTenants(Pageable pageable) {
        return tenantService.findAllTenants(pageable);
    }
}
