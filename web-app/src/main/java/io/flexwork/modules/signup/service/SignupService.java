package io.flexwork.modules.signup.service;

import io.flexwork.domain.User;
import io.flexwork.modules.signup.stateMachine.SignupEvents;
import io.flexwork.modules.signup.stateMachine.SignupStates;
import io.flexwork.repository.UserRepository;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.annotation.WithStateMachine;
import org.springframework.statemachine.persist.StateMachinePersister;
import org.springframework.statemachine.service.StateMachineService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Service
@WithStateMachine
public class SignupService {

    private static final Logger log = LoggerFactory.getLogger(SignupService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StateMachineService<SignupStates, SignupEvents> stateMachineService;

    @Autowired
    private StateMachinePersister<SignupStates, SignupEvents, String> stateMachinePersister;

    public SignupService() {}

    @SneakyThrows
    public void signup(User user) {
        log.debug("Start signup workflow {}", user);
        Optional<User> existingUser = userRepository.findById(user.getId());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User " + user.getId() + " existed");
        } else {
            userRepository.save(user);
            StateMachine<SignupStates, SignupEvents> stateMachine = stateMachineService.acquireStateMachine("signup-" + user.getId(), true);

            stateMachine.getExtendedState().getVariables().put("user", user);
            stateMachine
                .sendEvent(Mono.just(MessageBuilder.withPayload(SignupEvents.NEW_SIGNUP).build()))
                .subscribe(signupStatesSignupEventsStateMachineEventResult -> log.debug("Success {}", stateMachine));
            stateMachinePersister.persist(stateMachine, "signup-" + user.getId());
        }
    }
}
