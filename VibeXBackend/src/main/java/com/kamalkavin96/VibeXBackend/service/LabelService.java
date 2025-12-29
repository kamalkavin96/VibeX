package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.LabelRequest;
import com.kamalkavin96.VibeXBackend.model.Label;

import java.util.List;

public interface LabelService {
    Label create(LabelRequest req);
    List<Label> getAll();
    Label get(Long id);
    void delete(Long id);
}
