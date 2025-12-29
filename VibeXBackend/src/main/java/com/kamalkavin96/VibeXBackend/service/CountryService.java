package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.CountryRequest;
import com.kamalkavin96.VibeXBackend.model.Country;

import java.util.List;

public interface CountryService {
    Country create(CountryRequest req);
    List<Country> getAll();
    Country get(Long id);
    void delete(Long id);
}