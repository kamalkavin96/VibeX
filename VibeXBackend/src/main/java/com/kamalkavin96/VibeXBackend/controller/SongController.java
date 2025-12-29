package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.request.SongUpdateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @PostMapping
    public ResponseEntity<SongResponse> create(@RequestBody SongCreateRequest request) {
        return ResponseEntity.ok(songService.create(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SongResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(songService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SongResponse>> getAll() {
        return ResponseEntity.ok(songService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SongResponse> update(
            @PathVariable UUID id,
            @RequestBody SongUpdateRequest request
    ) {
        return ResponseEntity.ok(songService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        songService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
