package io.flexwork.service;

import io.flexwork.domain.User;
import io.flexwork.repository.UserRepository;
import io.flexwork.stateMacine.signup.SignupEvents;
import io.flexwork.stateMacine.signup.SignupStates;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.annotation.WithStateMachine;
import org.springframework.statemachine.config.StateMachineFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@WithStateMachine
public class SignupService {

    private static final Logger log = LoggerFactory.getLogger(SignupService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StateMachineFactory<SignupStates, SignupEvents> stateMachineFactory;

    public SignupService() {}

    public void signup(User user) {
        log.debug("Start signup workflow {}", user);
        Optional<User> existingUser = userRepository.findById(user.getId());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User " + user.getId() + " existed");
        } else {
            userRepository.save(user);
            StateMachine<SignupStates, SignupEvents> stateMachine = stateMachineFactory.getStateMachine();

            stateMachine
                .sendEvent(Mono.just(MessageBuilder.withPayload(SignupEvents.NEW_SIGNUP).build()))
                .doOnComplete(() -> log.info("Start signing up user {}", user));
        }
    }
}
