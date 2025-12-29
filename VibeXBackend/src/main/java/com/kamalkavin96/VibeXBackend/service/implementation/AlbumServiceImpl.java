package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.AlbumRequest;
import com.kamalkavin96.VibeXBackend.exception.ResourceNotFoundException;
import com.kamalkavin96.VibeXBackend.model.Album;
import com.kamalkavin96.VibeXBackend.repository.AlbumRepository;
import com.kamalkavin96.VibeXBackend.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository repo;

    public Album create(AlbumRequest req) {
        return repo.save(
                new Album(null, req.getName(), req.getReleaseDate(), Instant.now())
        );
    }

    public List<Album> getAll() {
        return repo.findAll();
    }

    public Album get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album not found"));
    }

    public void delete(Long id) {
        repo.delete(get(id));
    }
}
