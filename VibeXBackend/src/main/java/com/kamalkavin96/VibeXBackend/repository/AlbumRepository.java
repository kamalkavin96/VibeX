package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AlbumRepository
        extends JpaRepository<Album, UUID> {
}