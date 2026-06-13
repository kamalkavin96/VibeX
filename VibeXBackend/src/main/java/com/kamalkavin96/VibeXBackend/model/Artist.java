package com.kamalkavin96.VibeXBackend.model;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import com.kamalkavin96.VibeXBackend.model.enums.ArtistGender;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "artists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true, length = 200)
    private String stageName;

    private String profileImageUrl;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private LocalDate dateOfBirth;
    @Enumerated(EnumType.STRING)
    private ArtistGender gender;

    private String instagramUrl;
    private String youtubeUrl;
    private String spotifyUrl;
    private String facebookUrl;

    private Instant createdAt;
    private Instant updatedAt;
}
