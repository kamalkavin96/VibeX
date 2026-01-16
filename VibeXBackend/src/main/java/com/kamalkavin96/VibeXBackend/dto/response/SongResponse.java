package com.kamalkavin96.VibeXBackend.dto.response;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class SongResponse {

    private UUID id;
    private String title;
    private String albumName;
    private String singerName;
    private String songKey;
    private String thumbnailKey;

    private Instant createdAt;

}
