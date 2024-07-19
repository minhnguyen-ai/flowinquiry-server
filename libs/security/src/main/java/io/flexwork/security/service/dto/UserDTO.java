package io.flexwork.security.service.dto;

import io.flexwork.security.domain.User;
import java.io.Serializable;
import lombok.Data;

/** A DTO representing a user, with only the public attributes. */
@Data
public class UserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    private String login;

    private String firstName;

    private String lastName;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this.id = user.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.login = user.getLogin();
    }
}
