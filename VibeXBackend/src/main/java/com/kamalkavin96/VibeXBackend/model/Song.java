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
        name = "songs",
        indexes = {
                @Index(name = "idx_song_title", columnList = "title"),
                @Index(name = "idx_song_album_id", columnList = "album_id"),
                @Index(name = "idx_song_label_id", columnList = "label_id"),
                @Index(name = "idx_song_language_id", columnList = "language_id")
        }
)
public class Song {

    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;
    @Column(nullable = false, length = 200)
    private String title;
    @Column(name = "album_id")
    private Long albumId;
    @Column(name = "label_id")
    private Long labelId;
    @Column(name = "language_id", nullable = false)
    private Long languageId;
    @Column(name = "singer_ids", columnDefinition = "BIGINT[]")
    private Long[] singerIds;
    @Column(name = "lyricist_ids", columnDefinition = "BIGINT[]")
    private Long[] lyricistIds;
    @Column(name = "musician_ids", columnDefinition = "BIGINT[]")
    private Long[] musicianIds;
    @Column(name = "director_ids", columnDefinition = "BIGINT[]")
    private Long[] directorIds;
    @Column(name = "cast_ids", columnDefinition = "BIGINT[]")
    private Long[] castIds;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @PrePersist
    public void prePersist() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }
}
