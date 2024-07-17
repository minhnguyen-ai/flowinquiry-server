package io.flexwork.usermanagement.web.rest;

import io.flexwork.security.service.dto.UserDTO;
import java.util.ArrayList;
import java.util.List;

import io.flexwork.usermanagement.TenantConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tenants")
public class TenantUserResource {

    private static final Logger log = LoggerFactory.getLogger(TenantUserResource.class);

    @GetMapping("/users")
    public List<UserDTO> getUsers(Pageable pageable) {
        return new ArrayList<>();
    }

    @PostMapping("/users")
    public void createUser(
            @RequestHeader(value = TenantConstants.HEADER_TENANT_ID) String tenantId,
            @RequestBody UserDTO userDTO) {
        log.debug("REST request to save User: {} for tenant {}", userDTO, tenantId);
    }
}
