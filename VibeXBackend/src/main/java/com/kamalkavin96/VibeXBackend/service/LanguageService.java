package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.LanguageRequest;
import com.kamalkavin96.VibeXBackend.model.Language;

import java.util.List;

public interface LanguageService {
    Language create(LanguageRequest req);
    List<Language> getAll();
    Language get(Long id);
    void delete(Long id);
}
