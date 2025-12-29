package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.SongFileCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongFileResponse;
import com.kamalkavin96.VibeXBackend.exception.ResourceNotFoundException;
import com.kamalkavin96.VibeXBackend.model.SongFile;
import com.kamalkavin96.VibeXBackend.repository.SongFileRepository;
import com.kamalkavin96.VibeXBackend.service.SongFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SongFileServiceImpl implements SongFileService {

    private final SongFileRepository repository;

    @Override
    public SongFileResponse create(SongFileCreateRequest request) {

        if (repository.existsBySongId(request.getSongId())) {
            throw new RuntimeException(
                    "Song file already exists for songId: " + request.getSongId()
            );
        }

        SongFile songFile = new SongFile();
        songFile.setSongId(request.getSongId());
        songFile.setObjectKey(request.getObjectKey());
        songFile.setFileSize(request.getFileSize());
        songFile.setDurationSeconds(request.getDurationSeconds());
        songFile.setCodec(request.getCodec());
        songFile.setBitrateKbps(request.getBitrateKbps());
        songFile.setSampleRateHz(request.getSampleRateHz());
        songFile.setCreatedAt(Instant.now());

        return toResponse(repository.save(songFile));
    }

    @Override
    public SongFileResponse getBySongId(UUID songId) {
        SongFile songFile = repository.findBySongId(songId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Song file not found for songId: " + songId
                        )
                );

        return toResponse(songFile);
    }

    @Override
    public void delete(UUID songId) {
        SongFile songFile = repository.findBySongId(songId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Song file not found for songId: " + songId
                        )
                );
        repository.delete(songFile);
    }

    private SongFileResponse toResponse(SongFile entity) {
        SongFileResponse res = new SongFileResponse();
        res.setSongId(entity.getSongId());
        res.setObjectKey(entity.getObjectKey());
        res.setFileSize(entity.getFileSize());
        res.setDurationSeconds(entity.getDurationSeconds());
        res.setCodec(entity.getCodec());
        res.setBitrateKbps(entity.getBitrateKbps());
        res.setSampleRateHz(entity.getSampleRateHz());
        res.setCreatedAt(entity.getCreatedAt());
        return res;
    }
}
