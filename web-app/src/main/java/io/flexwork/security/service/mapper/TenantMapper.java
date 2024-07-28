package io.flexwork.security.service.mapper;

import io.flexwork.domain.Tenant;
import io.flexwork.security.service.dto.TenantDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TenantMapper {

    public static TenantMapper instance = Mappers.getMapper(TenantMapper.class);

    Tenant tenantDtoToTenant(TenantDTO tenantDTO);

    TenantDTO tenantToTenantDto(Tenant tenant);
}
