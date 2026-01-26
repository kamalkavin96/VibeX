package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.LikedSongs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LikedSongsRepository extends JpaRepository<LikedSongs, Long> {

    void deleteBySongId(UUID songId);
    boolean existsBySongId(UUID songId);

}
