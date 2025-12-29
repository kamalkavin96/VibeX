package com.kamalkavin96.VibeXBackend.dto.response;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class SongFileResponse {

    private UUID songId;
    private String objectKey;
    private Long fileSize;
    private Integer durationSeconds;
    private String codec;
    private Integer bitrateKbps;
    private Integer sampleRateHz;
    private Instant createdAt;
}
