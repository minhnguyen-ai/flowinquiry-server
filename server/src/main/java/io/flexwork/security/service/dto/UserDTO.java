package io.flexwork.security.service.dto;

import io.flexwork.domain.Authority;
import io.flexwork.domain.User;
import java.io.Serializable;
import java.time.ZoneId;
import java.util.Objects;
import java.util.Set;
import lombok.Data;

@Data
/** A DTO representing a user, with only the public attributes. */
public class UserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String email;

    private String firstName;

    private String lastName;

    private String timezone;

    private Set<Authority> authorities;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        // Customize it here if you need, or not, firstName/lastName/etc
    }

    public ZoneId getTimezone() {
        return ZoneId.of(timezone);
    }

    public void setTimezone(ZoneId timezone) {
        this.timezone = timezone.getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDTO userDTO = (UserDTO) o;
        return Objects.equals(id, userDTO.id) && Objects.equals(email, userDTO.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }
}
