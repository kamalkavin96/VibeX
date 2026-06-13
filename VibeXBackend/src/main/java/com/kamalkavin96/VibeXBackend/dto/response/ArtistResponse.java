package com.kamalkavin96.VibeXBackend.dto.response;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import com.kamalkavin96.VibeXBackend.model.enums.ArtistGender;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArtistResponse {

    private UUID id;

    private String name;

    private String stageName;

    private String profileImageUrl;

    private String bio;

    private LocalDate dateOfBirth;

    private ArtistGender gender;

    private String instagramUrl;

    private String youtubeUrl;

    private String spotifyUrl;

    private String facebookUrl;

    private Instant createdAt;

    private Instant updatedAt;
}