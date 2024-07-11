package io.flexwork.service

import io.flexwork.IntegrationTest
import io.flexwork.domain.User
import io.flexwork.stateMacine.signup.SignupEvents
import io.flexwork.stateMacine.signup.SignupStates
import org.assertj.core.api.Assertions.assertThat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.statemachine.StateMachine
import org.springframework.statemachine.persist.StateMachinePersister
import org.springframework.statemachine.service.StateMachineService
import kotlin.test.Test

@IntegrationTest
class SignupServiceTest {

    @Autowired
    private lateinit var signupService: SignupService

    @Autowired
    private lateinit var stateMachineService: StateMachineService<SignupStates, SignupEvents>

    @Autowired
    private lateinit var stateMachinePersister:
        StateMachinePersister<SignupStates, SignupEvents, String>

    @Test
    fun signup() {
        val user = User()
        user.id = "123"
        user.login = "hainguyenLogin"
        user.signupState = SignupStates.NEW_SIGNUP_USER
        user.email = "test@test.com"
        signupService.signup(user)

        assertThat(user.signupState).isEqualTo(SignupStates.NEW_SIGNUP_USER)

        val state = stateMachineService.acquireStateMachine("signu11233p-" + user.id)
        val newState = stateMachinePersister.restore(state, "12113")
        println("He ${state.state} ${newState.state}")
    }
}
