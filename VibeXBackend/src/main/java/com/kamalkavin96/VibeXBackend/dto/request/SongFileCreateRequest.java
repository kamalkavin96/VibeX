package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class SongFileCreateRequest {

    private UUID songId;
    private String objectKey;
    private Long fileSize;
    private Integer durationSeconds;
    private String codec;
    private Integer bitrateKbps;
    private Integer sampleRateHz;
}