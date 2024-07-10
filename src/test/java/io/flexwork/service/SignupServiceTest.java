package io.flexwork.service;

import io.flexwork.IntegrationTest;
import io.flexwork.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class SignupServiceTest {

    @Autowired
    private SignupService signupService;

    @Test
    void signup() {
        User user = new User();
        user.setEmail("test@test.com");
        signupService.signup(user);
    }
}
