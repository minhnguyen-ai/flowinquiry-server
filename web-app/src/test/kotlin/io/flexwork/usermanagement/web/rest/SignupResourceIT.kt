package io.flexwork.usermanagement.web.rest

import com.fasterxml.jackson.databind.ObjectMapper
import com.icegreen.greenmail.configuration.GreenMailConfiguration
import com.icegreen.greenmail.junit5.GreenMailExtension
import com.icegreen.greenmail.util.ServerSetupTest
import io.flexwork.IntegrationTest
import io.flexwork.security.domain.User
import io.flexwork.test.util.OAuth2TestUtil
import kotlin.test.Test
import org.junit.jupiter.api.extension.RegisterExtension
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.http.MediaType
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService
import org.springframework.security.oauth2.client.registration.ClientRegistration
import org.springframework.security.test.context.TestSecurityContextHolder
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@AutoConfigureMockMvc
@IntegrationTest
@WithMockUser(authorities = ["ROLE_ADMIN"])
class SignupResourceIT {

  companion object {
    @RegisterExtension
    var greenMail: GreenMailExtension =
        GreenMailExtension(ServerSetupTest.SMTP_IMAP)
            .withConfiguration(
                GreenMailConfiguration.aConfig()
                    .withUser("noreply@flexwork", "flexwork", "flework-pass"))
  }

  @Autowired private lateinit var om: ObjectMapper

  @Autowired private lateinit var restSignupMockMvc: MockMvc

  @Autowired private lateinit var authorizedClientService: OAuth2AuthorizedClientService

  @Autowired private lateinit var clientRegistration: ClientRegistration

  @Test
  fun testSignupSuccessfully() {
    TestSecurityContextHolder.getContext().authentication =
        OAuth2TestUtil.registerAuthenticationToken(
            authorizedClientService, clientRegistration, OAuth2TestUtil.testAuthenticationToken())
    val user = User()
    user.email = "hainguyen@flexwork.io"
    user.id = "userid"
    user.firstName = "Hai"
    user.lastName = "Nguyen"
    restSignupMockMvc
        .perform(
            MockMvcRequestBuilders.post("/api/signup")
                .with(csrf())
                .content(om.writeValueAsString(user))
                .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk)
  }

  @Test
  fun testSignupUnAuthorizedClient() {
    restSignupMockMvc
        .perform(MockMvcRequestBuilders.post("/api/signup").accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isForbidden)
  }
}
