package io.flexwork.stateMacine;

import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.StateMachineConfigurerAdapter;

@EnableStateMachineFactory
public class SignupSMConfig extends StateMachineConfigurerAdapter<StateEnum, EventEnum> {}

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
