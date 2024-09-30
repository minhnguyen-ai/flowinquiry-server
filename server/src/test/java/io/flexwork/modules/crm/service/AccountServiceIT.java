package io.flexwork.modules.crm.service;

import io.flexwork.IntegrationTest;
import io.flexwork.modules.crm.domain.Account;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static io.flexwork.TestDataLoaderConfig.accountMap;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@IntegrationTest
public class AccountServiceIT {

    @Autowired private AccountService accountService;

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
                ()-> assertEquals(savedAccount.getId(), account.getId())
        );
    }

    @Test
    public void testUpdatedAccount() {
    }
}
