package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.AlbumRequest;
import com.kamalkavin96.VibeXBackend.dto.response.AlbumResponse;
import com.kamalkavin96.VibeXBackend.service.AlbumService;
import com.kamalkavin96.VibeXBackend.service.MinioStorageService;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {

    private static final String BUCKET = "album-images";
    private static final String FOLDER = "albums";

    private final AlbumService albumService;
    private final MinioStorageService minioStorageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AlbumResponse createAlbum(

            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String releaseDate,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String genre,
            @RequestPart(required = false) MultipartFile albumImage) {

        AlbumRequest request = new AlbumRequest();

        request.setTitle(title);
        request.setDescription(description);

        if (releaseDate != null && !releaseDate.isBlank()) {
            request.setReleaseDate(LocalDate.parse(releaseDate));
        }

        request.setLanguage(language);
        request.setGenre(genre);

        if (albumImage != null && !albumImage.isEmpty()) {

            String imageKey = minioStorageService.uploadFile(
                    albumImage,
                    BUCKET,
                    FOLDER);

            request.setAlbumImageUrl(imageKey);
        }

        return albumService.createAlbum(request);
    }

    @GetMapping
    public List<AlbumResponse> getAll() {
        return albumService.getAllAlbums();
    }

    @GetMapping("/{id}")
    public AlbumResponse get(@PathVariable UUID id) {

        return albumService.getAlbum(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {

        AlbumResponse album = albumService.getAlbum(id);
        if (album.getAlbumImageUrl() != null) {
            minioStorageService.deleteFile(
                    album.getAlbumImageUrl(),
                    BUCKET, FOLDER);
        }

        albumService.deleteAlbum(id);
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AlbumResponse updateAlbum(

            @RequestParam UUID id,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String releaseDate,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String genre,
            @RequestPart(required = false) MultipartFile albumImage) {

        AlbumResponse existingAlbum = albumService.getAlbum(id);
        AlbumRequest request = new AlbumRequest();

        request.setTitle(title);
        request.setDescription(description);

        if (releaseDate != null && !releaseDate.isBlank()) {
            request.setReleaseDate(LocalDate.parse(releaseDate));
        }

        request.setLanguage(language);
        request.setGenre(genre);

        if (albumImage != null && !albumImage.isEmpty()) {

            String imageKey = minioStorageService.replaceFile(
                    albumImage,
                    BUCKET,
                    FOLDER,
                    existingAlbum.getAlbumImageUrl() == null
                            ? ""
                            : existingAlbum.getAlbumImageUrl());

            request.setAlbumImageUrl(imageKey);
        } else {
            request.setAlbumImageUrl(existingAlbum.getAlbumImageUrl());
        }

        return albumService.updateAlbum(id, request);
    }

    @GetMapping("/image/{imageName}")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable String imageName) {

        InputStream stream = minioStorageService.getFile(imageName, BUCKET, FOLDER);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(stream));
    }
}