package io.flexwork.modules.account.web.rest;

import io.flexwork.modules.account.domain.Email;
import io.flexwork.modules.account.repository.EmailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crm/emails")
public class EmailController {

    private EmailRepository emailRepository;

    public EmailController(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    @GetMapping
    public Page<Email> getAllEmails(Pageable pageable) {
        return emailRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Email> getEmailById(@PathVariable Long id) {
        return emailRepository
                .findById(id)
                .map(email -> ResponseEntity.ok().body(email))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Email createEmail(@RequestBody Email email) {
        return emailRepository.save(email);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Email> updateEmail(@PathVariable Long id, @RequestBody Email email) {
        if (!emailRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        email.setId(id);
        return ResponseEntity.ok(emailRepository.save(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmail(@PathVariable Long id) {
        if (!emailRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        emailRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
