package io.flexwork.modules.signup.service

import io.flexwork.IntegrationTest
import io.flexwork.security.domain.User
import io.flexwork.modules.signup.stateMachine.SignupEvents
import io.flexwork.modules.signup.stateMachine.SignupStates
import kotlin.test.Test
import org.assertj.core.api.Assertions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.statemachine.service.StateMachineService

@IntegrationTest
class SignupServiceTest {

  @Autowired private lateinit var signupService: SignupService

  @Autowired
  private lateinit var stateMachineService: StateMachineService<SignupStates, SignupEvents>

  @Test
  fun signup() {
    val user = io.flexwork.security.domain.User()
    user.id = "123"
    user.login = "hainguyenLogin"
    user.signupState = SignupStates.NEW_SIGNUP_USER
    user.email = "test@test.com"
    signupService.signup(user)

    Assertions.assertThat(user.signupState).isEqualTo(SignupStates.NEW_SIGNUP_USER)

    val state = stateMachineService.acquireStateMachine("signup-" + user.id)
    println("He ${state.state}")
  }
}
