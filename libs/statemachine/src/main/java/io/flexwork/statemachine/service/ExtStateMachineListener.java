package io.flexwork.statemachine.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.listener.StateMachineListenerAdapter;

/**
 * Default listener for the flexwork app
 * @param <S>
 * @param <E>
 */
public class ExtStateMachineListener<S, E> extends StateMachineListenerAdapter<S, E> {
    private static Logger log = LoggerFactory.getLogger(ExtStateMachineListener.class);

    @Override
    public void stateMachineError(StateMachine<S, E> stateMachine, Exception exception) {
        log.error("State machine {} has error at state {} with detail exception", stateMachine.getId(), stateMachine.getState().getId(), exception);
        super.stateMachineError(stateMachine, exception);
    }
}
