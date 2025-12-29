package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
}
