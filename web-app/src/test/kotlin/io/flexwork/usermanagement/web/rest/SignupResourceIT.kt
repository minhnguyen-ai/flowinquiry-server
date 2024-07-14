package io.flexwork.usermanagement.web.rest

import com.fasterxml.jackson.databind.ObjectMapper
import io.flexwork.IntegrationTest
import io.flexwork.security.domain.User
import io.flexwork.test.util.OAuth2TestUtil
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
import kotlin.test.Test

@AutoConfigureMockMvc
@IntegrationTest
@WithMockUser(authorities = ["ROLE_ADMIN"])
class SignupResourceIT {

    @Autowired
    private lateinit var om: ObjectMapper

    @Autowired
    private lateinit var restSignupMockMvc: MockMvc

    @Autowired
    private lateinit var authorizedClientService: OAuth2AuthorizedClientService

    @Autowired
    private lateinit var clientRegistration: ClientRegistration

    @Test
    fun testSignupSuccessfully() {
        TestSecurityContextHolder.getContext().authentication = OAuth2TestUtil.registerAuthenticationToken(
            authorizedClientService, clientRegistration, OAuth2TestUtil.testAuthenticationToken()
        )
        val user = User()
        user.email = "hainguyen@flexwork.io"
        user.id = "userid"
        user.login = "hainguyen@flexwork.io"
        user.firstName = "Hai"
        user.lastName = "Nguyen"
        restSignupMockMvc
            .perform(MockMvcRequestBuilders.post("/api/signup")
                .with(csrf())
                .content(om.writeValueAsString(user))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun testSignupUnthorizedClient() {
        restSignupMockMvc
            .perform(MockMvcRequestBuilders.post("/api/signup").accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isForbidden)
    }
}