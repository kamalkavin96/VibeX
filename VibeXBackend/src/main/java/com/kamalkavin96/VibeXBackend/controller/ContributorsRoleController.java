package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.ContributorsRoleRequest;
import com.kamalkavin96.VibeXBackend.model.ContributorsRole;
import com.kamalkavin96.VibeXBackend.service.ContributorsRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributor-roles")
@RequiredArgsConstructor
public class ContributorsRoleController {

    private final ContributorsRoleService service;

    @PostMapping
    public ResponseEntity<ContributorsRole> create(
            @RequestBody ContributorsRoleRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<ContributorsRole>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContributorsRole> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
