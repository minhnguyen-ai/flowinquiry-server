package io.flexwork.modules.crm.repository;

import io.flexwork.modules.crm.domain.Call;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CallRepository extends JpaRepository<Call, Long> {}
