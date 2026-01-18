package com.kamalkavin96.VibeXBackend.repository;


import com.kamalkavin96.VibeXBackend.model.PlayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayListRepository extends JpaRepository<PlayList, UUID> {
    Optional<PlayList> findByName(String name);
}
