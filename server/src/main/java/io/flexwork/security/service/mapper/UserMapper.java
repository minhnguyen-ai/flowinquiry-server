package io.flexwork.security.service.mapper;

import io.flexwork.domain.User;
import io.flexwork.security.service.dto.UserDTO;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO userToUserDTO(User user);

    List<UserDTO> usersToUserDTOs(List<User> users);
}
