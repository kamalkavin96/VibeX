package com.kamalkavin96.VibeXBackend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kamalkavin96.VibeXBackend.model.Artist;

public interface ArtistRepository extends JpaRepository<Artist, UUID> {

    Optional<Artist> findByName(String name);

    boolean existsByName(String name);
}