package io.flowinquiry.modules.fss.service.dto;

import java.time.Instant;
import lombok.Data;

@Data
public class EntityAttachmentDTO {
    private Long id;
    private String entityType;
    private Long entityId;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String fileUrl;
    private Instant uploadedAt;
}
