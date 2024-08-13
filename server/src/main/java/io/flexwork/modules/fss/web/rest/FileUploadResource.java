package io.flexwork.modules.fss.web.rest;

import io.flexwork.modules.fss.service.FsObjectService;
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

    private FsObjectService fsObjectService;

    public FileUploadResource(FsObjectService fsObjectService) {
        this.fsObjectService = fsObjectService;
    }

    @PostMapping(value = "/singleUpload")
    public ResponseEntity<String> submit(
            @RequestParam("file") MultipartFile file, @RequestParam UploadParams uploadParams) {
        log.debug("Save file {} into the storage", file.getOriginalFilename());

        return ResponseEntity.ok("Upload file successfully");
    }

    public enum UploadType {
        profile
    }

    public static class UploadParams {
        private UploadType type;
        Optional<String> parentPath;
        Optional<String> createdBy;
    }
}
