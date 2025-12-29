package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.LabelRequest;
import com.kamalkavin96.VibeXBackend.exception.ResourceNotFoundException;
import com.kamalkavin96.VibeXBackend.model.Label;
import com.kamalkavin96.VibeXBackend.repository.LabelRepository;
import com.kamalkavin96.VibeXBackend.service.LabelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LabelServiceImpl implements LabelService {

    private final LabelRepository repo;

    public Label create(LabelRequest req) {
        Label label = new Label(null, req.getName(), req.getCountryId(), Instant.now());
        return repo.save(label);
    }

    public List<Label> getAll() {
        return repo.findAll();
    }

    public Label get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Label not found"));
    }

    public void delete(Long id) {
        repo.delete(get(id));
    }
}
