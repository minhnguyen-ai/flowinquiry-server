package io.flexwork.security.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import lombok.Data;

@Entity
@Table(name = "fw_tenant")
@Data
public class Tenant extends AbstractAuditingEntity<Long> implements Serializable {
    @Id private Long id;

    @Size(max = 255)
    @NotNull @Column
    private String name;

    @Size(max = 4000)
    @Column
    private String description;

    @Size(max = 255)
    @Column(length = 255, name = "logo_url")
    private String logoUrl;

    @Size(max = 255)
    @NotNull @Column
    private String domain;
}
