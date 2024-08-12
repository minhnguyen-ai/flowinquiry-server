package io.flexwork.security.service.dto;

import io.flexwork.domain.Authority;
import io.flexwork.domain.User;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import lombok.Data;

@Data
/** A DTO representing a user, with only the public attributes. */
public class UserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String login;

    private String email;

    private String firstName;

    private String lastName;

    private Set<Authority> authorities;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this.id = user.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.login = user.getLogin();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDTO userDTO = (UserDTO) o;
        return Objects.equals(id, userDTO.id) && Objects.equals(login, userDTO.login);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, login);
    }
}
