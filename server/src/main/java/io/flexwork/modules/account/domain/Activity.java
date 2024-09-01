package io.flexwork.modules.account.domain;

import io.flexwork.security.domain.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "fw_crm_activity")
@Data
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EntityType entityType;

    @Column(nullable = false)
    private Long entityId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType activityType;

    @Column(nullable = false)
    private Long activityId;

    @Column(nullable = false)
    private LocalDate activityDate;

    @Lob private String notes;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Getters and setters

    public enum EntityType {
        ACCOUNT,
        CONTACT,
        OPPORTUNITY,
        CASE,
        OTHER
    }

    public enum ActivityType {
        CALL,
        EMAIL,
        MEETING,
        TASK
    }
}
