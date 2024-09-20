package io.flexwork.modules.usermanagement.repository;

import io.flexwork.modules.usermanagement.domain.AuthorityResourcePermission;
import io.flexwork.modules.usermanagement.domain.AuthorityResourcePermissionId;
import io.flexwork.modules.usermanagement.domain.Permission;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityResourcePermissionRepository
        extends JpaRepository<AuthorityResourcePermission, AuthorityResourcePermissionId> {

    Optional<AuthorityResourcePermission> findByAuthorityNameAndResourceNameAndPermission(
            String authority, String resourceName, Permission permission);

    Set<AuthorityResourcePermission> findByAuthorityName(String authority);
}
