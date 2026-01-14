package com.kamalkavin96.VibeXBackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BucketDetailsDto {
    private String name;
    private ZonedDateTime creationDate;
    private long objectCount;
    private long totalSizeBytes;
    private String totalSizeReadable;
}
