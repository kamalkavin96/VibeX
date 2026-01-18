package com.kamalkavin96.VibeXBackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "playlist_songs",
        indexes = {
                @Index(name = "idx_playlist_song_playlist", columnList = "playlist_id"),
                @Index(name = "idx_playlist_song_song", columnList = "song_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_playlist_song",
                        columnNames = {"playlist_id", "song_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayListSongs {

    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(name = "playlist_id", nullable = false)
    private UUID playlistId;

    @Column(name = "song_id", nullable = false)
    private UUID songId;

    @Column(name = "added_on", nullable = false, updatable = false)
    private Instant addedOn;

    @PrePersist
    public void onAdd() {
        if (this.id == null) {
            this.id = UUID.randomUUID();
        }
        this.addedOn = Instant.now();
    }
}
