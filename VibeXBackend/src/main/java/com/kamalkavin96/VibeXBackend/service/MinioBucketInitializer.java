package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.configuration.MinioProperties;
import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MinioBucketInitializer {

    private final MinioClient minioClient;
    private final MinioProperties properties;

    @PostConstruct
    public void initBuckets() {
        properties.getBuckets().values().forEach(bucket -> {
            try {
                boolean exists = minioClient.bucketExists(
                        BucketExistsArgs.builder()
                                .bucket(bucket)
                                .build()
                );

                if (!exists) {
                    minioClient.makeBucket(
                            MakeBucketArgs.builder()
                                    .bucket(bucket)
                                    .build()
                    );
                }

            } catch (Exception e) {
                throw new RuntimeException(
                        "Failed to initialize MinIO bucket: " + bucket, e
                );
            }
        });
    }
}
