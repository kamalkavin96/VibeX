package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.response.BucketDetailsDto;
import com.kamalkavin96.VibeXBackend.exception.MinioException;
import io.minio.*;
import io.minio.messages.Bucket;
import io.minio.messages.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class MinioBucketService {

    private final MinioClient minioClient;

    public MinioBucketService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    /* ===================== LIST BUCKETS ===================== */

    private String humanReadableSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        int exp = (int) (Math.log(bytes) / Math.log(1024));
        String pre = "KMGTPE".charAt(exp - 1) + "";
        return String.format("%.2f %sB", bytes / Math.pow(1024, exp), pre);
    }


    public List<BucketDetailsDto> listBuckets() {
        try {
            List<BucketDetailsDto> response = new ArrayList<>();

            for (Bucket bucket : minioClient.listBuckets()) {

                long totalSize = 0;
                long objectCount = 0;

                Iterable<Result<Item>> objects = minioClient.listObjects(
                        ListObjectsArgs.builder()
                                .bucket(bucket.name())
                                .recursive(true)
                                .build()
                );

                for (Result<Item> result : objects) {
                    Item item = result.get();
                    objectCount++;
                    totalSize += item.size();
                }

                response.add(
                        BucketDetailsDto.builder()
                                .name(bucket.name())
                                .creationDate(bucket.creationDate())
                                .objectCount(objectCount)
                                .totalSizeBytes(totalSize)
                                .totalSizeReadable(humanReadableSize(totalSize))
                                .build()
                );
            }

            return response;

        } catch (Exception e) {
            log.error("Failed to list buckets with details", e);
            throw new MinioException("Unable to list bucket details", e);
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
