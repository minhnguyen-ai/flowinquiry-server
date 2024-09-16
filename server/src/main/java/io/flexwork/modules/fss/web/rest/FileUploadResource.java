package io.flexwork.modules.fss.web.rest;

import io.flexwork.modules.fss.service.FsObjectService;
import io.flexwork.modules.fss.service.IStorageService;
import io.flexwork.security.SecurityUtils;
import jakarta.json.Json;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileUploadResource {

    private static Logger log = LoggerFactory.getLogger(FileUploadResource.class);

    private Map<String, String> typeRelativePaths =
            new HashMap<>() {
                {
                    put("avatar", "avatar");
                }
            };

    private FsObjectService fsObjectService;

    private IStorageService storageService;

    public FileUploadResource(FsObjectService fsObjectService, IStorageService storageService) {
        this.fsObjectService = fsObjectService;
        this.storageService = storageService;
    }

    @PostMapping(value = "/singleUpload")
    public ResponseEntity<String> submit(
            @RequestParam("file") MultipartFile file,
            @RequestParam String type,
            @RequestParam Optional<String> parentPath)
            throws Exception {
        String currentUser = SecurityUtils.getCurrentUserLogin().orElse("");
        log.debug(
                "User {} saves file {} into the storage with options {}",
                currentUser,
                file.getOriginalFilename(),
                type);

        if (!typeRelativePaths.containsKey(type))
            return ResponseEntity.badRequest().body("Not support upload with type " + type);
        String prefixPath = typeRelativePaths.get(type);

        storageService.uploadFile(
                prefixPath, file.getOriginalFilename(), file.getInputStream(), file.getSize());
        String pathRes =
                Json.createObjectBuilder()
                        .add("path", prefixPath + "/" + file.getOriginalFilename())
                        .build()
                        .toString();
        return ResponseEntity.ok(pathRes);
    }
}
