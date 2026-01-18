package com.kamalkavin96.VibeXBackend.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class PlayListCreateResponse {

    private UUID id;
    private String name;
    private Long userId;
    private String description;
    private String imageKey;
    private Instant createdAt;
    private Instant updatedAt;
    private List<UUID> songsList;

}
