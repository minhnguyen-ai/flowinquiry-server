package io.flexwork.modules.usermanagement.repository;

import io.flexwork.modules.usermanagement.domain.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, String> {}
