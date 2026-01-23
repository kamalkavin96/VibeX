package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.PlayListRequest;
import com.kamalkavin96.VibeXBackend.dto.request.PlayListUpdateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.PlayListCreateResponse;
import com.kamalkavin96.VibeXBackend.model.PlayList;
import com.kamalkavin96.VibeXBackend.model.PlayListSongs;
import com.kamalkavin96.VibeXBackend.repository.PlayListRepository;
import com.kamalkavin96.VibeXBackend.repository.SongRepository;
import com.kamalkavin96.VibeXBackend.service.MinioStorageService;
import com.kamalkavin96.VibeXBackend.service.PlayListService;
import com.kamalkavin96.VibeXBackend.service.PlayListSongsService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayListServiceImpl implements PlayListService {

    private final PlayListRepository playListRepository;
    private final MinioStorageService minioStorageService;
    private final PlayListSongsService playListSongsService;
    private final SongRepository songRepository;

    @Override
    public PlayList create(PlayListRequest req, MultipartFile image, List<UUID> selectedSongs) {

        playListRepository.findByName(req.getName())
                .ifPresent(p -> {
                    throw new IllegalArgumentException("Playlist already exists: " + req.getName());
                });

        String imageKey = null;
        if (image != null && !image.isEmpty()) {
            imageKey = minioStorageService.uploadFile(image,"playlist-images","thumbnails");
        }

        PlayList playList = PlayList.builder()
                .name(req.getName())
                .userId(req.getUserId())
                .description(req.getDescription())
                .imageKey(imageKey)
                .build();
        playList = playListRepository.save(playList);

        if (selectedSongs != null){
            playListSongsService.addSongsToPlaylistBulk(playList.getId(), selectedSongs);
        }


        PlayListCreateResponse playListCreateResponse = new PlayListCreateResponse(
                playList.getId(),
                playList.getName(),
                playList.getUserId(),
                playList.getDescription(),
                playList.getImageKey(),
                playList.getCreatedAt(),
                playList.getUpdatedAt(),
                playListSongsService.getSongsByPlaylist(playList.getId()).stream().map(PlayListSongs::getId).collect(Collectors.toList())
        );
//        playListCreateResponse
        return playListRepository.save(playList);
    }

    @Override
    public List<PlayList> getAll() {
        return playListRepository.findAll();
    }
    @Override
    public PlayList get(UUID id) {
        return playListRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found with id: " + id));
    }

    @Override
    public void delete(UUID id) {
        PlayList playList = get(id);

        if (playList.getImageKey() != null) {
            minioStorageService.deleteFile(playList.getImageKey(),"playlist-images","thumbnails");
        }
        playListSongsService.removeAllSongFromPlaylist(playList.getId());
        playListRepository.delete(playList);
    }

    @Override
    @Transactional
    public PlayList update(PlayListUpdateRequest req, MultipartFile image) {

        PlayList playList = playListRepository.findById(req.getPlayListId())
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Playlist not found with id: " + req.getPlayListId()
                        )
                );

        // Update name
        if (req.getName() != null && !req.getName().isBlank()) {
            playList.setName(req.getName());
        }

        // Update description
        if (req.getDescription() != null) {
            playList.setDescription(req.getDescription());
        }

        // Update user
        if (req.getUserId() != null) {
            playList.setUserId(req.getUserId());
        }

        // Update songs
        if (req.getSongsIdList() != null && !req.getSongsIdList().isEmpty()) {
            List<UUID> songsIdList = playListSongsService.updateSongsToPlaylist(req.getPlayListId(), req.getSongsIdList());
        } else {
            playListSongsService.removeAllSongFromPlaylist(req.getPlayListId());
        }

        // Update image
        if (image != null && !image.isEmpty()) {

            // Replace existing image if key exists
            String imageKey = minioStorageService.replaceFile(
                    image,
                    "playlist-images",
                    "thumbnails",
                    req.getImageKey()
            );

            playList.setImageKey(imageKey);
        }
        playList.setUpdatedAt(Instant.now());

        return playListRepository.save(playList);
    }


    @Override
    public ResponseEntity<InputStreamResource> getImage(String imageKey) {

        var stat = minioStorageService.getFileStat(imageKey,"playlist-images","thumbnails");
        InputStream stream = minioStorageService.getFile(imageKey,"playlist-images", "thumbnails");
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(stat.contentType()))
                .contentLength(stat.size())
                .header("Cache-Control", "max-age=86400")
                .body(new InputStreamResource(stream));
    }


}
