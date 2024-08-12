package io.flexwork.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileUploadResource {

    private static Logger log = LoggerFactory.getLogger(FileUploadResource.class);

    @RequestMapping(value = "/singleUpload", method = RequestMethod.POST)
    public ResponseEntity<String> submit(@RequestParam("file") MultipartFile file) {
        log.debug("Save file {} into the storage", file.getOriginalFilename());
        return ResponseEntity.ok("Upload file successfully");
    }
}
