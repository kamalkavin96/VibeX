package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.LabelRequest;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListRequest;
import com.kamalkavin96.VibeXBackend.model.PlayList;
import com.kamalkavin96.VibeXBackend.repository.PlayListRepository;
import com.kamalkavin96.VibeXBackend.service.MinioStorageService;
import com.kamalkavin96.VibeXBackend.service.PlayListService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayListServiceImpl implements PlayListService {

    private final PlayListRepository playListRepository;
    private final MinioStorageService minioStorageService;

    @Override
    public PlayList create(PlayListRequest req, MultipartFile image) {

        playListRepository.findByName(req.getName())
                .ifPresent(p -> {
                    throw new IllegalArgumentException("Playlist already exists with name: " + req.getName());
                });
        String imageKey = null;
        if (image != null && !image.isEmpty()) {
            imageKey = minioStorageService.uploadPlaylistImage(image);
        }

        PlayList playList = PlayList.builder()
                .name(req.getName())
                .userId(req.getUserId())
                .description(req.getDescription())
                .imageKey(imageKey)
                .build();

        return playListRepository.save(playList);
    }

    @Override
    public List<PlayList> getAll() {
        return playListRepository.findAll();
    }

    @Override
    public PlayList get(Long id) {
        return playListRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Playlist not found with id: " + id)
                );
    }

    @Override
    public void delete(Long id) {
        PlayList playList = playListRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Playlist not found with id: " + id)
                );
        minioStorageService.deletePlayListImage(playList.getImageKey());
        playListRepository.deleteById(id);
    }
}
