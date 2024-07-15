package io.flexwork.usermanagement.web.rest;

import io.flexwork.security.domain.User;
import io.flexwork.security.service.UserService;
import io.flexwork.usermanagement.service.SignupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SignupResource {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private SignupService signupService;

    public SignupResource(SignupService signupService) {
        this.signupService = signupService;
    }

    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void signup(@RequestBody User user) {
        signupService.signup(user);
    }

    @GetMapping("/verifyEmail")
    public void verifyEmail(String userEmail) {}

    @GetMapping("/forgotPassword")
    public void forgotPassword(String userEmail) {
        log.debug("Forgot password for user {}", userEmail);
    }
}
