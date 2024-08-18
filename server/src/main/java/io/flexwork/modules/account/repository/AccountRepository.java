package io.flexwork.modules.account.repository;

import io.flexwork.modules.account.domain.Account;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    // Find an account by its name
    Optional<Account> findByAccountName(String accountName);

    // Find accounts by their type
    List<Account> findByAccountType(String accountType);

    // Find accounts by their status
    List<Account> findByStatus(String status);

    // Find accounts by industry
    List<Account> findByIndustry(String industry);

    // Find accounts by parent account
    List<Account> findByParentAccount(Account parentAccount);

    // Find accounts assigned to a specific user
    List<Account> findByAssignedToUserId(Long assignedToUserId);
}
