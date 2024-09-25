package io.flexwork.modules.crm.service;

import io.flexwork.modules.crm.domain.ValueDefinition;
import io.flexwork.modules.crm.repository.ValueDefinitionRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ValueDefinitionService {

    private ValueDefinitionRepository crmValueDefinitionRepository;

    public ValueDefinitionService(ValueDefinitionRepository crmValueDefinitionRepository) {
        this.crmValueDefinitionRepository = crmValueDefinitionRepository;
    }

    public List<ValueDefinition> getValuesByEntityTypeAndKey(String entityType, String valueKey) {
        return crmValueDefinitionRepository.findByEntityTypeAndValueKey(entityType, valueKey);
    }

    public ValueDefinition createValueDefinition(ValueDefinition valueDefinition) {
        return crmValueDefinitionRepository.save(valueDefinition);
    }

    public ValueDefinition getDefaultValue(String entityType, String valueKey) {
        return crmValueDefinitionRepository
                .findByEntityTypeAndValueKey(entityType, valueKey)
                .stream()
                .filter(ValueDefinition::getIsDefault)
                .findFirst()
                .orElse(null);
    }
}
