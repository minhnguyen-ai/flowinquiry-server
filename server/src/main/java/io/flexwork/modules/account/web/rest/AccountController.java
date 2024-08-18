package io.flexwork.modules.account.web.rest;

import io.flexwork.modules.account.domain.Account;
import io.flexwork.modules.account.service.AccountService;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // Get an account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Optional<Account> account = accountService.findAccountById(id);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new account
    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account savedAccount = accountService.saveAccount(account);
        return new ResponseEntity<>(savedAccount, HttpStatus.CREATED);
    }

    // Update an existing account
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(
            @PathVariable Long id, @RequestBody Account accountDetails) {
        Optional<Account> accountOptional = accountService.findAccountById(id);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setAccountName(accountDetails.getAccountName());
            account.setAccountType(accountDetails.getAccountType());
            account.setIndustry(accountDetails.getIndustry());
            account.setWebsite(accountDetails.getWebsite());
            account.setPhoneNumber(accountDetails.getPhoneNumber());
            account.setEmail(accountDetails.getEmail());
            account.setAddressLine1(accountDetails.getAddressLine1());
            account.setAddressLine2(accountDetails.getAddressLine2());
            account.setCity(accountDetails.getCity());
            account.setState(accountDetails.getState());
            account.setPostalCode(accountDetails.getPostalCode());
            account.setCountry(accountDetails.getCountry());
            account.setAnnualRevenue(accountDetails.getAnnualRevenue());
            account.setNumberOfEmployees(accountDetails.getNumberOfEmployees());
            account.setParentAccount(accountDetails.getParentAccount());
            account.setStatus(accountDetails.getStatus());
            account.setAssignedToUser(accountDetails.getAssignedToUser());
            account.setNotes(accountDetails.getNotes());

            Account updatedAccount = accountService.saveAccount(account);
            return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete an account by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        Optional<Account> account = accountService.findAccountById(id);
        if (account.isPresent()) {
            accountService.deleteAccountById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Page<Account>> getAllAccounts(Pageable pageable) {
        Page<Account> accounts = accountService.findAllAccounts(pageable);
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }
}
