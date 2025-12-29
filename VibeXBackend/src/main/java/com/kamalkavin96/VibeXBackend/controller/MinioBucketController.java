package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.service.MinioBucketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/minio")
public class MinioBucketController {

    private final MinioBucketService minioBucketService;

    public MinioBucketController(MinioBucketService minioBucketService) {
        this.minioBucketService = minioBucketService;
    }

    @GetMapping("/buckets")
    public ResponseEntity<List<String>> getBuckets() {

        try {
            return ResponseEntity.ok(minioBucketService.listBuckets());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/buckets/{bucketName}")
    public ResponseEntity<Map<String, String>> createBucket(@PathVariable String bucketName) {

        try {
            minioBucketService.createBucket(bucketName);
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("message", "Bucket: '" + bucketName + "' created");
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/buckets/{bucketName}")
    public ResponseEntity<Map<String, String>> deleteBucket(@PathVariable String bucketName) {
        try {
            minioBucketService.deleteBucket(bucketName);
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("message", "Bucket: " + bucketName + " deleted");
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
