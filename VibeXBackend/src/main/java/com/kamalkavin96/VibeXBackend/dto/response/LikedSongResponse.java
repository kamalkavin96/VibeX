package com.kamalkavin96.VibeXBackend.dto.response;

import lombok.Data;

@Data
public class LikedSongResponse {

    private Long songId;
    private String title;
    private String artist;
    private String coverUrl;
    private boolean liked;

}