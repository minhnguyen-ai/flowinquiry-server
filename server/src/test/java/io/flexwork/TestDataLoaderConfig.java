package io.flexwork;

import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.repository.AccountRepository;
import io.flexwork.modules.usermanagement.domain.User;
import io.flexwork.modules.usermanagement.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Order;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

/** Insert all predefined test data for the database IT tests */
@TestConfiguration
public class TestDataLoaderConfig {

    public static final Map<String, User> userMap = new HashMap<>();

    public static final Map<String, Account> accountMap = new HashMap<>();

    @Bean
    @Order(10)
    public CommandLineRunner loadUsersData(UserRepository userRepository) {
        return args -> {
            User user1 =
                    User.builder()
                            .id(1L)
                            .email("user1@rmail.com")
                            .password(RandomStringUtils.randomAlphanumeric(60))
                            .firstName("u1_first_name")
                            .lastName("u1_last_name")
                            .build();
            userMap.put("user_1", userRepository.save(user1));
        };
    }

    @Bean
    @Order(11)
    public CommandLineRunner loadCrmAccountData(AccountRepository accountRepository) {
        return args -> {
            Account account1 =
                    Account.builder()
                            .accountName("account_name")
                            .accountType("account_type")
                            .industry("industry")
                            .status("status")
                            .assignedToUser(userMap.get("user_1"))
                            .build();
            accountMap.put("account_1", accountRepository.save(account1));
        };
    }
}
