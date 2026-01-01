package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.configuration.MinioProperties;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListRequest;
import com.kamalkavin96.VibeXBackend.model.PlayList;
import com.kamalkavin96.VibeXBackend.repository.PlayListRepository;
import com.kamalkavin96.VibeXBackend.service.MinioStorageService;
import com.kamalkavin96.VibeXBackend.service.PlayListService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

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
        PlayListRequest req = new PlayListRequest();
        req.setName(name);
        req.setDescription(description);
        req.setUserId(userId);

        return ResponseEntity.ok(
                playListService.create(req, image)
        );
    }

    @GetMapping
    public ResponseEntity<List<PlayList>> getAll() {
        return ResponseEntity.ok(playListService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayList> get(@PathVariable Long id) {
        return ResponseEntity.ok(playListService.get(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        playListService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /* ✅ RECOMMENDED: Presigned URL */
    @GetMapping("/{id}/image-url")
    public ResponseEntity<String> getPlaylistImageUrl(@PathVariable Long id) {
        PlayList playlist = playListService.get(id);
        if (playlist.getImageKey() == null) {
            return ResponseEntity.notFound().build();
        }
        String url = storageService.getPlaylistImagePresignedUrl(
                playlist.getImageKey()
        );
        return ResponseEntity.ok(url);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<InputStreamResource> getPlaylistImage(@PathVariable Long id) {

        PlayList playlist = playListRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));

        if (playlist.getImageKey() == null) {
            return ResponseEntity.notFound().build();
        }

        InputStream stream = storageService.getObject(
                properties.getBuckets().get("playlist-images"),
                playlist.getImageKey()
        );

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // or detect dynamically
                .body(new InputStreamResource(stream));
    }
}
