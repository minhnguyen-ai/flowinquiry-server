package io.flexwork.modules.fss.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import lombok.Data;

@Entity
@Table(name = "fw_fss_object_paths")
@Data
public class FsObjectPath implements Serializable {

    @EmbeddedId private FsObjectPathId id;

    @ManyToOne
    @MapsId("ancestorId")
    @JoinColumn(name = "ancestor_id")
    private FsObject ancestor;

    @ManyToOne
    @MapsId("descendantId")
    @JoinColumn(name = "descendant_id")
    private FsObject descendant;

    @Column(nullable = false)
    private int depth;
}
