package io.flexwork.modules.fss.service;

import java.io.InputStream;
import java.io.OutputStream;

public interface IStorageService {

    void uploadFile(
            String containerName, String blobName, InputStream inputStream, long contentLength)
            throws Exception;

    void downloadFile(String containerName, String blobName, OutputStream outputStream)
            throws Exception;

    void deleteFile(String containerName, String blobName) throws Exception;
}
