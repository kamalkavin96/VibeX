package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.LikedSongRequest;
import com.kamalkavin96.VibeXBackend.dto.response.LikedSongResponse;
import com.kamalkavin96.VibeXBackend.model.LikedSongs;
import com.kamalkavin96.VibeXBackend.repository.LikedSongsRepository;
import com.kamalkavin96.VibeXBackend.service.LikedSongsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LikedSongsServiceImpl implements LikedSongsService {

    private final LikedSongsRepository likedSongsRepository;

    public LikedSongsServiceImpl( LikedSongsRepository likedSongsRepository) {
        this.likedSongsRepository = likedSongsRepository;
    }

    @Override
    public LikedSongs likeSong(LikedSongRequest request) {
        LikedSongs likedSongs = LikedSongs.builder()
                .songId(request.getSongId())
                .build();
        return likedSongsRepository.save(likedSongs);
    }

    @Override
    @Transactional
    public void unlikeSong(LikedSongRequest request) {
        likedSongsRepository.deleteBySongId(request.getSongId());
    }

    @Override
    public List<LikedSongs> getLikedSongs() {
        return likedSongsRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isSongLiked(LikedSongRequest request) {

        if (request.getSongId() == null) {
            throw new IllegalArgumentException("songId is required");
        }

        return likedSongsRepository.existsBySongId(request.getSongId());
    }

    @Override
    @Transactional(readOnly = true)
    public long getLikedSongsCount() {
        return likedSongsRepository.count();
    }

}
