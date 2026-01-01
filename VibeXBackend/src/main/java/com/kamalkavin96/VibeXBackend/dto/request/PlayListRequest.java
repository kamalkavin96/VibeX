package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

@Data
public class PlayListRequest {
    private String name;
    private Long userId;
    private String description;
}
