package io.flexwork.modules.crm.event;

import org.springframework.context.ApplicationEvent;

public class ActivityLogEvent extends ApplicationEvent {

    public ActivityLogEvent(Object source) {
        super(source);
    }
}
