package io.flexwork.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.flexwork.IntegrationTest;
import io.flexwork.modules.usermanagement.domain.Tenant;
import io.flexwork.modules.usermanagement.service.TenantService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class TenantServiceIT {

    @Autowired private TenantService tenantService;

    @Test
    public void testRegisterNewTenantSuccessfully() {
        Tenant tenant = Tenant.builder().name("tenant_name").domain("tenant_domain").build();

        Tenant savedTenant = tenantService.registerNewTenant(tenant);
        assertAll(
                () -> assertEquals(tenant.getName(), savedTenant.getName()),
                () -> assertEquals(tenant.getDomain(), savedTenant.getDomain()),
                () -> assertNotNull(savedTenant.getNameId()));
    }
}
