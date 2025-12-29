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
        name = "countries",
        indexes = {
                @Index(name = "idx_country_name", columnList = "name"),
                @Index(name = "idx_country_code", columnList = "isoCode")
        }
)
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** India, USA, UK */
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    /** ISO code like IN, US, UK */
    @Column(nullable = false, unique = true, length = 10)
    private String isoCode;

    @Column(nullable = false)
    private Instant createdAt;
}
