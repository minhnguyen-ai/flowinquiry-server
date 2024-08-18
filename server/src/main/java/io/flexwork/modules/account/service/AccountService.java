package io.flexwork.modules.account.service;

import io.flexwork.modules.account.domain.Account;
import io.flexwork.modules.account.repository.AccountRepository;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // Find an account by its ID
    public Optional<Account> findAccountById(Long accountId) {
        return accountRepository.findById(accountId);
    }

    // Save a new account or update an existing one
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    // Delete an account by its ID
    public void deleteAccountById(Long accountId) {
        accountRepository.deleteById(accountId);
    }

    public Page<Account> findAllAccounts(Pageable pageable) {
        return accountRepository.findAll(pageable);
    }
}
