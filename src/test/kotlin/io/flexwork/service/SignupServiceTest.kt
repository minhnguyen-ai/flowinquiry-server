package io.flexwork.service

import io.flexwork.IntegrationTest
import io.flexwork.domain.User
import io.flexwork.stateMacine.signup.SignupEvents
import io.flexwork.stateMacine.signup.SignupStates
import kotlin.test.Test
import org.assertj.core.api.Assertions.assertThat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.statemachine.config.StateMachineFactory
import org.springframework.statemachine.service.StateMachineService

@IntegrationTest
class SignupServiceTest {

  @Autowired
  private lateinit var signupService: SignupService

  @Autowired
  private lateinit var stateMachineService: StateMachineService<SignupStates, SignupEvents>

  private lateinit var stateMachineFactory: StateMachineFactory<SignupStates, SignupEvents>

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
    println("He " + state.state)
  }
}
