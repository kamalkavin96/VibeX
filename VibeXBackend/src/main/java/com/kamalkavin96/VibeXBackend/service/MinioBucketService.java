package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.exception.MinioException;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.RemoveBucketArgs;
import io.minio.messages.Bucket;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class MinioBucketService {

    private final MinioClient minioClient;

    public MinioBucketService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    /* ===================== LIST BUCKETS ===================== */

    public List<String> listBuckets() {
        try {
            return minioClient.listBuckets()
                    .stream()
                    .map(Bucket::name)
                    .toList();
        } catch (Exception e) {
            log.error("Failed to list buckets", e);
            throw new MinioException("Unable to list buckets", e);
        }
    }

    /* ===================== CREATE BUCKET ===================== */

    public void createBucket(String bucketName) {
        try {
            boolean exists = minioClient.bucketExists(
                    io.minio.BucketExistsArgs.builder()
                            .bucket(bucketName)
                            .build()
            );

            if (exists) {
                throw new MinioException("Bucket already exists: " + bucketName);
            }

            minioClient.makeBucket(
                    MakeBucketArgs.builder()
                            .bucket(bucketName)
                            .build()
            );

            log.info("Bucket created: {}", bucketName);

        } catch (MinioException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error creating bucket {}", bucketName, e);
            throw new MinioException("Failed to create bucket: " + bucketName, e);
        }
    }

    /* ===================== DELETE BUCKET ===================== */

    public void deleteBucket(String bucketName) {
        try {
            boolean exists = minioClient.bucketExists(
                    io.minio.BucketExistsArgs.builder()
                            .bucket(bucketName)
                            .build()
            );

            if (!exists) {
                throw new MinioException("Bucket does not exist: " + bucketName);
            }

            minioClient.removeBucket(
                    RemoveBucketArgs.builder()
                            .bucket(bucketName)
                            .build()
            );

            log.info("Bucket deleted: {}", bucketName);

        } catch (MinioException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error deleting bucket {}", bucketName, e);
            throw new MinioException("Failed to delete bucket: " + bucketName, e);
        }
    }
}
