package com.kamalkavin96.VibeXBackend.service.implementation;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.kamalkavin96.VibeXBackend.dto.request.ArtistRequest;
import com.kamalkavin96.VibeXBackend.dto.response.ArtistResponse;
import com.kamalkavin96.VibeXBackend.mapper.ArtistMapper;
import com.kamalkavin96.VibeXBackend.model.Artist;
import com.kamalkavin96.VibeXBackend.repository.ArtistRepository;
import com.kamalkavin96.VibeXBackend.service.ArtistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtistServiceImpl implements ArtistService {

    private final ArtistRepository artistRepository;

    @Override
    public ArtistResponse createArtist(ArtistRequest request) {

        Artist artist = ArtistMapper.toEntity(request);
        return ArtistMapper.toResponse(artistRepository.save(artist));
    }

    @Override
    public ArtistResponse getArtist(UUID id) {

        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artist not found"));
        return ArtistMapper.toResponse(artist);
    }

    @Override
    public List<ArtistResponse> getAllArtists() {

        return artistRepository.findAll()
                .stream()
                .map(ArtistMapper::toResponse)
                .toList();
    }

    @Override
    public ArtistResponse updateArtist(UUID id, ArtistRequest request) {

        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        artist.setName(request.getName());
        artist.setStageName(request.getStageName());
        artist.setProfileImageUrl(request.getProfileImageUrl());
        artist.setBio(request.getBio());
        artist.setDateOfBirth(request.getDateOfBirth());
        artist.setGender(request.getGender());
        artist.setInstagramUrl(request.getInstagramUrl());
        artist.setYoutubeUrl(request.getYoutubeUrl());
        artist.setSpotifyUrl(request.getSpotifyUrl());
        artist.setFacebookUrl(request.getFacebookUrl());

        artist.setUpdatedAt(Instant.now());

        return ArtistMapper.toResponse(artistRepository.save(artist));
    }

    @Override
    public void deleteArtist(UUID id) {

        artistRepository.deleteById(id);
    }
}