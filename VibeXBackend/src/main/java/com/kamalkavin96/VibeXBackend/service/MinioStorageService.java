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

    public void deletePlayListImage(String fileKey) {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(properties.getBuckets().get("playlist-images"))
                            .object(fileKey)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete play list image: " + fileKey, e);
        }
    }

    public String uploadFile(MultipartFile file, String bucketKey, String folderName){
        try {
            String extension = getExtension(file.getOriginalFilename());
            String objectKey =  UUID.randomUUID() + extension;
            String folderObjectKey = folderName +"/" + objectKey;

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(properties.getBuckets().get(bucketKey))
                            .object(folderObjectKey)
                            .stream(file.getInputStream(), file.getSize(),-1)
                            .contentType(file.getContentType())
                            .build()
            );
            return objectKey;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public InputStream getFile(String fileKey, String bucketKey, String folderName) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(properties.getBuckets().get(bucketKey))
                            .object(folderName+"/"+fileKey)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch file: " + fileKey, e);
        }
    }

    public void deleteFile(String fileKey, String bucketKey, String folderName) {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(properties.getBuckets().get(bucketKey))
                            .object(folderName+"/"+fileKey)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete song file: " + fileKey, e);
        }
    }

    public InputStream getSongStream(String songKey, long offset, long length) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(properties.getBuckets().get("song-files"))
                            .object("songs/"+songKey)
                            .offset(offset)
                            .length(length)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch song chunk", e);
        }
    }

    public StatObjectResponse getFileStat(String thumbnailKey, String bucketKey, String folderName) {
        try {
            return minioClient.statObject(
                    StatObjectArgs.builder()
                            .bucket(properties.getBuckets().get(bucketKey))
                            .object(folderName+"/" + thumbnailKey)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to stat file", e);
        }
    }

    public void replaceFile(MultipartFile file, String bucketKey, String folderName, String existingKey) {
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(properties.getBuckets().get(bucketKey))
                            .object(folderName + "/" + existingKey)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to replace file: " + existingKey, e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf("."));
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
