package io.flexwork.stateMacine.signup;

import io.flexwork.stateMacine.signup.actions.NewSignUpAction;
import io.flexwork.stateMacine.signup.actions.NewSignupVerificationAction;
import java.util.EnumSet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.statemachine.config.EnableStateMachine;
import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.EnumStateMachineConfigurerAdapter;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.guard.Guard;

@Configuration
@EnableStateMachine
public class SignupSMConfig extends EnumStateMachineConfigurerAdapter<SignupStates, SignupEvents> {

    private NewSignUpAction newSignUpAction;

    private NewSignupVerificationAction newSignupVerificationAction;

    public SignupSMConfig(NewSignUpAction newSignUpAction, NewSignupVerificationAction newSignupVerificationAction) {
        this.newSignUpAction = newSignUpAction;
        this.newSignupVerificationAction = newSignupVerificationAction;
    }

    @Override
    public void configure(StateMachineStateConfigurer<SignupStates, SignupEvents> states) throws Exception {
        states
            .withStates()
            .initial(SignupStates.NEW_SIGNUP_USER)
            .states(EnumSet.allOf(SignupStates.class))
            .end(SignupStates.SIGNUP_COMPLETED);
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<SignupStates, SignupEvents> transitions) throws Exception {
        transitions
            .withExternal()
            .source(SignupStates.NEW_SIGNUP_USER)
            .target(SignupStates.SIGNING_UP)
            .event(SignupEvents.NEW_SIGNUP)
            .guard(signupGuard())
            .action(newSignUpAction)
            .and()
            .withExternal()
            .source(SignupStates.SIGNING_UP)
            .target(SignupStates.SIGNUP_VERIFICATION)
            .event(SignupEvents.SIGNUP_VERIFICATION)
            .action(newSignupVerificationAction)
            .and()
            .withExternal()
            .source(SignupStates.SIGNUP_VERIFICATION)
            .target(SignupStates.SIGNUP_COMPLETED)
            .event(SignupEvents.SIGNUP_SUCCESS);
    }

    @Bean
    public Guard<SignupStates, SignupEvents> signupGuard() {
        return context -> {
            System.out.println("Signup Guard");
            return true;
        };
    }
}
