package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.ContributorsRoleRequest;
import com.kamalkavin96.VibeXBackend.model.ContributorsRole;

import java.util.List;

public interface ContributorsRoleService {

    ContributorsRole create(ContributorsRoleRequest request);

    ContributorsRole get(Long id);

    List<ContributorsRole> getAll();

    void delete(Long id);
}
