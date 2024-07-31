package io.flexwork.modules.fss.repository;

import io.flexwork.modules.fss.domain.FsObject;
import io.flexwork.modules.fss.domain.FsObjectPath;
import io.flexwork.modules.fss.domain.FsObjectPathId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FsObjectPathRepository extends JpaRepository<FsObjectPath, FsObjectPathId> {

    List<FsObjectPath> findByDescendant(FsObject descendant);

    List<FsObjectPath> findByAncestor(FsObject ancestor);

    List<FsObjectPath> findByDescendantAndDepth(FsObject descendant, int depth);

    List<FsObjectPath> findByAncestorAndDepth(FsObject ancestor, int depth);
}
