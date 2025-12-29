package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.LanguageRequest;
import com.kamalkavin96.VibeXBackend.model.Language;
import com.kamalkavin96.VibeXBackend.service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@RequiredArgsConstructor
public class LanguageController {

    private final LanguageService service;

    @PostMapping
    public Language create(@RequestBody LanguageRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<Language> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Language get(@PathVariable Long id) {
        return service.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
