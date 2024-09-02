package io.flexwork.modules.crm.repository;

import io.flexwork.modules.crm.domain.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {}
