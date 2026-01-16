package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

@Data
public class SongUpdateRequest {

    private String title;
    private String albumName;
    private String singerName;

}
