package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
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

            @RequestParam("title") String title,
            @RequestParam("albumName") String albumName,
            @RequestParam("singerName") String singerName,

            @RequestPart("songFile") MultipartFile songFile,
            @RequestPart("thumbnailFile") MultipartFile thumbnailFile
    ) {
        SongCreateRequest request = new SongCreateRequest();
        request.setTitle(title);
        request.setAlbumName(albumName);
        request.setSingerName(singerName);
        return ResponseEntity.ok(songService.createWithFile(request, songFile, thumbnailFile));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SongResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(songService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SongResponse>> getAll() {
        return ResponseEntity.ok(songService.getAll());
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<SongResponse> update(
//            @PathVariable UUID id,
//            @RequestBody SongUpdateRequest request
//    ) {
//        return ResponseEntity.ok(songService.update(id, request));
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        songService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/stream")
    public ResponseEntity<?> streamSong(
            @PathVariable UUID id,
            @RequestHeader(value = HttpHeaders.RANGE, required = false) String range
    ) {
        return songService.streamSong(id, range);
    }


    @GetMapping("/thumbnail/{thumbnailFileKay}")
    public ResponseEntity<InputStreamResource> getThumbnailFile(@PathVariable String thumbnailFileKay) {
        return songService.getThumbnailStream(thumbnailFileKay);
    }
}
