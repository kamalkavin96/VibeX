package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayListUpdateRequest {

    private UUID playListId;
    private String name;
    private Long userId;
    private String description;
    private List<UUID> songsIdList;
    private String imageKey;
}
