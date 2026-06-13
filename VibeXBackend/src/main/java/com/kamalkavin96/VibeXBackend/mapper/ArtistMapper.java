package com.kamalkavin96.VibeXBackend.mapper;

import java.time.Instant;

import com.kamalkavin96.VibeXBackend.dto.request.ArtistRequest;
import com.kamalkavin96.VibeXBackend.dto.response.ArtistResponse;
import com.kamalkavin96.VibeXBackend.model.Artist;

public class ArtistMapper {

    private ArtistMapper() {
    }

    public static Artist toEntity(ArtistRequest request) {

        return Artist.builder()
                .name(request.getName())
                .stageName(request.getStageName())
                .profileImageUrl(request.getProfileImageUrl())
                .bio(request.getBio())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .instagramUrl(request.getInstagramUrl())
                .youtubeUrl(request.getYoutubeUrl())
                .spotifyUrl(request.getSpotifyUrl())
                .facebookUrl(request.getFacebookUrl())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    public static ArtistResponse toResponse(Artist artist) {

        return ArtistResponse.builder()
                .id(artist.getId())
                .name(artist.getName())
                .stageName(artist.getStageName())
                .profileImageUrl(artist.getProfileImageUrl())
                .bio(artist.getBio())
                .dateOfBirth(artist.getDateOfBirth())
                .gender(artist.getGender())
                .instagramUrl(artist.getInstagramUrl())
                .youtubeUrl(artist.getYoutubeUrl())
                .spotifyUrl(artist.getSpotifyUrl())
                .facebookUrl(artist.getFacebookUrl())
                .createdAt(artist.getCreatedAt())
                .updatedAt(artist.getUpdatedAt())
                .build();
    }
}