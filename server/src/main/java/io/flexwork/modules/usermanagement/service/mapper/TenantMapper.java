package io.flexwork.modules.usermanagement.service.mapper;

import io.flexwork.modules.usermanagement.domain.Tenant;
import io.flexwork.modules.usermanagement.service.dto.TenantDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TenantMapper {

    TenantMapper instance = Mappers.getMapper(TenantMapper.class);

    Tenant tenantDtoToTenant(TenantDTO tenantDTO);

    TenantDTO tenantToTenantDto(Tenant tenant);
}
