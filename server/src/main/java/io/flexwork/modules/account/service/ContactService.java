package io.flexwork.modules.account.service;

import io.flexwork.modules.account.domain.Contact;
import io.flexwork.modules.account.repository.ContactRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    public Optional<Contact> findById(Long id) {
        return contactRepository.findById(id);
    }

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    public void deleteById(Long id) {
        contactRepository.deleteById(id);
    }
}
