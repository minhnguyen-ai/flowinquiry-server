package io.flexwork.modules.crm.repository;

import io.flexwork.modules.crm.domain.ActivityLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    @Query(name = "findAccessibleLogs", nativeQuery = true)
    Page<ActivityLog> findAccessibleActivityLogs(@Param("userId") Long userId, Pageable pageable);
}
