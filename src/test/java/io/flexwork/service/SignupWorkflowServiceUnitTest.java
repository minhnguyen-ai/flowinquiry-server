package io.flexwork.service;

import org.flowable.engine.test.Deployment;
import org.flowable.spring.impl.test.FlowableSpringExtension;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(FlowableSpringExtension.class)
@ExtendWith(SpringExtension.class)
public class SignupWorkflowServiceUnitTest {

    @Test
    @Deployment(resources = { "processes/signup.bpmn20.xml" })
    void signupWorkflowTest() {}
}
