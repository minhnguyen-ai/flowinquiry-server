package io.flexwork.security.service.dto;

import java.io.Serializable;
import lombok.Data;

@Data
public class TenantDTO implements Serializable {
    private Long id;

    private String name;

    private String description;

    private String logoUrl;

    private String domain;
}
