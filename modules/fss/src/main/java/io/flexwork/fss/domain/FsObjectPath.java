package io.flexwork.fss.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fw_fss_object_paths")
public class FsObjectPath {

    @EmbeddedId private FsObjectPathKey id;

    @Column private int dept;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FsObjectPathKey implements Serializable {
        private BigInteger ancestor;

        private BigInteger descendant;
    }
}
