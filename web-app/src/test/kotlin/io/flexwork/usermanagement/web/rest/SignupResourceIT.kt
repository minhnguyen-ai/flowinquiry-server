package io.flexwork.usermanagement.web.rest

import io.flexwork.IntegrationTest
import io.flexwork.test.util.OAuth2TestUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService
import org.springframework.security.oauth2.client.registration.ClientRegistration
import org.springframework.security.test.context.TestSecurityContextHolder
import org.springframework.test.web.servlet.MockMvc
import kotlin.test.Test

@AutoConfigureMockMvc
@IntegrationTest
class SignupResourceIT {

    @Autowired
    private lateinit var restAccountMockMvc: MockMvc

    @Autowired
    private lateinit var authorizedClientService: OAuth2AuthorizedClientService

    @Autowired
    private lateinit var  clientRegistration: ClientRegistration

    @Test
    fun testSignup() {
        TestSecurityContextHolder.getContext().authentication = OAuth2TestUtil.registerAuthenticationToken(
            authorizedClientService, clientRegistration, OAuth2TestUtil.testAuthenticationToken()
        )

    }
}