package io.flexwork.stateMacine;

import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.StateMachineConfigurerAdapter;
import org.springframework.statemachine.config.builders.StateMachineConfigBuilder;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;

@EnableStateMachineFactory
public class SignupSMConfig extends StateMachineConfigurerAdapter<StateEnum, EventEnum> {

    @Override
    public void configure(StateMachineConfigBuilder<StateEnum, EventEnum> config) throws Exception {
        super.configure(config);
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<StateEnum, EventEnum> transitions) throws Exception {
        super.configure(transitions);
    }
}

enum StateEnum {
    A,
    B,
    C,
    D,
    E,
}

enum EventEnum {
    E1,
    E2,
    E3,
    E4,
}
