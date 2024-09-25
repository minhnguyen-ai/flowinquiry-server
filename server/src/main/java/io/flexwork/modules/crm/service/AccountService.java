package io.flexwork.modules.crm.service;

import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.event.ActivityLogEvent;
import io.flexwork.modules.crm.repository.AccountRepository;
import java.util.Optional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    private final ApplicationEventPublisher eventPublisher;

    public AccountService(
            AccountRepository accountRepository, ApplicationEventPublisher eventPublisher) {
        this.accountRepository = accountRepository;
        this.eventPublisher = eventPublisher;
    }

    // Find an account by its ID
    public Optional<Account> findAccountById(Long accountId) {
        return accountRepository.findById(accountId);
    }

    // Save a new account or update an existing one
    public Account saveAccount(Account account) {
        Account savedAccount = accountRepository.save(account);

        ActivityLogEvent activityLogEvent = new ActivityLogEvent(this);
        eventPublisher.publishEvent(activityLogEvent);
        return savedAccount;
    }

    // Delete an account by its ID
    public void deleteAccountById(Long accountId) {
        accountRepository.deleteById(accountId);
    }

    public Page<Account> findAllAccounts(Pageable pageable) {
        return accountRepository.findAll(pageable);
    }

    public Optional<Account> getNextEntity(Long currentId) {
        return accountRepository.findNextEntity(currentId);
    }

    public Optional<Account> getPreviousEntity(Long currentId) {
        return accountRepository.findPreviousEntity(currentId);
    }
}
