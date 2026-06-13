package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.AlbumRequest;
import com.kamalkavin96.VibeXBackend.dto.response.AlbumResponse;
import com.kamalkavin96.VibeXBackend.model.Album;
import com.kamalkavin96.VibeXBackend.repository.AlbumRepository;
import com.kamalkavin96.VibeXBackend.service.AlbumService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;

    @Override
    public AlbumResponse createAlbum(AlbumRequest request) {

        Album album = Album.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .albumImageUrl(request.getAlbumImageUrl())
                .releaseDate(request.getReleaseDate())
                .language(request.getLanguage())
                .genre(request.getGenre())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        albumRepository.save(album);
        return map(album);
    }

    @Override
    public AlbumResponse updateAlbum(UUID id, AlbumRequest request) {

        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Album not found"));

        album.setTitle(request.getTitle());
        album.setDescription(request.getDescription());
        album.setAlbumImageUrl(request.getAlbumImageUrl());
        album.setReleaseDate(request.getReleaseDate());
        album.setLanguage(request.getLanguage());
        album.setGenre(request.getGenre());
        album.setUpdatedAt(Instant.now());

        albumRepository.save(album);
        return map(album);
    }

    @Override
    public AlbumResponse getAlbum(UUID id) {

        return map(albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Album not found")));
    }

    @Override
    public List<AlbumResponse> getAllAlbums() {

        return albumRepository.findAll().stream().map(this::map).toList();
    }

    @Override
    public void deleteAlbum(UUID id) {

        albumRepository.deleteById(id);
    }

    private AlbumResponse map(Album album) {

        return AlbumResponse.builder()
                .id(album.getId())
                .title(album.getTitle())
                .description(album.getDescription())
                .albumImageUrl(album.getAlbumImageUrl())
                .releaseDate(album.getReleaseDate())
                .language(album.getLanguage())
                .genre(album.getGenre())
                .createdAt(album.getCreatedAt())
                .updatedAt(album.getUpdatedAt())
                .build();
    }
}