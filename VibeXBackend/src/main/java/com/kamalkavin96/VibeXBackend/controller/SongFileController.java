package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.SongFileCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongFileResponse;
import com.kamalkavin96.VibeXBackend.service.SongFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/song-files")
@RequiredArgsConstructor
public class SongFileController {

    private final SongFileService service;

    @PostMapping
    public ResponseEntity<SongFileResponse> create(
            @RequestBody SongFileCreateRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @GetMapping("/{songId}")
    public ResponseEntity<SongFileResponse> getBySongId(
            @PathVariable UUID songId
    ) {
        return ResponseEntity.ok(service.getBySongId(songId));
    }

    @DeleteMapping("/{songId}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID songId
    ) {
        service.delete(songId);
        return ResponseEntity.noContent().build();
    }
}
