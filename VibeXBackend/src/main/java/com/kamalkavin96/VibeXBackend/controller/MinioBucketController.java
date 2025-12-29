package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.service.MinioBucketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/minio/buckets")
public class MinioBucketController {

    private final MinioBucketService minioBucketService;

    public MinioBucketController(MinioBucketService minioBucketService) {
        this.minioBucketService = minioBucketService;
    }

    /* ===================== GET ===================== */

    @GetMapping
    public ResponseEntity<List<String>> getBuckets() {
        return ResponseEntity.ok(minioBucketService.listBuckets());
    }

    /* ===================== CREATE ===================== */

    @PostMapping("/{bucketName}")
    public ResponseEntity<Map<String, String>> createBucket(
            @PathVariable String bucketName
    ) {
        minioBucketService.createBucket(bucketName);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "Bucket created: " + bucketName));
    }

    /* ===================== DELETE ===================== */

    @DeleteMapping("/{bucketName}")
    public ResponseEntity<Map<String, String>> deleteBucket(
            @PathVariable String bucketName
    ) {
        minioBucketService.deleteBucket(bucketName);
        return ResponseEntity.ok(
                Map.of("message", "Bucket deleted: " + bucketName)
        );
    }
}
