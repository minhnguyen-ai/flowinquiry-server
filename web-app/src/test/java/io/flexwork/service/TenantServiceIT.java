package io.flexwork.service;

import io.flexwork.IntegrationTest;
import io.flexwork.security.service.TenantService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class TenantServiceIT {

    @Autowired private TenantService tenantService;

    @Test
    public void testRegisterNewTenantSuccessfully() {
        System.out.println("Registering new tenant");
    }
}
