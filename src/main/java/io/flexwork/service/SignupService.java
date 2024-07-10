package io.flexwork.service;

import io.flexwork.domain.User;
import io.flexwork.stateMacine.signup.SignupEvents;
import io.flexwork.stateMacine.signup.SignupStates;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.annotation.WithStateMachine;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@WithStateMachine
public class SignupService {

    private static final Logger log = LoggerFactory.getLogger(SignupService.class);

    @Autowired
    private StateMachine<SignupStates, SignupEvents> stateMachine;

    public SignupService() {}

    public void signup(User user) {
        log.debug("Start signup workflow {}", user);
        stateMachine
            .sendEvent(Mono.just(MessageBuilder.withPayload(SignupEvents.NEW_SIGNUP).build()))
            .doOnComplete(() -> log.info("Start signing up user {}", user));
    }
}
