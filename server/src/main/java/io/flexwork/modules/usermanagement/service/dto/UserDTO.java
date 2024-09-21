package io.flexwork.modules.usermanagement.service.dto;

import io.flexwork.modules.usermanagement.domain.Authority;
import io.flexwork.modules.usermanagement.domain.User;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
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

    private LocalDateTime lastLoginTime;

    private Set<Authority> authorities;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        // Customize it here if you need, or not, firstName/lastName/etc
    }

    public LocalDateTime getLastLoginTime() {
        if (lastLoginTime == null) return null;
        ZoneId userZone = ZoneId.of(timezone);
        return lastLoginTime.atZone(ZoneOffset.UTC).withZoneSameInstant(userZone).toLocalDateTime();
    }

    public void setLastLoginTime(LocalDateTime lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
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
