package io.flexwork.modules.fss.service;

import io.flexwork.modules.fss.domain.FsObject;
import io.flexwork.modules.fss.domain.FsObjectPath;
import io.flexwork.modules.fss.domain.FsObjectPathId;
import io.flexwork.modules.fss.repository.FsObjectPathRepository;
import io.flexwork.modules.fss.repository.FsObjectRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FsObjectService {
    private final FsObjectRepository fsObjectRepository;

    private final FsObjectPathRepository fsObjectPathRepository;

    public FsObjectService(
            FsObjectRepository fsObjectRepository, FsObjectPathRepository fsObjectPathRepository) {
        this.fsObjectRepository = fsObjectRepository;
        this.fsObjectPathRepository = fsObjectPathRepository;
    }

    @Transactional
    public FsObject createFsObject(String name, String description) {
        FsObject fsObject = new FsObject();
        fsObject.setName(name);
        fsObject.setDescription(description);
        fsObjectRepository.save(fsObject);

        FsObjectPath fsObjectPath = new FsObjectPath();
        FsObjectPathId fsObjectPathId = new FsObjectPathId();
        fsObjectPathId.setAncestorId(fsObject.getId());
        fsObjectPathId.setDescendantId(fsObject.getId());
        fsObjectPath.setId(fsObjectPathId);
        fsObjectPath.setAncestor(fsObject);
        fsObjectPath.setDescendant(fsObject);
        fsObjectPath.setDepth(0);

        fsObjectPathRepository.save(fsObjectPath);
        return fsObject;
    }

    @Transactional
    public FsObject addSubObject(FsObject parent, String name, String description) {
        FsObject child = createFsObject(name, description);
        List<FsObjectPath> paths = fsObjectPathRepository.findByDescendant(parent);

        for (FsObjectPath path : paths) {
            FsObjectPath newPath = new FsObjectPath();
            FsObjectPathId newPathId = new FsObjectPathId();
            newPathId.setAncestorId(path.getAncestor().getId());
            newPathId.setDescendantId(child.getId());
            newPath.setId(newPathId);
            newPath.setAncestor(path.getAncestor());
            newPath.setDescendant(child);
            newPath.setDepth(path.getDepth() + 1);

            fsObjectPathRepository.save(newPath);
        }

        FsObjectPath selfPath = new FsObjectPath();
        FsObjectPathId selfPathId = new FsObjectPathId();
        selfPathId.setAncestorId(child.getId());
        selfPathId.setDescendantId(child.getId());
        selfPath.setId(selfPathId);
        selfPath.setAncestor(child);
        selfPath.setDescendant(child);
        selfPath.setDepth(0);

        return child;
    }

    @Transactional(readOnly = true)
    public FsObject getObjectById(Long id) {
        return fsObjectRepository
                .findById(id)
                .orElseThrow(
                        () -> new IllegalArgumentException("Category not found for id: " + id));
    }

    @Transactional(readOnly = true)
    public List<FsObject> getAllDescendants(Long objectId) {
        FsObject category = getObjectById(objectId);
        List<FsObjectPath> paths = fsObjectPathRepository.findByAncestor(category);

        return paths.stream()
                .filter(path -> path.getDepth() > 0)
                .map(FsObjectPath::getDescendant)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FsObject getDirectAncestor(Long objectId) {
        FsObject object = getObjectById(objectId);
        List<FsObjectPath> paths = fsObjectPathRepository.findByDescendantAndDepth(object, 1);

        return paths.stream()
                .findFirst()
                .map(FsObjectPath::getAncestor)
                .orElseThrow(
                        () ->
                                new IllegalArgumentException(
                                        "Direct ancestor not found for category id: " + objectId));
    }

    @Transactional(readOnly = true)
    public List<FsObject> getDirectDescendants(Long objectId) {
        FsObject object = getObjectById(objectId);
        List<FsObjectPath> paths = fsObjectPathRepository.findByAncestorAndDepth(object, 1);

        return paths.stream().map(FsObjectPath::getDescendant).collect(Collectors.toList());
    }
}
