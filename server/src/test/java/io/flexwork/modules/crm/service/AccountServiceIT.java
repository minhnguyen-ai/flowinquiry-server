package io.flexwork.modules.crm.service;

import static io.flexwork.TestDataLoaderConfig.accountMap;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.flexwork.IntegrationTest;
import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.service.dto.AccountDTO;
import io.flexwork.modules.crm.service.mapper.AccountMapper;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class AccountServiceIT {

    @Autowired private AccountService accountService;

    @Autowired private AccountMapper accountMapper;

    @Test
    public void testSaveAccountSuccessfully() {
        Account savedAccount = accountMap.get("account_1");
        Optional<Account> optionalAccount = accountService.findAccountById(savedAccount.getId());
        // Ensure the account was found
        assertTrue(optionalAccount.isPresent(), "Account should be present");

        Account account = optionalAccount.get();
        assertAll(
                () -> assertEquals(savedAccount.getAccountName(), account.getAccountName()),
                () -> assertEquals(savedAccount.getAccountType(), account.getAccountType()),
                () -> assertEquals(savedAccount.getIndustry(), account.getIndustry()),
                () -> assertEquals(savedAccount.getStatus(), account.getStatus()),
                () -> assertEquals(savedAccount.getId(), account.getId()),
                () -> assertEquals(savedAccount.getAssignedToUser(), account.getAssignedToUser()));
    }

    @Test
    public void testUpdatedAccount() {
        Account savedAccount = accountMap.get("account_1");
        AccountDTO accountDTO =
                AccountDTO.builder()
                        .id(savedAccount.getId())
                        .accountName("account_name2")
                        .accountType("account_type2")
                        .industry("industry2")
                        .status("status2")
                        .assignedToUserId(1L)
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
}
