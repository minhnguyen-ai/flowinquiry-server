package io.flexwork.security.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String resourceName;

    @Column(length = 255)
    private String description;

    @OneToMany(mappedBy = "resource", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<AuthorityResourcePermission> authorityResourcePermissions = new HashSet<>();
}
