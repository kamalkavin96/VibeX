package com.kamalkavin96.VibeXBackend.dto.response;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class SongResponse {

    private UUID id;
    private String title;
    private Long albumId;
    private Long labelId;
    private Long languageId;

    private Long[] singerIds;
    private Long[] lyricistIds;
    private Long[] musicianIds;
    private Long[] directorIds;
    private Long[] castIds;

    private Instant createdAt;

}
