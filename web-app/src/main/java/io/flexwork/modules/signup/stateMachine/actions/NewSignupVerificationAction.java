package io.flexwork.modules.signup.stateMachine.actions;

import io.flexwork.modules.signup.stateMachine.SignupEvents;
import io.flexwork.modules.signup.stateMachine.SignupStates;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.statemachine.StateContext;
import org.springframework.statemachine.action.Action;
import org.springframework.stereotype.Component;

@Component
public class NewSignupVerificationAction implements Action<SignupStates, SignupEvents> {

    private static Logger log = LoggerFactory.getLogger(NewSignupVerificationAction.class);

    @Override
    public void execute(StateContext<SignupStates, SignupEvents> context) {
        log.debug("Verifying the new signup user");
    }
}
