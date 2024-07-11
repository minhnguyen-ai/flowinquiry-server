package io.flexwork.service

import io.flexwork.IntegrationTest
import io.flexwork.domain.User
import io.flexwork.stateMacine.signup.SignupEvents
import io.flexwork.stateMacine.signup.SignupStates
import org.assertj.core.api.Assertions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.statemachine.service.StateMachineService
import kotlin.test.Test

@IntegrationTest
class SignupServiceTest {
    
    @Autowired
    private val signupService: SignupService? = null

    @Autowired
    private val stateMachineService: StateMachineService<SignupStates, SignupEvents>? = null

    @Test
    fun signup() {
        val user = User()
        user.id = "123"
        user.login = "hainguyenLogin"
        user.signupState = SignupStates.NEW_SIGNUP_USER
        user.email = "test@test.com"
        signupService!!.signup(user)

        Assertions.assertThat(user.signupState).isEqualTo(SignupStates.NEW_SIGNUP_USER)
        val state = stateMachineService!!.acquireStateMachine("signu11233p-" + user.id)
        println("He " + state.state)
    }
}
