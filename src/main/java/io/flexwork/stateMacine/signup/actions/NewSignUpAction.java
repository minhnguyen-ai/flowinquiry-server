package io.flexwork.stateMacine.signup.actions;

import io.flexwork.stateMacine.signup.SignupEvents;
import io.flexwork.stateMacine.signup.SignupStates;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.statemachine.StateContext;
import org.springframework.statemachine.action.Action;
import org.springframework.stereotype.Component;

@Component
public class NewSignUpAction implements Action<SignupStates, SignupEvents> {

    private static Logger log = LoggerFactory.getLogger(NewSignUpAction.class);

    @Override
    public void execute(StateContext<SignupStates, SignupEvents> context) {
        log.debug("New signup action");
    }
}
