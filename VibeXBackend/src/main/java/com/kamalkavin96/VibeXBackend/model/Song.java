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
                @Index(name = "idx_song_title", columnList = "title")
        }
)
public class Song {

    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;
    @Column(nullable = false, length = 200)
    private String title;
    @Column(name = "album_name")
    private String albumName;
    @Column(name = "singer_name")
    private String singerName;
    @Column(name = "song_obj_key", length = 200)
    private String songKey;
    @Column(name = "thumbnail_key", length = 200)
    private String thumbnailKey;
    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    @PrePersist
    public void prePersist() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }
}
