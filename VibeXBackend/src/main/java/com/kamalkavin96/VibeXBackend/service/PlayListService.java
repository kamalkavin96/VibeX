package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.LabelRequest;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListRequest;
import com.kamalkavin96.VibeXBackend.model.Label;
import com.kamalkavin96.VibeXBackend.model.PlayList;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface PlayListService {
    PlayList create(PlayListRequest req, MultipartFile image);
    List<PlayList> getAll();
    PlayList get(Long id);
    void delete(Long id);
}
