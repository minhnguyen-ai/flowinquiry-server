package io.flexwork.security.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Role_Resource_Permissions")
@Getter
@Setter
public class AuthorityResourcePermission {

    @EmbeddedId private AuthorityResourcePermissionId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("name")
    private Authority role;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId(value = "id")
    private Resource resource;

    @Column(name = "permission", nullable = false)
    @Enumerated(EnumType.STRING)
    private Permission permission;
}
