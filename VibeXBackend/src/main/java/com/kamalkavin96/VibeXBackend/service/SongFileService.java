package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.SongFileCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongFileResponse;

import java.util.UUID;

public interface SongFileService {

    SongFileResponse create(SongFileCreateRequest request);

    SongFileResponse getBySongId(UUID songId);

    void delete(UUID songId);

}
