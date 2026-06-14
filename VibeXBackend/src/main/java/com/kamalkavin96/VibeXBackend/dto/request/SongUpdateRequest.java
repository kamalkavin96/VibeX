package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class SongUpdateRequest {

    private UUID id;

    private String title;

    private UUID albumId;

    private List<UUID> artistIds;
}