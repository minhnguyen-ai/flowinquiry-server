package io.flexwork.modules.crm.event;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class ActivityLogListener {

    private static final Logger LOG = LoggerFactory.getLogger(ActivityLogListener.class);

    @Async
    @EventListener
    public void handleActivityLogEvent(ActivityLogEvent event) {
        LOG.debug("Save activity log event: {}", event);
    }
}
