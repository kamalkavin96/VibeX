package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

@Data
public class SongUpdateRequest {

    private String title;
    private Long albumId;
    private Long labelId;
    private Long languageId;

    private Long[] singerIds;
    private Long[] lyricistIds;
    private Long[] musicianIds;
    private Long[] directorIds;
    private Long[] castIds;

}
