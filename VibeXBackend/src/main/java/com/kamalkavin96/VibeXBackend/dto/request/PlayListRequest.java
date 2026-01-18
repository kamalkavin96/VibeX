package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

@Data
public class PlayListRequest {
    private String name;
    private Long userId;
    private String description;

    public PlayListRequest(String name, String description, Long userId) {
        this.name = name;
        this.description = description;
        this.userId = userId;
    }
}
