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
        tenant.setNameId("realm123");
        tenant.setDomain("domain12111111113");
        tenantService.registerNewTenant(tenant);
    }

    @Test
    public void testRegisterNewTenant2Successfully() {
        Tenant tenant = new Tenant();
        tenant.setName("Test Tenant 2");
        tenant.setId(2L);
        tenant.setNameId("realm1234");
        tenant.setDomain("domain1234");
        tenantService.registerNewTenant(tenant);
    }
}
