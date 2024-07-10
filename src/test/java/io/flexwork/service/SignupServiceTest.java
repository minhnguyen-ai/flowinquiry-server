package io.flexwork.service;

import static io.flexwork.stateMacine.signup.SignupStates.NEW_SIGNUP_USER;
import static org.assertj.core.api.Assertions.assertThat;

import io.flexwork.IntegrationTest;
import io.flexwork.domain.User;
import io.flexwork.stateMacine.signup.SignupStates;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class SignupServiceTest {

    @Autowired
    private SignupService signupService;

    @Test
    void signup() {
        User user = new User();
        user.setId("123");
        user.setLogin("hainguyenLogin");
        user.setSignupState(NEW_SIGNUP_USER);
        user.setEmail("test@test.com");
        signupService.signup(user);

        assertThat(user.getSignupState()).isEqualTo(NEW_SIGNUP_USER);
    }
}
