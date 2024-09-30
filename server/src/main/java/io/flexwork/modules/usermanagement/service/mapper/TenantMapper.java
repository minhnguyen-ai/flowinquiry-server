package io.flexwork.modules.usermanagement.service.mapper;

import io.flexwork.modules.usermanagement.domain.Tenant;
import io.flexwork.modules.usermanagement.service.dto.TenantDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TenantMapper {

    Tenant tenantDtoToTenant(TenantDTO tenantDTO);

    TenantDTO tenantToTenantDto(Tenant tenant);
}
