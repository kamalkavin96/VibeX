package com.kamalkavin96.VibeXBackend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class AlbumResponse {

    private UUID id;

    private String title;

    private String description;

    private String albumImageUrl;

    private LocalDate releaseDate;

    private String language;

    private String genre;

    private Instant createdAt;

    private Instant updatedAt;
}