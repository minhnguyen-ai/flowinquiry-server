package io.flowinquiry.modules.collab.service;

import io.flowinquiry.config.FlowInquiryProperties;
import io.flowinquiry.modules.collab.EmailContext;
import io.flowinquiry.modules.usermanagement.service.dto.UserDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

/**
 * Service for sending emails asynchronously.
 *
 * <p>We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

    private static final Logger LOG = LoggerFactory.getLogger(MailService.class);

    private static final String USER = "user";

    private static final String BASE_URL = "baseUrl";

    private final FlowInquiryProperties flowInquiryProperties;
    private final Optional<JavaMailSender> javaMailSender;
    private final MessageSource messageSource;
    private final SpringTemplateEngine templateEngine;

    public MailService(
            FlowInquiryProperties flowInquiryProperties,
            Optional<JavaMailSender> javaMailSender,
            MessageSource messageSource,
            SpringTemplateEngine templateEngine) {
        this.flowInquiryProperties = flowInquiryProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendEmail(
            String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        javaMailSender.ifPresentOrElse(
                sender -> sendEmailSync(sender, to, subject, content, isMultipart, isHtml),
                () ->
                        LOG.warn(
                                "Mail sending is disabled. Skipping email to '{}' with content {}",
                                to,
                                content));
    }

    private void sendEmailSync(
            JavaMailSender sender,
            String to,
            String subject,
            String content,
            boolean isMultipart,
            boolean isHtml) {
        LOG.debug(
                "Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
                isMultipart,
                isHtml,
                to,
                subject,
                content);

        try {
            MimeMessage mimeMessage = sender.createMimeMessage();
            MimeMessageHelper message =
                    new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(flowInquiryProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);
            sender.send(mimeMessage);
            LOG.debug("Sent email to User '{}'", to);
        } catch (MailException | MessagingException e) {
            LOG.warn("Email could not be sent to user '{}'", to, e);
        }
    }

    @Async
    public void sendEmailFromTemplate(UserDTO user, String templateName, String titleKey) {
        if (user.getEmail() == null) {
            LOG.debug("Email doesn't exist for user '{}'", user);
            return;
        }
        Locale locale = Locale.forLanguageTag(user.getLangKey() != null ? user.getLangKey() : "en");
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, flowInquiryProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);

        this.sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendEmail(EmailContext emailContext) {
        if (emailContext.getToUser() == null
                || emailContext.getToUser().getEmail() == null
                || emailContext.getSubject() == null) {
            LOG.debug(
                    "Email doesn't exist for user '{}' or no subject for email context '{}'",
                    emailContext.getToUser(),
                    emailContext.getSubject());
            return;
        }
        emailContext.addVariable(USER, emailContext.getToUser());
        String content =
                templateEngine.process(
                        emailContext.getTemplate(), emailContext.getThymeleafContext());
        this.sendEmail(
                emailContext.getToUser().getEmail(),
                emailContext.getSubject(),
                content,
                false,
                true);
    }

    @Async
    public void sendActivationEmail(UserDTO user) {
        LOG.debug("Sending activation email to '{}'", user.getEmail());
        this.sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Async
    public void sendCreationEmail(UserDTO user) {
        LOG.debug("Sending creation email to '{}'", user.getEmail());
        this.sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Async
    public void sendPasswordResetMail(UserDTO user) {
        LOG.debug("Sending password reset email to '{}'", user.getEmail());
        this.sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }
}
