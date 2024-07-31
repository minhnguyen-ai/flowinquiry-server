package io.flexwork.modules.fss.domain;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.Data;

@Data
@Embeddable
public class FsObjectPathId implements Serializable {
    private Long ancestorId;

    private Long descendantId;
}
