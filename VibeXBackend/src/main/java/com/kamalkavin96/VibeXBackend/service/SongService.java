package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.request.SongUpdateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import jakarta.transaction.Transactional;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

public interface SongService {

    @Transactional
    SongResponse createWithFile(
            SongCreateRequest request,
            MultipartFile file,
            MultipartFile thumbnailFile
    );

    SongResponse create(SongCreateRequest request);

    SongResponse getById(UUID id);

    List<SongResponse> getAll();

    SongResponse update(SongUpdateRequest request, MultipartFile thumbnailFile);

    void delete(UUID id);

    ResponseEntity<InputStreamResource> streamSong(UUID songId, String rangeHeader);

    ResponseEntity<InputStreamResource> getThumbnailStream(String thumbnailKey);

}
