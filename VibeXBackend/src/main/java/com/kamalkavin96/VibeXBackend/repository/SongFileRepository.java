package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.SongFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SongFileRepository extends JpaRepository<SongFile, UUID> {
}
