package io.flexwork.usermanagement.service

import io.flexwork.IntegrationTest
import io.flexwork.usermanagement.stateMachine.SignupStates
import org.assertj.core.api.Assertions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.statemachine.service.StateMachineService
import kotlin.test.Test

@IntegrationTest
class SignupServiceTest {

  @Autowired private lateinit var signupService: SignupService

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

    val state = stateMachineService.acquireStateMachine("signup-" + user.id)
    println("He ${state.state}")
  }
}
