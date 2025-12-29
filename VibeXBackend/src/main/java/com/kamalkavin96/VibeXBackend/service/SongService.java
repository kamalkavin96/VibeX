package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.request.SongUpdateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;

import java.util.List;
import java.util.UUID;

public interface SongService {

    SongResponse create(SongCreateRequest request);

    SongResponse getById(UUID id);

    List<SongResponse> getAll();

    SongResponse update(UUID id, SongUpdateRequest request);

    void delete(UUID id);
}
