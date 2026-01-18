package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.model.PlayListSongs;
import com.kamalkavin96.VibeXBackend.service.PlayListSongsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/playlists/{playlistId}/songs")
@RequiredArgsConstructor
public class PlayListSongsController {

    private final PlayListSongsService playListSongsService;

    /* ---------------- ADD SONG TO PLAYLIST ---------------- */
    @PostMapping("/{songId}")
    public ResponseEntity<PlayListSongs> addSong(
            @PathVariable UUID playlistId,
            @PathVariable UUID songId
    ) {
        return ResponseEntity.ok(
                playListSongsService.addSongToPlaylist(playlistId, songId)
        );
    }

    /* ---------------- REMOVE SONG FROM PLAYLIST ---------------- */
    @DeleteMapping("/{songId}")
    public ResponseEntity<Map<String, String>> removeSong(
            @PathVariable UUID playlistId,
            @PathVariable UUID songId
    ) {
        playListSongsService.removeSongFromPlaylist(playlistId, songId);
        return ResponseEntity.ok(Map.of("message","song removed successfully"));
    }

    /* ---------------- GET ALL SONGS IN PLAYLIST ---------------- */
    @GetMapping
    public ResponseEntity<List<PlayListSongs>> getSongs(
            @PathVariable UUID playlistId
    ) {
        return ResponseEntity.ok(
                playListSongsService.getSongsByPlaylist(playlistId)
        );
    }

    /* ---------------- BULK ADD SONGS ---------------- */
    @PostMapping("/bulk")
    public ResponseEntity<List<PlayListSongs>> bulkAddSongs(
            @PathVariable UUID playlistId,
            @RequestBody List<UUID> songIds
    ) {
        return ResponseEntity.ok(
                playListSongsService.addSongsToPlaylistBulk(
                        playlistId,
                        songIds
                )
        );
    }
}
