package io.flexwork.modules.fss.web.rest;

import io.flexwork.modules.fss.service.IStorageService;
import java.io.ByteArrayOutputStream;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/files")
public class FileDownloadResource {

    private IStorageService storageService;

    public FileDownloadResource(IStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping(value = "/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        storageService.downloadFile("avatar", fileName, byteArrayOutputStream);

        final HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(
                MediaTypeFactory.getMediaType(fileName).orElse(MediaType.APPLICATION_OCTET_STREAM));

        return new ResponseEntity<>(
                byteArrayOutputStream.toByteArray(), httpHeaders, HttpStatus.OK);
    }
}
