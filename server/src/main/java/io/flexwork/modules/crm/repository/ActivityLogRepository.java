package io.flexwork.modules.crm.repository;

import io.flexwork.modules.crm.domain.ActivityLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    @Query(
            "SELECT al FROM ActivityLog al "
                    + "JOIN AuthorityResourcePermission ep ON ep.resource.name = al.entityType "
                    + "JOIN User user ON ep.authority IN (user.authorities) "
                    + "WHERE ep.user.id = :userId "
                    + "AND ep.permission IN (io.flexwork.security.domain.Permission.READ, io.flexwork.security.domain.Permission.WRITE, io.flexwork.security.domain.Permission.ACCESS) "
                    + "ORDER BY al.activityDate DESC")
    Page<ActivityLog> findAccessibleActivityLogs(@Param("userId") Long userId, Pageable pageable);
}
