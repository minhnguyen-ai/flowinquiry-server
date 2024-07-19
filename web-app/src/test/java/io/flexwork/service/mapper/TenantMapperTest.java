package io.flexwork.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import io.flexwork.security.domain.Tenant;
import io.flexwork.security.service.dto.TenantDTO;
import io.flexwork.security.service.mapper.TenantMapper;
import org.junit.jupiter.api.Test;

/** Unit tests for {@link io.flexwork.security.service.mapper.TenantMapper}. */
public class TenantMapperTest {

    @Test
    public void testTenantDtoToTenant() {
        TenantDTO tenantDTO = new TenantDTO();
        tenantDTO.setId(1L);
        tenantDTO.setName("test");
        tenantDTO.setDescription("description");

        Tenant tenant = TenantMapper.instance.tenantDtoToTenant(tenantDTO);
        assertThat(tenant.getName()).isEqualTo("test");
        assertThat(tenant.getId()).isEqualTo(1L);
        assertThat(tenant.getDescription()).isEqualTo("description");
    }
}
