package io.flexwork.modules.account.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "fw_crm_call")
@Data
public class Call {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer duration; // Duration in minutes

    @Enumerated(EnumType.STRING)
    private CallResult callResult;

    private String phoneNumber;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum CallResult {
        SUCCESSFUL,
        UNSUCCESSFUL,
        VOICEMAIL
    }
}
