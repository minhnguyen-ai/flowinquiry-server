package io.flexwork.security.domain;

import static io.flexwork.platform.db.DbConstants.MASTER_SCHEMA;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import lombok.Data;

@Entity
@Table(name = "fw_tenant", schema = MASTER_SCHEMA)
@Data
public class Tenant extends AbstractAuditingEntity<Long> implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @NotNull @Column
    private String name;

    @Size(max = 50)
    @NotNull @Column(name = "name_id")
    private String nameId;

    @Size(max = 4000)
    @Column
    private String description;

    @Size(max = 255)
    @Column(length = 255, name = "logo_url")
    private String logoUrl;

    @Size(max = 50)
    @NotNull @Column
    private String realm;

    @Size(max = 255)
    @NotNull @Column
    private String domain;
}
