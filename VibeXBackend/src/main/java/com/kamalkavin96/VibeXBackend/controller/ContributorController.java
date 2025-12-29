package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.ContributorRequest;
import com.kamalkavin96.VibeXBackend.model.Contributor;
import com.kamalkavin96.VibeXBackend.service.ContributorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributors")
@RequiredArgsConstructor
public class ContributorController {

    private final ContributorService service;

    @PostMapping
    public Contributor create(@RequestBody ContributorRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<Contributor> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Contributor get(@PathVariable Long id) {
        return service.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
