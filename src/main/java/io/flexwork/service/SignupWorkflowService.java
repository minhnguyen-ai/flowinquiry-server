package io.flexwork.service;

import io.flexwork.domain.User;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SignupWorkflowService {

    private static final Logger log = LoggerFactory.getLogger(SignupWorkflowService.class);

    public SignupWorkflowService() {}

    public void signup(User user) {
        log.debug("Start signup workflow");
        Map<String, Object> variables = new HashMap<String, Object>() {
            {
                put("user", user);
            }
        };
    }
}
