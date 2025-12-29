package com.kamalkavin96.VibeXBackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "song_files",
        indexes = {
                @Index(name = "idx_song_files_song_id", columnList = "song_id"),
                @Index(name = "idx_song_files_codec", columnList = "codec")
        }
)
public class SongFile {

    @Id
    @Column(nullable = false, updatable = false)
    private UUID songId;
    @Column(nullable = false, length = 500)
    private String objectKey;
    @Column(name = "file_size", nullable = false)
    private Long fileSize;
    @Column(name = "duration_seconds")
    private Integer durationSeconds;
    @Column(length = 50)
    private String codec;
    @Column(name = "bitrate_kbps")
    private Integer bitrateKbps;
    @Column(name = "sample_rate_hz")
    private Integer sampleRateHz;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
