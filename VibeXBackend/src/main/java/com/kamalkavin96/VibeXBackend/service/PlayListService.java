package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.LabelRequest;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListRequest;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListUpdateRequest;
import com.kamalkavin96.VibeXBackend.model.Label;
import com.kamalkavin96.VibeXBackend.model.PlayList;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public interface PlayListService {
    PlayList create(PlayListRequest req, MultipartFile image, List<UUID> selectedSongs);
    ResponseEntity<InputStreamResource> getImage(String imageKey);
    List<PlayList> getAll();
    PlayList get(UUID id);
    void delete(UUID id);
    PlayList update(PlayListUpdateRequest req,  MultipartFile image);
}
