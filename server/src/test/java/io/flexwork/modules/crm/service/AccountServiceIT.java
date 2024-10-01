package io.flexwork.modules.crm.service;

import static org.junit.jupiter.api.Assertions.*;

import io.flexwork.IntegrationTest;
import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.repository.AccountRepository;
import io.flexwork.modules.crm.service.dto.AccountDTO;
import io.flexwork.modules.crm.service.mapper.AccountMapper;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class AccountServiceIT {

    @Autowired private AccountService accountService;

    @Autowired private AccountMapper accountMapper;
    @Autowired private AccountRepository accountRepository;

    @Test
    public void testUpdatedAccount() {
        Account savedAccount = accountRepository.findByAccountName("account_1").orElseThrow();
        AccountDTO accountDTO =
                AccountDTO.builder()
                        .id(savedAccount.getId())
                        .accountName("account_name2")
                        .accountType("account_type2")
                        .industry("industry2")
                        .status("status2")
                        .build();
        Account updatedAccount = accountMapper.accountDTOToAccount(accountDTO);
        Account returnedUpdateAccount =
                accountService.updateAccount(savedAccount.getId(), updatedAccount);
        assertAll(
                () -> assertEquals("account_name2", returnedUpdateAccount.getAccountName()),
                () -> assertEquals("account_type2", returnedUpdateAccount.getAccountType()),
                () -> assertEquals("industry2", returnedUpdateAccount.getIndustry()),
                () -> assertEquals("status2", returnedUpdateAccount.getStatus()),
                () ->
                        assertEquals(
                                savedAccount.getAssignedToUser(),
                                returnedUpdateAccount.getAssignedToUser()));
    }

    @Test
    public void testSaveAccountSuccessfully() {
        Account account1 =
                Account.builder()
                        .accountName("account_name")
                        .accountType("account_type")
                        .industry("industry")
                        .status("status")
                        .build();
        Account savedAccount = accountService.saveAccount(account1);

        Optional<Account> optionalAccount = accountService.findAccountById(savedAccount.getId());
        // Ensure the returnedAccount was found
        assertTrue(optionalAccount.isPresent(), "Account should be present");

        Account returnedAccount = optionalAccount.get();
        assertAll(
                () -> assertEquals(savedAccount.getAccountName(), returnedAccount.getAccountName()),
                () -> assertEquals(savedAccount.getAccountType(), returnedAccount.getAccountType()),
                () -> assertEquals(savedAccount.getIndustry(), returnedAccount.getIndustry()),
                () -> assertEquals(savedAccount.getStatus(), returnedAccount.getStatus()),
                () -> assertEquals(savedAccount.getId(), returnedAccount.getId()),
                () ->
                        assertEquals(
                                savedAccount.getAssignedToUser(),
                                returnedAccount.getAssignedToUser()));
    }
}
