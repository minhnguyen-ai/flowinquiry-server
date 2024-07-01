package io.flexwork.web.rest;

import io.flexwork.domain.User;
import io.flexwork.service.SignupWorkflowService;
import io.flexwork.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SignupWorkflowController {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private SignupWorkflowService signupWorkflowService;

    public SignupWorkflowController(SignupWorkflowService signupWorkflowService) {
        this.signupWorkflowService = signupWorkflowService;
    }

    @PostMapping("/signup")
    public void signup(@RequestBody User user) {
        signupWorkflowService.signup(user);
    }

    @GetMapping("/signup")
    public String signup() {
        return "HEllo";
    }
}
