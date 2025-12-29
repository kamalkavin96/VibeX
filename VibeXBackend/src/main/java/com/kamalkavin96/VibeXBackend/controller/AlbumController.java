package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.AlbumRequest;
import com.kamalkavin96.VibeXBackend.model.Album;
import com.kamalkavin96.VibeXBackend.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService service;

    @PostMapping
    public Album create(@RequestBody AlbumRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<Album> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Album get(@PathVariable Long id) {
        return service.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
