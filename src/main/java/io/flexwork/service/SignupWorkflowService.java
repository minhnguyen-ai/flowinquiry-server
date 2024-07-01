package io.flexwork.service;

import io.flexwork.domain.User;
import java.util.HashMap;
import java.util.Map;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SignupWorkflowService {

    private static final Logger log = LoggerFactory.getLogger(SignupWorkflowService.class);

    private RuntimeService runtimeService;

    private TaskService taskService;

    public SignupWorkflowService(RuntimeService runtimeService, TaskService taskService) {
        this.runtimeService = runtimeService;
        this.taskService = taskService;
    }

    public void signup(User user) {
        log.debug("Start signup workflow");
        Map<String, Object> variables = new HashMap<String, Object>() {
            {
                put("user", user);
            }
        };
        runtimeService.startProcessInstanceByKey("signup", variables);
    }
}
