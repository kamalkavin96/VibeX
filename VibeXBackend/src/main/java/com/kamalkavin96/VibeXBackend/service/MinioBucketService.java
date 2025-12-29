package com.kamalkavin96.VibeXBackend.service;

import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.RemoveBucketArgs;
import io.minio.messages.Bucket;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MinioBucketService {
    private final MinioClient minioClient;

    public MinioBucketService(MinioClient minioClient){
        this.minioClient = minioClient;
    }

    public List<String> listBuckets() throws Exception {
        return minioClient.listBuckets()
                .stream()
                .map(Bucket::name)
                .toList();
    }

    public void createBucket(String bucketName) throws Exception{
        minioClient.makeBucket(
                MakeBucketArgs.builder().bucket(bucketName).build()
        );
    }

    public void deleteBucket(String bucketName) throws Exception{
        minioClient.removeBucket(
                RemoveBucketArgs.builder().bucket(bucketName).build()
        );
    }
}
