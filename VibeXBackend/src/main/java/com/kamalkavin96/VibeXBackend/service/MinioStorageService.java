package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.configuration.MinioProperties;
import io.minio.*;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MinioStorageService {

    private final MinioClient minioClient;
    private final MinioProperties properties;

    public String uploadPlaylistImage(MultipartFile file) {
        try {
            String extension = getExtension(file.getOriginalFilename());
            String objectKey =  UUID.randomUUID() + extension;

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(properties.getBuckets().get("playlist-images"))
                            .object(objectKey)
                            .stream(
                                    file.getInputStream(),
                                    file.getSize(),
                                    -1
                            )
                            .contentType(file.getContentType())
                            .build()
            );

            return objectKey; // store in DB

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload playlist image", e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf("."));
    }

    public InputStream getPlaylistImageStream(String imageKey) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(properties.getBuckets().get("playlist-images"))
                            .object(imageKey)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch playlist image", e);
        }
    }

    public String getPlaylistImagePresignedUrl(String imageKey) {
        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket(properties.getBuckets().get("playlist-images"))
                            .object(imageKey)
                            .expiry(60 * 60) // 1 hour
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate image URL", e);
        }
    }

    public InputStream getObject(String bucket, String objectKey) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucket)
                            .object(objectKey)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch image from MinIO", e);
        }
    }
}
