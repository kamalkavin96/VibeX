package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class SongUpdateRequest {

    private UUID id;
    private String title;
    private String albumName;
    private String singerName;

}
