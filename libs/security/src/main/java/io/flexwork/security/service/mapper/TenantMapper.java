package io.flexwork.security.service.mapper;

import io.flexwork.security.domain.Tenant;
import io.flexwork.security.service.dto.TenantDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TenantMapper {

    TenantMapper INSTANCE = Mappers.getMapper(TenantMapper.class);

    Tenant tenantDTOToTenant(TenantDTO tenantDTO);

    TenantDTO tenantToTenantDTO(Tenant tenant);
}
