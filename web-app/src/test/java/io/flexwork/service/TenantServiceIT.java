package io.flexwork.service;

import io.flexwork.IntegrationTest;
import io.flexwork.security.domain.Tenant;
import io.flexwork.security.service.TenantService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class TenantServiceIT {

    @Autowired private TenantService tenantService;

    @Test
    public void testRegisterNewTenantSuccessfully() {
        Tenant tenant = new Tenant();
        tenant.setName("Test Tenant");
        tenant.setId(1L);
        tenant.setRealm("realm123");
        tenant.setDomain("domain123");
        tenantService.registerNewTenant(tenant);
    }
}
