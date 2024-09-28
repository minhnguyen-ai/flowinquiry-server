package io.flexwork.modules.crm.web.rest;

import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.service.AccountService;
import io.flexwork.modules.crm.service.dto.AccountDTO;
import io.flexwork.modules.crm.service.mapper.AccountMapper;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crm/accounts")
public class AccountController {

    private final AccountService accountService;

    private AccountMapper accountMapper;

    public AccountController(AccountService accountService, AccountMapper accountMapper) {
        this.accountService = accountService;
        this.accountMapper = accountMapper;
    }

    // Get an account by ID
    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable Long id) {
        Optional<Account> account = accountService.findAccountById(id);
        return account.map(value -> ResponseEntity.ok(accountMapper.accountToAccountDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new account
    @PostMapping
    public ResponseEntity<AccountDTO> createAccount(@RequestBody AccountDTO account) {
        Account savedAccount =
                accountService.saveAccount(accountMapper.accountDTOToAccount(account));
        return new ResponseEntity<>(
                accountMapper.accountToAccountDTO(savedAccount), HttpStatus.CREATED);
    }

    // Update an existing account
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(
            @PathVariable Long id, @RequestBody Account accountDTO) {
        Optional<Account> accountOptional = accountService.findAccountById(id);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setAccountName(accountDTO.getAccountName());
            account.setAccountType(accountDTO.getAccountType());
            account.setIndustry(accountDTO.getIndustry());
            account.setWebsite(accountDTO.getWebsite());
            account.setPhoneNumber(accountDTO.getPhoneNumber());
            account.setEmail(accountDTO.getEmail());
            account.setAddressLine1(accountDTO.getAddressLine1());
            account.setAddressLine2(accountDTO.getAddressLine2());
            account.setCity(accountDTO.getCity());
            account.setState(accountDTO.getState());
            account.setPostalCode(accountDTO.getPostalCode());
            account.setCountry(accountDTO.getCountry());
            account.setAnnualRevenue(accountDTO.getAnnualRevenue());
            account.setParentAccount(accountDTO.getParentAccount());
            account.setStatus(accountDTO.getStatus());
            account.setAssignedToUser(accountDTO.getAssignedToUser());
            account.setNotes(accountDTO.getNotes());

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

    @GetMapping
    public ResponseEntity<Page<AccountDTO>> getAllAccounts(Pageable pageable) {
        Page<Account> accounts = accountService.findAllAccounts(pageable);
        return new ResponseEntity<>(
                accounts.map(accountMapper::accountToAccountDTO), HttpStatus.OK);
    }

    @GetMapping("/next/{currentId}")
    public ResponseEntity<AccountDTO> getNextEntity(@PathVariable Long currentId) {
        return accountService
                .getNextEntity(currentId)
                .map(value -> ResponseEntity.ok(accountMapper.accountToAccountDTO(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/previous/{currentId}")
    public ResponseEntity<AccountDTO> getPreviousEntity(@PathVariable Long currentId) {
        return accountService
                .getPreviousEntity(currentId)
                .map(value -> ResponseEntity.ok(accountMapper.accountToAccountDTO(value)))
                .orElse(ResponseEntity.notFound().build());
    }
}
