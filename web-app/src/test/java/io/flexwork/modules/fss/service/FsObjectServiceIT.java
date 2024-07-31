package io.flexwork.modules.fss.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.flexwork.IntegrationTest;
import io.flexwork.modules.fss.domain.FsObject;
import io.flexwork.modules.fss.repository.FsObjectRepository;
import java.util.Arrays;
import java.util.List;
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

    @Test
    public void testAddSubCategory() {
        FsObject parent = fsObjectService.createFsObject("Home", "Home's Desc");
        FsObject child = fsObjectService.addSubObject(parent, "User", "Desc");

        assertNotNull(child);
        assertEquals("User", child.getName());

        List<FsObject> directDescendants = fsObjectService.getDirectDescendants(parent.getId());
        assertEquals(1, directDescendants.size());
        assertEquals("User", directDescendants.get(0).getName());
    }

    @Test
    public void testGetCategoryById() {
        FsObject category = fsObjectService.createFsObject("Home", "");

        FsObject foundCategory = fsObjectService.getCategoryById(category.getId());

        assertEquals(category.getId(), foundCategory.getId());
        assertEquals("Home", foundCategory.getName());
    }

    @Test
    public void testGetAllDescendants() {
        FsObject root = fsObjectService.createFsObject("Home", "");
        fsObjectService.addSubObject(root, "User1", "");
        fsObjectService.addSubObject(root, "User2", "");

        List<FsObject> descendants = fsObjectService.getAllDescendants(root.getId());

        assertEquals(2, descendants.size());
        assertThat(descendants.stream().map(FsObject::getName))
                .hasSameElementsAs(Arrays.asList("User1", "User2"));
    }

    @Test
    public void testGetDirectAncestor() {
        FsObject root = fsObjectService.createFsObject("Home", "");
        FsObject child = fsObjectService.addSubObject(root, "User", "");

        FsObject ancestor = fsObjectService.getDirectAncestor(child.getId());

        assertNotNull(ancestor);
        assertEquals(root.getId(), ancestor.getId());
        assertEquals("Home", ancestor.getName());
    }

    @Test
    public void testGetDirectDescendants() {
        FsObject root = fsObjectService.createFsObject("Home", "");
        fsObjectService.addSubObject(root, "User1", "");
        fsObjectService.addSubObject(root, "User2", "");

        List<FsObject> directDescendants = fsObjectService.getDirectDescendants(root.getId());

        assertEquals(2, directDescendants.size());
        assertThat(directDescendants.stream().map(FsObject::getName))
                .hasSameElementsAs(Arrays.asList("User1", "User2"));
    }
}
