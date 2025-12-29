package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.ContributorRequest;
import com.kamalkavin96.VibeXBackend.model.Contributor;

import java.util.List;

public interface ContributorService {
    Contributor create(ContributorRequest req);
    List<Contributor> getAll();
    Contributor get(Long id);
    void delete(Long id);
}