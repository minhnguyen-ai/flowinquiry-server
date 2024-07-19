package io.flexwork.security.service.mapper;

import io.flexwork.security.domain.User;
import io.flexwork.security.service.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper instance = Mappers.getMapper(UserMapper.class);

    User userDtoToUser(UserDTO userDTO);
}
