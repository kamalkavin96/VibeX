package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.AlbumRequest;
import com.kamalkavin96.VibeXBackend.dto.response.AlbumResponse;

import java.util.List;
import java.util.UUID;

public interface AlbumService {

    AlbumResponse createAlbum(AlbumRequest request);

    AlbumResponse updateAlbum(UUID id, AlbumRequest request);

    AlbumResponse getAlbum(UUID id);

    List<AlbumResponse> getAllAlbums();

    void deleteAlbum(UUID id);
}