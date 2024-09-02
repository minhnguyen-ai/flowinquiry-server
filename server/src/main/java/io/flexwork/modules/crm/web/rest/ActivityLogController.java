package io.flexwork.modules.crm.web.rest;

import io.flexwork.modules.crm.domain.ActivityLog;
import io.flexwork.modules.crm.service.ActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/crm/activity-logs")
public class ActivityLogController {
    private ActivityLogService activityLogService;

    @GetMapping("/accessible")
    public Page<ActivityLog> getAccessibleActivityLogs(
            @RequestParam Long userId, Pageable pageable) {
        return activityLogService.getAccessibleActivityLogs(userId, pageable);
    }
}
