package io.flexwork.modules.crm.service;

import io.flexwork.modules.crm.domain.ActivityLog;
import io.flexwork.modules.crm.repository.ActivityLogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ActivityLogService {
    private ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    public Page<ActivityLog> getAccessibleActivityLogs(Long userId, Pageable pageable) {
        return activityLogRepository.findAccessibleActivityLogs(userId, pageable);
    }
}
