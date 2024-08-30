package io.flexwork.security.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.io.Serializable;

public class AuthorityResourcePermissionId implements Serializable {

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "resource_id")
    private Long resourceId;

    @Column(name = "permission", nullable = false)
    @Enumerated(EnumType.STRING)
    private Permission permission;

    // Getters, Setters, equals(), and hashCode() methods
}