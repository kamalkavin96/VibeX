package com.kamalkavin96.VibeXBackend.service;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MinioService {

    private final MinioClient minioClient;

    public String uploadSong(
            String bucket,
            UUID songId,
            MultipartFile file
    ) {

        try {
            // Ensure bucket exists
            ensureBucket(bucket);

            // Extract extension
            String original = file.getOriginalFilename();
            String ext = original != null && original.contains(".")
                    ? original.substring(original.lastIndexOf("."))
                    : "";

            // Object name = UUID.ext
            String objectName = songId + ext;

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(objectName)
                            .contentType(file.getContentType())
                            .stream(
                                    file.getInputStream(),
                                    file.getSize(),
                                    -1
                            )
                            .build()
            );

            return objectName;

        } catch (Exception e) {
            throw new RuntimeException("MinIO upload failed", e);
        }
    }

    private void ensureBucket(String bucket) throws Exception {
        boolean exists = minioClient.bucketExists(
                BucketExistsArgs.builder().bucket(bucket).build()
        );
        if (!exists) {
            minioClient.makeBucket(
                    MakeBucketArgs.builder().bucket(bucket).build()
            );
        }
    }
}
