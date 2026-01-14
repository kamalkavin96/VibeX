package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.configuration.MinioProperties;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListRequest;
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

@Slf4j
@RestController
@RequestMapping("/api/playlists")
@RequiredArgsConstructor
public class PlayListController {

    private final PlayListService playListService;
    private final MinioStorageService storageService;
    private final PlayListRepository playListRepository;
    private final MinioProperties properties;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlayList> create(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        log.info("Creating playlist | name={}, userId={}, imagePresent={}",
                name, userId, image != null);

        PlayListRequest req = new PlayListRequest();
        req.setName(name);
        req.setDescription(description);
        req.setUserId(userId);

        PlayList playlist = playListService.create(req, image);

        log.info("Playlist created successfully | playlistId={}", playlist.getId());
        return ResponseEntity.ok(playlist);
    }

    @GetMapping
    public ResponseEntity<List<PlayList>> getAll() {
        log.info("Fetching all playlists");
        List<PlayList> playlists = playListService.getAll();
        log.info("Total playlists fetched: {}", playlists.size());
        return ResponseEntity.ok(playlists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayList> get(@PathVariable Long id) {
        log.info("Fetching playlist | id={}", id);
        PlayList playlist = playListService.get(id);
        log.info("Playlist fetched successfully | id={}", id);
        return ResponseEntity.ok(playlist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Deleting playlist | id={}", id);
        playListService.delete(id);
        log.info("Playlist deleted successfully | id={}", id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/image/{imageKey}")
    public ResponseEntity<InputStreamResource> getPlaylistImage(@PathVariable String imageKey) {

        log.info("Fetching playlist image | imageKey={}", imageKey);

        InputStream stream = storageService.getObject(
                properties.getBuckets().get("playlist-images"),
                imageKey
        );

        log.info("Playlist image stream retrieved | imageKey={}", imageKey);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(stream));
    }
}
