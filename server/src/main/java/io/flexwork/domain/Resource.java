package io.flexwork.domain;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Entity
@Table(name = "fw_resource")
@Data
public class Resource {

    @Id
    @Column(name = "name", nullable = false, unique = true, length = 50)
    private String name;

    @Column(name = "description", length = 255)
    private String description;

    @OneToMany(mappedBy = "resource", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<AuthorityResourcePermission> authorityResourcePermissions = new HashSet<>();
}
