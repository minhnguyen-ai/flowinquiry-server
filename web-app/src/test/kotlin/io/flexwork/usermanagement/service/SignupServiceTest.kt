package io.flexwork.usermanagement.service

import io.flexwork.IntegrationTest
import io.flexwork.usermanagement.stateMachine.SignupEvents
import io.flexwork.usermanagement.stateMachine.SignupStates
import kotlin.test.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.statemachine.service.StateMachineService

@IntegrationTest
class SignupServiceTest {

  @Autowired private lateinit var signupService: SignupService

  @Autowired
  private lateinit var stateMachineService: StateMachineService<SignupStates, SignupEvents>

  @Test
  fun signup() {
    //    val user = io.flexwork.security.domain.User()
    //    user.id = "123"
    //    user.login = "hainguyenLogin"
    //    user.signupState = "Active"
    //    user.email = "test@test.com"
    //    signupService.signup(user)
    //
    //    val state = stateMachineService.acquireStateMachine("signup-" + user.id)
    //    println("He ${state.state}")
  }
}
