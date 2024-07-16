package io.flexwork.usermanagement.web.rest;

import io.flexwork.security.service.dto.UserDTO;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tenants")
public class TenantUserResource {
    @GetMapping("/users")
    public List<UserDTO> getUsers(Pageable pageable) {
        return new ArrayList<>();
    }
}
