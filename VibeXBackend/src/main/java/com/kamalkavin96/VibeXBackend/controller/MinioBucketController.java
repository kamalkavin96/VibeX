package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.response.BucketDetailsDto;
import com.kamalkavin96.VibeXBackend.service.MinioBucketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/minio/buckets")
public class MinioBucketController {

    private final MinioBucketService minioBucketService;

    public MinioBucketController(MinioBucketService minioBucketService) {
        this.minioBucketService = minioBucketService;
    }

    /* ===================== GET ===================== */

    @GetMapping
    public ResponseEntity<List<BucketDetailsDto>> getBuckets() {
        log.info("Fetching all MinIO buckets");
        List<BucketDetailsDto> buckets = minioBucketService.listBuckets();
        log.info("Total buckets fetched: {}", buckets.size());
        return ResponseEntity.ok(buckets);
    }

    /* ===================== CREATE ===================== */

    @PostMapping("/{bucketName}")
    public ResponseEntity<Map<String, String>> createBucket(
            @PathVariable String bucketName
    ) {
        log.info("Creating MinIO bucket | bucketName={}", bucketName);
        minioBucketService.createBucket(bucketName);
        log.info("MinIO bucket created successfully | bucketName={}", bucketName);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "Bucket created: " + bucketName));
    }

    /* ===================== DELETE ===================== */

    @DeleteMapping("/{bucketName}")
    public ResponseEntity<Map<String, String>> deleteBucket(
            @PathVariable String bucketName
    ) {
        log.info("Deleting MinIO bucket | bucketName={}", bucketName);
        minioBucketService.deleteBucket(bucketName);
        log.info("MinIO bucket deleted successfully | bucketName={}", bucketName);

        return ResponseEntity.ok(
                Map.of("message", "Bucket deleted: " + bucketName)
        );
    }
}
