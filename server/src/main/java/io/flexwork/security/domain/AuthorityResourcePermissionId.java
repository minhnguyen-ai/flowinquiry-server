package io.flexwork.security.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.Data;

@Data
public class AuthorityResourcePermissionId implements Serializable {

    @Column(name = "authority_name")
    private String authorityName;

    @Column(name = "resource_id")
    private Long resourceId;

    @Column(name = "permission", nullable = false)
    @Enumerated(EnumType.STRING)
    private Permission permission;
}
