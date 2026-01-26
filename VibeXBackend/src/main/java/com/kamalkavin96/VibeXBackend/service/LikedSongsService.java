package com.kamalkavin96.VibeXBackend.service;

import java.util.List;
import java.util.UUID;

import com.kamalkavin96.VibeXBackend.dto.request.LikedSongRequest;
import com.kamalkavin96.VibeXBackend.dto.response.LikedSongResponse;
import com.kamalkavin96.VibeXBackend.model.LikedSongs;

public interface LikedSongsService {

    LikedSongs likeSong(LikedSongRequest request);
    void unlikeSong(LikedSongRequest request);
    List<LikedSongs> getLikedSongs();
    boolean isSongLiked(LikedSongRequest request);
    long getLikedSongsCount();
}
