package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.LabelRequest;
import com.kamalkavin96.VibeXBackend.model.Label;
import com.kamalkavin96.VibeXBackend.service.LabelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labels")
@RequiredArgsConstructor
public class LabelController {

    private final LabelService service;

    @PostMapping
    public Label create(@RequestBody LabelRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<Label> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Label get(@PathVariable Long id) {
        return service.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
