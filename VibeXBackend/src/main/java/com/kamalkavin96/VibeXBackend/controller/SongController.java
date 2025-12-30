package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.request.SongUpdateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SongResponse> create(
            @RequestParam("bucket") String bucket,

            @RequestParam("title") String title,
            @RequestParam("albumId") Long albumId,
            @RequestParam("labelId") Long labelId,
            @RequestParam("languageId") Long languageId,

            @RequestParam("singerIds") Long[] singerIds,
            @RequestParam("lyricistIds") Long[] lyricistIds,
            @RequestParam("musicianIds") Long[] musicianIds,
            @RequestParam("directorIds") Long[] directorIds,
            @RequestParam("castIds") Long[] castIds,

            @RequestPart("file") MultipartFile file
    ) {
        SongCreateRequest request = new SongCreateRequest();
        request.setTitle(title);
        request.setAlbumId(albumId);
        request.setLabelId(labelId);
        request.setLanguageId(languageId);
        request.setSingerIds(singerIds);
        request.setLyricistIds(lyricistIds);
        request.setMusicianIds(musicianIds);
        request.setDirectorIds(directorIds);
        request.setCastIds(castIds);
        return ResponseEntity.ok(songService.createWithFile(bucket, request, file));
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
