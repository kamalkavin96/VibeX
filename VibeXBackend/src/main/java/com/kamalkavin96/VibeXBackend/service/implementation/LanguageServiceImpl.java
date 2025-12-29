package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.LanguageRequest;
import com.kamalkavin96.VibeXBackend.exception.ResourceNotFoundException;
import com.kamalkavin96.VibeXBackend.model.Language;
import com.kamalkavin96.VibeXBackend.repository.LanguageRepository;
import com.kamalkavin96.VibeXBackend.service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
@Service
@RequiredArgsConstructor
public class LanguageServiceImpl implements LanguageService {

    private final LanguageRepository repo;

    public Language create(LanguageRequest req) {
        if (repo.existsByNameIgnoreCase(req.getName()))
            throw new RuntimeException("Language exists");
        return repo.save(new Language(null, req.getName(), Instant.now()));
    }

    public List<Language> getAll() {
        return repo.findAll();
    }

    public Language get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Language not found"));
    }

    public void delete(Long id) {
        repo.delete(get(id));
    }
}
