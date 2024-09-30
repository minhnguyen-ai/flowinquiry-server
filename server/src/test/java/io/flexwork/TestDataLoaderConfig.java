package io.flexwork;

import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.repository.AccountRepository;
import org.junit.jupiter.api.Order;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.Map;

@TestConfiguration
public class TestDataLoaderConfig {

    public static final Map<String, Account> accountMap = new HashMap<>();

    @Bean
    @Order(1)
    public CommandLineRunner loadCrmAccountData(AccountRepository accountRepository) {
        return args -> {
            Account account1 =
                    Account.builder()
                            .accountName("account_name")
                            .accountType("account_type")
                            .industry("industry")
                            .status("status")
                            .build();
            Account savedAccount1 = accountRepository.save(account1);
            accountMap.put("account_1", savedAccount1);
        };
    }
}
