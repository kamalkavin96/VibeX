package com.kamalkavin96.VibeXBackend.repository;

import com.kamalkavin96.VibeXBackend.model.ContributorsRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributorsRoleRepository extends JpaRepository<ContributorsRole, Long> {

    boolean existsByNameIgnoreCase(String name);

}
