package io.flexwork.security.repository;

import io.flexwork.security.domain.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {}
