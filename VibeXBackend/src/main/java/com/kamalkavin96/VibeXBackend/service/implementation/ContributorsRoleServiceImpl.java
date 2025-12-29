package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.ContributorsRoleRequest;
import com.kamalkavin96.VibeXBackend.exception.ResourceNotFoundException;
import com.kamalkavin96.VibeXBackend.model.ContributorsRole;
import com.kamalkavin96.VibeXBackend.repository.ContributorsRoleRepository;
import com.kamalkavin96.VibeXBackend.service.ContributorsRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContributorsRoleServiceImpl implements ContributorsRoleService {

    private final ContributorsRoleRepository repository;

    @Override
    public ContributorsRole create(ContributorsRoleRequest request) {

        if (repository.existsByNameIgnoreCase(request.getName())) {
            throw new RuntimeException(
                    "Contributor role already exists: " + request.getName()
            );
        }

        ContributorsRole role = new ContributorsRole();
        role.setName(request.getName());
        role.setCreatedAt(Instant.now());

        return repository.save(role);
    }

    @Override
    public ContributorsRole get(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "ContributorsRole not found with id: " + id
                        )
                );
    }

    @Override
    public List<ContributorsRole> getAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.delete(get(id));
    }
}
