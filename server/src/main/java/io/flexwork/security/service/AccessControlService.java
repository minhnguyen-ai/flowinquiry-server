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
    private final AuthorityRepository authorityRepository;
    private final ResourceRepository resourceRepository;
    private final AuthorityResourcePermissionRepository authorityResourcePermissionRepository;

    @Autowired
    public AccessControlService(
            UserRepository userRepository,
            AuthorityRepository authorityRepository,
            ResourceRepository resourceRepository,
            AuthorityResourcePermissionRepository authorityResourcePermissionRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.resourceRepository = resourceRepository;
        this.authorityResourcePermissionRepository = authorityResourcePermissionRepository;
    }

    @Transactional(readOnly = true)
    public boolean hasPermission(Long userId, String resourceName, Permission permission) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false; // User not found
        }

        User user = userOpt.get();
        Set<Authority> roles = user.getAuthorities();

        for (Authority role : roles) {
            Optional<AuthorityResourcePermission> rolePermissionOpt =
                    authorityResourcePermissionRepository
                            .findByAuthorityNameAndResourceNameAndPermission(
                                    role.getDescriptiveName(), resourceName, permission);

            if (rolePermissionOpt.isPresent()) {
                return true; // Permission found
            }
        }

        return false; // Permission not found
    }

    @Transactional
    public void assignAuthorityToUser(Long userId, String authorityName) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Authority role =
                authorityRepository
                        .findById(authorityName)
                        .orElseThrow(() -> new IllegalArgumentException("Authority not found"));

        user.getAuthorities().add(role);
        userRepository.save(user);
    }

    @Transactional
    public void addPermissionToAuthority(
            String authorityName, String resourceName, Permission permission) {
        Authority authority =
                authorityRepository
                        .findById(authorityName)
                        .orElseThrow(() -> new IllegalArgumentException("Authority not found"));

        Resource resource =
                resourceRepository
                        .findById(resourceName)
                        .orElseThrow(() -> new IllegalArgumentException("Resource not found"));

        AuthorityResourcePermissionId id = new AuthorityResourcePermissionId();
        id.setAuthorityName(authority.getDescriptiveName());
        id.setResourceName(resource.getName());
        id.setPermission(permission);

        AuthorityResourcePermission roleResourcePermission = new AuthorityResourcePermission();
        roleResourcePermission.setId(id);
        roleResourcePermission.setAuthority(authority);
        roleResourcePermission.setResource(resource);
        roleResourcePermission.setPermission(permission);

        authorityResourcePermissionRepository.save(roleResourcePermission);
    }

    @Transactional
    public void removePermissionFromAuthority(
            String authorityName, String resourceName, Permission permission) {
        AuthorityResourcePermissionId id = new AuthorityResourcePermissionId();
        id.setAuthorityName(authorityName);
        id.setResourceName(resourceName);
        id.setPermission(permission);

        authorityResourcePermissionRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Set<AuthorityResourcePermission> getPermissionsForAuthority(String authorityName) {
        return authorityResourcePermissionRepository.findByAuthorityName(authorityName);
    }
}
