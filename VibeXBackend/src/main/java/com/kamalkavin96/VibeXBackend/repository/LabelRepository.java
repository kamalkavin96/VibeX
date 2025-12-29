package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {
}
