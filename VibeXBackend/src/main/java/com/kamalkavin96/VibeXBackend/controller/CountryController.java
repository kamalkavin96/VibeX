package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.CountryRequest;
import com.kamalkavin96.VibeXBackend.model.Country;
import com.kamalkavin96.VibeXBackend.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService service;

    @PostMapping
    public Country create(@RequestBody CountryRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<Country> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Country get(@PathVariable Long id) {
        return service.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

