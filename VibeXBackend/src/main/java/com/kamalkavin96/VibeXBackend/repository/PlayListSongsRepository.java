package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.PlayListSongs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayListSongsRepository extends JpaRepository<PlayListSongs, UUID> {

    boolean existsByPlaylistIdAndSongId(UUID playlistId, UUID songId);
    Optional<PlayListSongs> findByPlaylistIdAndSongId(UUID playlistId, UUID songId);
    List<PlayListSongs> findByPlaylistIdOrderByAddedOnDesc(UUID playlistId);
    @Query("""
        select ps.songId
        from PlayListSongs ps
        where ps.playlistId = :playlistId
    """)
    List<UUID> findSongIdsByPlaylistId(UUID playlistId);

    List<PlayListSongs> findByPlaylistIdAndSongIdIn(
            UUID playlistId,
            List<UUID> songIds
    );
}
