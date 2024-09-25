package io.flexwork.modules.crm.web.rest;

import io.flexwork.modules.crm.domain.ValueDefinition;
import io.flexwork.modules.crm.service.ValueDefinitionService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/crm/values")
public class ValueDefinitionController {

    private ValueDefinitionService crmValueDefinitionService;

    public ValueDefinitionController(ValueDefinitionService crmValueDefinitionService) {
        this.crmValueDefinitionService = crmValueDefinitionService;
    }

    @GetMapping
    public ResponseEntity<List<ValueDefinition>> getValues(
            @RequestParam String entityType, @RequestParam String valueKey) {
        List<ValueDefinition> values =
                crmValueDefinitionService.getValuesByEntityTypeAndKey(entityType, valueKey);
        return ResponseEntity.ok(values);
    }

    @PostMapping
    public ResponseEntity<ValueDefinition> createValueDefinition(
            @RequestBody ValueDefinition crmValueDefinition) {
        ValueDefinition savedValue =
                crmValueDefinitionService.createValueDefinition(crmValueDefinition);
        return ResponseEntity.ok(savedValue);
    }
}
