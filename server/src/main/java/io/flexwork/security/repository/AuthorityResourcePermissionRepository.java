package io.flexwork.security.repository;

import io.flexwork.security.domain.AuthorityResourcePermission;
import io.flexwork.security.domain.AuthorityResourcePermissionId;
import io.flexwork.security.domain.Permission;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityResourcePermissionRepository
        extends JpaRepository<AuthorityResourcePermission, AuthorityResourcePermissionId> {

    Optional<AuthorityResourcePermission> findByAuthorityNameAndResourceNameAndPermission(
            String authority, String resourceName, Permission permission);

    Set<AuthorityResourcePermission> findByAuthorityName(String authority);
}
