package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.request.SongUpdateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.mapper.SongMapper;
import com.kamalkavin96.VibeXBackend.model.PlayListSongs;
import com.kamalkavin96.VibeXBackend.model.Song;
import com.kamalkavin96.VibeXBackend.repository.SongRepository;
import com.kamalkavin96.VibeXBackend.service.MinioStorageService;
import com.kamalkavin96.VibeXBackend.service.SongService;
import io.minio.StatObjectResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final MinioStorageService minioStorageService;
    private final PlayListSongsServiceImpl playListSongsService;


    @Override
    public SongResponse createWithFile(
            SongCreateRequest request,
            MultipartFile file,
            MultipartFile thumbnailFile
    ) {
        String objectKey = minioStorageService.uploadFile(file, "song-files", "songs");
        String thumbnailObjectKey = minioStorageService.uploadFile(thumbnailFile, "song-files", "thumbnails");
        Song song = SongMapper.toEntity(request);
        song.setSongKey(objectKey);
        song.setThumbnailKey(thumbnailObjectKey);
        song = songRepository.save(song);
        return SongMapper.toResponse(song);
    }

    @Override
    public SongResponse create(SongCreateRequest request) {
        Song song = SongMapper.toEntity(request);
        return SongMapper.toResponse(songRepository.save(song));
    }

    @Override
    public SongResponse getById(UUID id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        return SongMapper.toResponse(song);
    }

    @Override
    public List<SongResponse> getAll() {
        return songRepository.findAll()
                .stream()
                .map(SongMapper::toResponse)
                .toList();
    }

    @Override
    public List<SongResponse> getAllByPlayListId(UUID id) {
        List<PlayListSongs> songsIdByPlayListId = playListSongsService.getSongsByPlaylist(id);
        List<UUID> songIdList = songsIdByPlayListId.stream().map(PlayListSongs::getSongId).toList();
        List<Song> songs = songRepository.findAllById(songIdList);
        return songs.stream()
                .map(SongMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public SongResponse update(
            SongUpdateRequest request,
            MultipartFile thumbnailFile
    ) {
        Song song = songRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("Song not found"));

        song.setTitle(request.getTitle());
        song.setAlbumName(request.getAlbumName());
        song.setSingerName(request.getSingerName());
        song.setUpdatedAt(Instant.now());

        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            System.out.println("Replacing.....");
            minioStorageService.replaceFile(
                    thumbnailFile,
                    "song-files",
                    "thumbnails",
                    song.getThumbnailKey()
            );
        }

        return SongMapper.toResponse(songRepository.save(song));
    }

    @Override
    public void delete(UUID id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        minioStorageService.deleteFile(song.getSongKey(), "song-files", "songs");
        minioStorageService.deleteFile(song.getThumbnailKey(), "song-files", "thumbnails");
        songRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<InputStreamResource> streamSong(UUID songId, String rangeHeader) {

        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        StatObjectResponse stat = minioStorageService.getFileStat(song.getSongKey(), "song-files", "songs");
        long fileSize = stat.size();

        long rangeStart = 0;
        long rangeEnd = fileSize - 1;

        if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
            String[] ranges = rangeHeader.replace("bytes=", "").split("-");
            rangeStart = Long.parseLong(ranges[0]);
            if (ranges.length > 1 && !ranges[1].isEmpty()) {
                rangeEnd = Long.parseLong(ranges[1]);
            }
        }

        long contentLength = rangeEnd - rangeStart + 1;

        InputStream inputStream = minioStorageService.getSongStream(
                song.getSongKey(),
                rangeStart,
                contentLength
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, "audio/mpeg");
        headers.set(HttpHeaders.ACCEPT_RANGES, "bytes");
        headers.set(HttpHeaders.CONTENT_LENGTH, String.valueOf(contentLength));
        headers.set(
                HttpHeaders.CONTENT_RANGE,
                "bytes " + rangeStart + "-" + rangeEnd + "/" + fileSize
        );

        return ResponseEntity
                .status(HttpStatus.PARTIAL_CONTENT)
                .headers(headers)
                .body(new InputStreamResource(inputStream));
    }

    @Override
    public ResponseEntity<InputStreamResource> getThumbnailStream(String thumbnailKey) {

        // 1. Get metadata (size + content type)
        StatObjectResponse stat = minioStorageService.getFileStat(thumbnailKey, "song-files", "thumbnails");
        long fileSize = stat.size();

        // 2. Fetch full thumbnail (no range needed)
        InputStream inputStream = minioStorageService.getFile(
                thumbnailKey,
                "song-files",
                "thumbnails"
        );

        // 3. Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, stat.contentType());
        headers.set(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileSize));
        headers.set(HttpHeaders.CACHE_CONTROL, "max-age=86400, public");

        // 4. Return response
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new InputStreamResource(inputStream));
    }




}
