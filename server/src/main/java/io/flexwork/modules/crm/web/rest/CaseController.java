package io.flexwork.modules.crm.web.rest;

import io.flexwork.modules.crm.domain.Case;
import io.flexwork.modules.crm.repository.CaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crm/cases")
public class CaseController {

    private CaseRepository casesRepository;

    public CaseController(CaseRepository casesRepository) {
        this.casesRepository = casesRepository;
    }

    @GetMapping
    public Page<Case> getAllCases(Pageable pageable) {
        return casesRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Case> getCaseById(@PathVariable Long id) {
        return casesRepository
                .findById(id)
                .map(aCase -> ResponseEntity.ok().body(aCase))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Case createCase(@RequestBody Case aCase) {
        return casesRepository.save(aCase);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Case> updateCase(@PathVariable Long id, @RequestBody Case aCase) {
        if (!casesRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        aCase.setId(id);
        return ResponseEntity.ok(casesRepository.save(aCase));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCase(@PathVariable Long id) {
        if (!casesRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        casesRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
