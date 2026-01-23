package com.kamalkavin96.VibeXBackend.model;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "liked_songs")
public class LikedSongs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID songId;

    @PrePersist
    public void onCreate() {
        Instant createdAt = Instant.now();
    }
}
