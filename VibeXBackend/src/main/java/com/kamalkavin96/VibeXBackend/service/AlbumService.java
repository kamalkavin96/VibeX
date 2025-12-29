package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.AlbumRequest;
import com.kamalkavin96.VibeXBackend.model.Album;

import java.util.List;

public interface AlbumService {
    Album create(AlbumRequest req);
    List<Album> getAll();
    Album get(Long id);
    void delete(Long id);
}
