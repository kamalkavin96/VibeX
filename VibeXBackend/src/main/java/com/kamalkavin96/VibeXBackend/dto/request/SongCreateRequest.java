package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

@Data
public class SongCreateRequest {

    private String title;
    private String albumName;
    private String singerName;

}
