package com.kamalkavin96.VibeXBackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class SongResponse {

    private UUID id;

    private String title;

    private UUID albumId;

    private String albumTitle;

    private List<ArtistResponse> artists;

    private String songKey;

    private String thumbnailKey;

    private Instant createdAt;

    private Instant updatedAt;
}