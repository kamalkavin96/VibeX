package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.Song;
import com.kamalkavin96.VibeXBackend.model.SongArtist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SongArtistRepository  extends JpaRepository<SongArtist, UUID> {

    List<SongArtist> findBySong(Song song);

    void deleteBySong(Song song);
}