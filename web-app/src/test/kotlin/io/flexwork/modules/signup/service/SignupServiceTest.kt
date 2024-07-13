package io.flexwork.modules.signup.service

import io.flexwork.IntegrationTest
import io.flexwork.usermanagement.stateMachine.SignupEvents
import io.flexwork.usermanagement.stateMachine.SignupStates
import kotlin.test.Test
import org.assertj.core.api.Assertions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.statemachine.service.StateMachineService

@IntegrationTest
class SignupServiceTest {

  @Autowired private lateinit var signupService: io.flexwork.usermanagement.service.SignupService

  @Autowired
  private lateinit var stateMachineService: StateMachineService<io.flexwork.usermanagement.stateMachine.SignupStates, io.flexwork.usermanagement.stateMachine.SignupEvents>

  @Test
  fun signup() {
    val user = io.flexwork.security.domain.User()
    user.id = "123"
    user.login = "hainguyenLogin"
    user.signupState = "Active"
    user.email = "test@test.com"
    signupService.signup(user)

    Assertions.assertThat(user.signupState).isEqualTo(io.flexwork.usermanagement.stateMachine.SignupStates.NEW_SIGNUP_USER)

    val state = stateMachineService.acquireStateMachine("signup-" + user.id)
    println("He ${state.state}")
  }
}
