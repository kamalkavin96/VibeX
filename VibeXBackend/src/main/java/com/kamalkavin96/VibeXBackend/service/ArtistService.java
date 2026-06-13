package com.kamalkavin96.VibeXBackend.service;

import java.util.List;
import java.util.UUID;

import com.kamalkavin96.VibeXBackend.dto.request.ArtistRequest;
import com.kamalkavin96.VibeXBackend.dto.response.ArtistResponse;

public interface ArtistService {

    ArtistResponse createArtist(ArtistRequest request);

    ArtistResponse getArtist(UUID id);

    List<ArtistResponse> getAllArtists();

    ArtistResponse updateArtist(UUID id, ArtistRequest request);

    void deleteArtist(UUID id);
}