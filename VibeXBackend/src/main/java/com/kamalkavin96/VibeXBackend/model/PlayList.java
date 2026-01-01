package com.kamalkavin96.VibeXBackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(
        name = "playlist",
        indexes = {
                @Index(name = "idx_playlist_user", columnList = "userId")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = false)
    private Long userId;

    @Column()
    private String description;

    @Column(name = "image_key", length = 200)
    private String imageKey;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = Instant.now();
    }
}
