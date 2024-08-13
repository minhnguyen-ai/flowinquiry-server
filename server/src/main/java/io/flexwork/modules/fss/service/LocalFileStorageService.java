package io.flexwork.modules.fss.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class LocalFileStorageService implements IStorageService {

    private String rootDirectory;

    public LocalFileStorageService(
            @Value("{application.file.rootDirectory:/}") String rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    @Override
    public void uploadFile(
            String containerName, String blobName, InputStream inputStream, long contentLength)
            throws Exception {
        File directory = new File(rootDirectory, containerName);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        File destinationFile = new File(directory, blobName);
        try (OutputStream outputStream = new FileOutputStream(destinationFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }
    }

    @Override
    public void downloadFile(String containerName, String blobName, OutputStream outputStream)
            throws Exception {
        File sourceFile = new File(rootDirectory + File.separator + containerName, blobName);
        if (sourceFile.exists()) {
            try (InputStream inputStream = new FileInputStream(sourceFile)) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
            }
        }
    }

    @Override
    public void deleteFile(String containerName, String blobName) throws Exception {
        Files.deleteIfExists(Paths.get(rootDirectory, containerName, blobName));
    }
}
