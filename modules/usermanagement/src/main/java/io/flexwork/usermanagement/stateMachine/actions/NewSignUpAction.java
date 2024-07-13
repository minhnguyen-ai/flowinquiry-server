package io.flexwork.usermanagement.stateMachine.actions;

import io.flexwork.usermanagement.stateMachine.SignupEvents;
import io.flexwork.usermanagement.stateMachine.SignupStates;
import io.flexwork.security.domain.User;
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
        User user = (User) context.getExtendedState().getVariables().get("user");
    }
}
