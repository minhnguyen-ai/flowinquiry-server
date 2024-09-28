package io.flexwork.modules.crm.service.mapper;

import io.flexwork.modules.crm.domain.Account;
import io.flexwork.modules.crm.domain.Contact;
import io.flexwork.modules.crm.service.dto.ContactDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMapper {
    @Mapping(source = "account.id", target = "accountId")
    ContactDTO contactToContactDTO(Contact contact);

    @Mapping(target = "account", expression = "java(ofAccount(contactDTO.getAccountId()))")
    Contact contactDTOToContact(ContactDTO contactDTO);

    default Account ofAccount(Long accountId) {
        Account account = new Account();
        account.setId(accountId);
        return account;
    }
}
