package io.flexwork.modules.fss.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.flexwork.IntegrationTest;
import io.flexwork.modules.fss.domain.FsObject;
import io.flexwork.modules.fss.repository.FsObjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
public class FsObjectServiceIT {
    @Autowired private FsObjectService fsObjectService;

    @Autowired private FsObjectRepository fsObjectRepository;

    @Test
    public void testCreateCategory() {
        FsObject category = fsObjectService.createFsObject("Home", "desc");

        assertNotNull(category.getId());
        assertEquals("Home", category.getName());
    }
}
