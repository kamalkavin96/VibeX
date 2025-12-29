package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.request.SongUpdateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.mapper.SongMapper;
import com.kamalkavin96.VibeXBackend.model.Song;
import com.kamalkavin96.VibeXBackend.repository.SongRepository;
import com.kamalkavin96.VibeXBackend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;

    @Override
    public SongResponse create(SongCreateRequest request) {
        Song song = SongMapper.toEntity(request);
        return SongMapper.toResponse(songRepository.save(song));
    }

    @Override
    public SongResponse getById(UUID id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        return SongMapper.toResponse(song);
    }

    @Override
    public List<SongResponse> getAll() {
        return songRepository.findAll()
                .stream()
                .map(SongMapper::toResponse)
                .toList();
    }

    @Override
    public SongResponse update(UUID id, SongUpdateRequest request) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        song.setTitle(request.getTitle());
        song.setAlbumId(request.getAlbumId());
        song.setLabelId(request.getLabelId());
        song.setLanguageId(request.getLanguageId());
        song.setSingerIds(request.getSingerIds());
        song.setLyricistIds(request.getLyricistIds());
        song.setMusicianIds(request.getMusicianIds());
        song.setDirectorIds(request.getDirectorIds());
        song.setCastIds(request.getCastIds());

        return SongMapper.toResponse(songRepository.save(song));
    }

    @Override
    public void delete(UUID id) {
        songRepository.deleteById(id);
    }
}
