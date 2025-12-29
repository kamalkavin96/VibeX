package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.CountryRequest;
import com.kamalkavin96.VibeXBackend.exception.ResourceNotFoundException;
import com.kamalkavin96.VibeXBackend.model.Country;
import com.kamalkavin96.VibeXBackend.repository.CountryRepository;
import com.kamalkavin96.VibeXBackend.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepository repo;

    public Country create(CountryRequest req) {
        Country c = new Country(null, req.getName(), req.getIsoCode(), Instant.now());
        return repo.save(c);
    }

    public List<Country> getAll() {
        return repo.findAll();
    }

    public Country get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Country not found"));
    }

    public void delete(Long id) {
        repo.delete(get(id));
    }
}
