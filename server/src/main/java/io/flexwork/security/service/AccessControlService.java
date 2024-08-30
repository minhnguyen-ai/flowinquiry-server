package io.flexwork.security.service;

import io.flexwork.security.domain.Authority;
import io.flexwork.security.domain.AuthorityResourcePermission;
import io.flexwork.security.domain.AuthorityResourcePermissionId;
import io.flexwork.security.domain.Permission;
import io.flexwork.security.domain.Resource;
import io.flexwork.security.domain.User;
import io.flexwork.security.repository.AuthorityRepository;
import io.flexwork.security.repository.AuthorityResourcePermissionRepository;
import io.flexwork.security.repository.ResourceRepository;
import io.flexwork.security.repository.UserRepository;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccessControlService {
    private final UserRepository userRepository;
    private final AuthorityRepository roleRepository;
    private final ResourceRepository resourceRepository;
    private final AuthorityResourcePermissionRepository roleResourcePermissionRepository;

    @Autowired
    public AccessControlService(
            UserRepository userRepository,
            AuthorityRepository roleRepository,
            ResourceRepository resourceRepository,
            AuthorityResourcePermissionRepository roleResourcePermissionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.resourceRepository = resourceRepository;
        this.roleResourcePermissionRepository = roleResourcePermissionRepository;
    }

    @Transactional(readOnly = true)
    public boolean hasPermission(Long userId, Long resourceId, Permission permission) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false; // User not found
        }

        User user = userOpt.get();
        Set<Authority> roles = user.getAuthorities();

        for (Authority role : roles) {
            Optional<AuthorityResourcePermission> rolePermissionOpt =
                    roleResourcePermissionRepository.findByAuthorityAndResourceAndPermission(
                            role.getRoleName(), resourceId, permission);

            if (rolePermissionOpt.isPresent()) {
                return true; // Permission found
            }
        }

        return false; // Permission not found
    }

    @Transactional
    public void assignRoleToUser(Long userId, String roleName) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Authority role =
                roleRepository
                        .findById(roleName)
                        .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        user.getAuthorities().add(role);
        userRepository.save(user);
    }

    @Transactional
    public void addPermissionToRole(String roleName, Long resourceId, Permission permission) {
        Authority role =
                roleRepository
                        .findById(roleName)
                        .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        Resource resource =
                resourceRepository
                        .findById(resourceId)
                        .orElseThrow(() -> new IllegalArgumentException("Resource not found"));

        AuthorityResourcePermissionId id = new AuthorityResourcePermissionId();
        id.setRoleName(role.getRoleName());
        id.setResourceId(resource.getId());
        id.setPermission(permission);

        AuthorityResourcePermission roleResourcePermission = new AuthorityResourcePermission();
        roleResourcePermission.setId(id);
        roleResourcePermission.setRole(role);
        roleResourcePermission.setResource(resource);
        roleResourcePermission.setPermission(permission);

        roleResourcePermissionRepository.save(roleResourcePermission);
    }

    @Transactional
    public void removePermissionFromRole(String roleName, Long resourceId, Permission permission) {
        AuthorityResourcePermissionId id = new AuthorityResourcePermissionId();
        id.setRoleName(roleName);
        id.setResourceId(resourceId);
        id.setPermission(permission);

        roleResourcePermissionRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Set<AuthorityResourcePermission> getPermissionsForRole(String roleName) {
        return roleResourcePermissionRepository.findByAuthorityName(roleName);
    }
}
