package io.flexwork.modules.crm.service.mapper;

import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.service.dto.AccountDTO;
import io.flexwork.modules.usermanagement.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    // Mapping from entity to DTO
    AccountDTO accountToAccountDTO(Account account);

    // Mapping from DTO to entity
    @Mapping(
            target = "assignedToUser",
            expression = "java(ofUser(accountDTO.getAssignedToUserId()))")
    Account accountDTOToAccount(AccountDTO accountDTO);

    default User ofUser(Long userId) {
        return User.builder().id(userId).build();
    }
}
