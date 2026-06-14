package com.kamalkavin96.VibeXBackend.controller;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kamalkavin96.VibeXBackend.dto.request.ArtistRequest;
import com.kamalkavin96.VibeXBackend.dto.response.ArtistResponse;
import com.kamalkavin96.VibeXBackend.model.enums.ArtistGender;
import com.kamalkavin96.VibeXBackend.service.ArtistService;
import com.kamalkavin96.VibeXBackend.service.MinioStorageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/artists")
@RequiredArgsConstructor
public class ArtistController {

    private static final String BUCKET_KEY = "artist-files";
    private static final String FOLDER_NAME = "images";

    private final ArtistService artistService;
    private final MinioStorageService minioStorageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ArtistResponse createArtist(
            @RequestParam String name,
            @RequestParam(required = false) String stageName,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) String dateOfBirth,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String instagramUrl,
            @RequestParam(required = false) String youtubeUrl,
            @RequestParam(required = false) String spotifyUrl,
            @RequestParam(required = false) String facebookUrl,
            @RequestPart(required = false) MultipartFile profileImage) {

        ArtistRequest request = new ArtistRequest();

        request.setName(name);
        request.setStageName(stageName);
        request.setBio(bio);

        if (dateOfBirth != null && !dateOfBirth.isBlank()) {
            request.setDateOfBirth(LocalDate.parse(dateOfBirth));
        }
        if (gender != null && !gender.isBlank()) {
            request.setGender(ArtistGender.valueOf(gender));
        }

        request.setInstagramUrl(instagramUrl);
        request.setYoutubeUrl(youtubeUrl);
        request.setSpotifyUrl(spotifyUrl);
        request.setFacebookUrl(facebookUrl);

        if (profileImage != null && !profileImage.isEmpty()) {
            String imageKey = minioStorageService.uploadFile(
                    profileImage,
                    BUCKET_KEY,
                    FOLDER_NAME);
            request.setProfileImageUrl(imageKey);
        }
        return artistService.createArtist(request);
    }

    @GetMapping("/{id}")
    public ArtistResponse getArtist(@PathVariable UUID id) {
        return artistService.getArtist(id);
    }

    @GetMapping
    public List<ArtistResponse> getAllArtists() {
        return artistService.getAllArtists();
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ArtistResponse updateArtist(
            @RequestParam UUID id,
            @RequestParam String name,
            @RequestParam(required = false) String stageName,
            @RequestParam(required = false) String profileImageUrl,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) String dateOfBirth,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String instagramUrl,
            @RequestParam(required = false) String youtubeUrl,
            @RequestParam(required = false) String spotifyUrl,
            @RequestParam(required = false) String facebookUrl,
            @RequestPart(required = false) MultipartFile profileImage) {

        ArtistResponse existingArtist = artistService.getArtist(id);
        ArtistRequest request = new ArtistRequest();

        request.setName(name);
        request.setStageName(stageName);
        request.setBio(bio);
        request.setProfileImageUrl(profileImageUrl);

        if (dateOfBirth != null && !dateOfBirth.isBlank()) {
            request.setDateOfBirth(LocalDate.parse(dateOfBirth));
        }
        if (gender != null && !gender.isBlank()) {
            request.setGender(ArtistGender.valueOf(gender));
        }

        request.setInstagramUrl(instagramUrl);
        request.setYoutubeUrl(youtubeUrl);
        request.setSpotifyUrl(spotifyUrl);
        request.setFacebookUrl(facebookUrl);

        if (profileImage != null && !profileImage.isEmpty()) {

            String imageKey = minioStorageService.replaceFile(
                    profileImage,
                    BUCKET_KEY,
                    FOLDER_NAME,
                    existingArtist.getProfileImageUrl() == null
                            ? ""
                            : existingArtist.getProfileImageUrl());

            request.setProfileImageUrl(imageKey);

        } else {
            request.setProfileImageUrl(existingArtist.getProfileImageUrl());
        }
        System.out.println("running...2");
        return artistService.updateArtist(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteArtist(@PathVariable UUID id) {

        ArtistResponse artist = artistService.getArtist(id);

        if (artist.getProfileImageUrl() != null
                && !artist.getProfileImageUrl().isBlank()) {

            minioStorageService.deleteFile(
                    artist.getProfileImageUrl(),
                    BUCKET_KEY,
                    FOLDER_NAME);
        }

        artistService.deleteArtist(id);
    }

    @GetMapping("/image/{imageKey}")
    public ResponseEntity<byte[]> getArtistImage(
            @PathVariable String imageKey) {

        try {

            InputStream inputStream = minioStorageService.getFile(
                    imageKey,
                    BUCKET_KEY,
                    FOLDER_NAME);

            byte[] bytes = inputStream.readAllBytes();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CACHE_CONTROL,
                            "max-age=31536000")
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);

        } catch (Exception ex) {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/profileImage/{profileImageName}")
    public ResponseEntity<InputStreamResource> getProfilePic(
            @PathVariable String profileImageName) {

        InputStream inputStream = minioStorageService.getFile(
                profileImageName,
                BUCKET_KEY,
                FOLDER_NAME);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(inputStream));
    }

}