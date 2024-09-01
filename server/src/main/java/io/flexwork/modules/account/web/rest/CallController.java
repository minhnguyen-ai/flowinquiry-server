package io.flexwork.modules.account.web.rest;

import io.flexwork.modules.account.domain.Call;
import io.flexwork.modules.account.repository.CallRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crm/calls")
public class CallController {

    private CallRepository callRepository;

    public CallController(CallRepository callRepository) {
        this.callRepository = callRepository;
    }

    @GetMapping
    public Page<Call> getAllCalls(Pageable pageable) {
        return callRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Call> getCallById(@PathVariable Long id) {
        return callRepository
                .findById(id)
                .map(call -> ResponseEntity.ok().body(call))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Call createCall(@RequestBody Call call) {
        return callRepository.save(call);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Call> updateCall(@PathVariable Long id, @RequestBody Call call) {
        if (!callRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        call.setId(id);
        return ResponseEntity.ok(callRepository.save(call));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCall(@PathVariable Long id) {
        if (!callRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        callRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
