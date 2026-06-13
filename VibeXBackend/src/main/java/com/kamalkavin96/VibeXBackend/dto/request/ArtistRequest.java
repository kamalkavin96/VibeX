package com.kamalkavin96.VibeXBackend.dto.request;

import java.time.LocalDate;

import lombok.Data;

import com.kamalkavin96.VibeXBackend.model.enums.ArtistGender;


@Data
public class ArtistRequest {

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
}