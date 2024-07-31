package io.flexwork.modules.fss.domain;

import io.flexwork.domain.AbstractAuditingEntity;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Entity
@Table(name = "fw_fss_object")
@Data
public class FsObject extends AbstractAuditingEntity<Long> implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", length = 255, unique = true)
    private String name;

    @Column(name = "description", length = 4000)
    private String description;

    @OneToMany(mappedBy = "descendant", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<FsObjectPath> ancestors = new HashSet<>();

    @OneToMany(mappedBy = "ancestor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<FsObjectPath> descendants = new HashSet<>();
}
