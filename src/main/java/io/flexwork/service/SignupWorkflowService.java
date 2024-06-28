package io.flexwork.service;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.springframework.stereotype.Service;

@Service
public class SignupWorkflowService {

    private RuntimeService runtimeService;

    private TaskService taskService;

    public SignupWorkflowService(RuntimeService runtimeService, TaskService taskService) {
        this.runtimeService = runtimeService;
        this.taskService = taskService;
    }

    public void signuo() {
        runtimeService.startProcessInstanceByKey("signup");
    }
}
