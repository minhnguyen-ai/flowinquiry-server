package io.flexwork.usermanagement.stateMachine.actions;

import io.flexwork.security.domain.User;
import io.flexwork.usermanagement.stateMachine.SignupEvents;
import io.flexwork.usermanagement.stateMachine.SignupStates;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.statemachine.StateContext;
import org.springframework.statemachine.action.Action;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Component
public class NewSignUpAction implements Action<SignupStates, SignupEvents> {

    private static final Logger log = LoggerFactory.getLogger(NewSignUpAction.class);

    private JavaMailSender mailSender;

    private SpringTemplateEngine templateEngine;

    public NewSignUpAction(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void execute(StateContext<SignupStates, SignupEvents> context) {
        User user = (User) context.getExtendedState().getVariables().get("user");

        log.debug("Send email to the new user");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("haiphucnguyen@gmail.com");
        message.setSubject("Sign up");
        message.setFrom("noreply@flexwork.com");
        Context templateContext = new Context();
        templateContext.setVariable("user", user);
        String body = templateEngine.process("email_verification.html", templateContext);
        message.setText(body);
        mailSender.send(message);
    }
}
