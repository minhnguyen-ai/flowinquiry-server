package io.flexwork.fss.domain;

import io.flexwork.security.domain.AbstractAuditingEntity;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import lombok.Data;

@Entity
@Table(name = "fw_fss_object")
@Data
public class FsObject extends AbstractAuditingEntity<BigInteger> implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger id;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "description", length = 4000)
    private String description;

    @Column private FsType type;

    public enum FsType {
        File,
        Folder
    }
}
