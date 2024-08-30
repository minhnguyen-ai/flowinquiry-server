package io.flexwork.security.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "Role_Resource_Permissions")
public class AuthorityResourcePermission {

    @EmbeddedId private AuthorityResourcePermissionId id = new AuthorityResourcePermissionId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roleName")
    private Authority role;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("resourceId")
    private Resource resource;

    @Column(name = "permission", nullable = false)
    @Enumerated(EnumType.STRING)
    private Permission permission;

    // Getters and Setters
}
