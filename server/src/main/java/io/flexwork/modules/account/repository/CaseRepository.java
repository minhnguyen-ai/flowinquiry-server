package io.flexwork.modules.account.repository;

import io.flexwork.modules.account.domain.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {}
