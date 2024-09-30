package io.flexwork.modules.crm.service.mapper;

import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.service.dto.AccountDTO;
import io.flexwork.modules.usermanagement.domain.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    // Mapping from entity to DTO
    @Mapping(target = "parentAccountId", source = "parentAccount.id")
    @Mapping(target = "assignedToUserId", source = "assignedToUser.id")
    AccountDTO accountToAccountDTO(Account account);

    // Mapping from DTO to entity
    @Mapping(
            target = "assignedToUser",
            expression = "java(ofUser(accountDTO.getAssignedToUserId()))")
    @Mapping(
            target = "parentAccount",
            expression = "java(ofParentAccount(accountDTO.getParentAccountId()))")
    Account accountDTOToAccount(AccountDTO accountDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(
            target = "assignedToUser",
            expression = "java(ofUser(accountDTO.getAssignedToUserId()))")
    @Mapping(
            target = "parentAccount",
            expression = "java(ofParentAccount(accountDTO.getParentAccountId()))")
    void updateAccountFromDTO(AccountDTO accountDTO, @MappingTarget Account account);

    default User ofUser(Long userId) {
        return (userId == null) ? null : User.builder().id(userId).build();
    }

    default Account ofParentAccount(Long parentAccountId) {
        return (parentAccountId == null) ? null : Account.builder().id(parentAccountId).build();
    }
}
