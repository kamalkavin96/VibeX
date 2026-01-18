package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.configuration.MinioProperties;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListRequest;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListUpdateRequest;
import com.kamalkavin96.VibeXBackend.model.PlayList;
import com.kamalkavin96.VibeXBackend.repository.PlayListRepository;
import com.kamalkavin96.VibeXBackend.service.MinioStorageService;
import com.kamalkavin96.VibeXBackend.service.PlayListService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/playlists")
@RequiredArgsConstructor
public class PlayListController {

    private final PlayListService playListService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlayList> create(
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam Long userId,
            @RequestParam(required = false) List<UUID> selectedSongs,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        log.info("Creating playlist | name={}, userId={}, imagePresent={}",
                name, userId, image != null);
        PlayListRequest req = new PlayListRequest(name, description, userId);
        return ResponseEntity.ok(playListService.create(req, image, selectedSongs));
    }

    @PutMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<PlayListUpdateRequest> updatePlaylist(
            @RequestParam UUID id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) List<UUID> selectedSongs,
            @RequestParam(required = false) String imageKey,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {

        PlayListUpdateRequest request = new PlayListUpdateRequest(
                id,
                name,
                userId,
                description,
                selectedSongs,
                imageKey
        );

        PlayList updated = playListService.update(request, image);
        return ResponseEntity.ok(request);
    }


    @GetMapping
    public ResponseEntity<List<PlayList>> getAll() {
        return ResponseEntity.ok(playListService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayList> get(@PathVariable UUID id) {
        return ResponseEntity.ok(playListService.get(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        playListService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/image/{imageKey}")
    public ResponseEntity<InputStreamResource> getPlaylistImage(
            @PathVariable String imageKey
    ) {
        return playListService.getImage(imageKey);
    }
}
