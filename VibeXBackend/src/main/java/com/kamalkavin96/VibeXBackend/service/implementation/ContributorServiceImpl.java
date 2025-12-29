package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.ContributorRequest;
import com.kamalkavin96.VibeXBackend.exception.ResourceNotFoundException;
import com.kamalkavin96.VibeXBackend.model.Contributor;
import com.kamalkavin96.VibeXBackend.repository.ContributorRepository;
import com.kamalkavin96.VibeXBackend.service.ContributorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContributorServiceImpl implements ContributorService {

    private final ContributorRepository repo;

    public Contributor create(ContributorRequest req) {
        Contributor c = new Contributor(
                null,
                req.getName(),
                req.getDateOfBirth(),
                req.getGender(),
                Instant.now()
        );
        return repo.save(c);
    }

    public List<Contributor> getAll() {
        return repo.findAll();
    }

    public Contributor get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contributor not found"));
    }

    public void delete(Long id) {
        repo.delete(get(id));
    }
}
