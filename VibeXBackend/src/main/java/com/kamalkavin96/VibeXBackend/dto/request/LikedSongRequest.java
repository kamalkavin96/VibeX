package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class LikedSongRequest {
    private UUID songId;
}