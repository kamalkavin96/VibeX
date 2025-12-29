package com.kamalkavin96.VibeXBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "languages",
        indexes = {
                @Index(name = "idx_language_name", columnList = "name")
        }
)
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;   // Tamil, Telugu, Hindi, English

    @Column(nullable = false)
    private Instant createdAt;
}
