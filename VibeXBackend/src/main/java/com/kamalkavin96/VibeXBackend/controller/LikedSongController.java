package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.LikedSongRequest;
import com.kamalkavin96.VibeXBackend.model.LikedSongs;
import com.kamalkavin96.VibeXBackend.service.LikedSongsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/liked-song")
public class LikedSongController {

    private final LikedSongsService likedSongsService;

    public LikedSongController(LikedSongsService likedSongsService) {
        this.likedSongsService = likedSongsService;
    }

    @PostMapping("/like")
    public ResponseEntity<LikedSongs> likeSong(
            @Valid @RequestBody LikedSongRequest request) {

        LikedSongs likedSong = likedSongsService.likeSong(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(likedSong);
    }

    @DeleteMapping("/unlike")
    public ResponseEntity<Void> unlikeSong(@RequestParam UUID songId) {
        LikedSongRequest request = new LikedSongRequest();
        request.setSongId(songId);
        likedSongsService.unlikeSong(request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<LikedSongs>> getLikedSongs() {
        return ResponseEntity.ok(likedSongsService.getLikedSongs());
    }

    @PostMapping("/is-liked")
    public ResponseEntity<Boolean> isSongLiked(
            @Valid @RequestBody LikedSongRequest request) {

        boolean liked = likedSongsService.isSongLiked(request);
        return ResponseEntity.ok(liked);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getLikedSongsCount() {
        return ResponseEntity.ok(likedSongsService.getLikedSongsCount());
    }
}
