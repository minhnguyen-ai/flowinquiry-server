package io.flexwork.modules.crm.repository;

import io.flexwork.modules.crm.domain.ValueDefinition;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ValueDefinitionRepository extends JpaRepository<ValueDefinition, Long> {
    List<ValueDefinition> findByEntityTypeAndValueKey(String entityType, String valueKey);
}
