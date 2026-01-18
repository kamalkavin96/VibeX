package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.model.PlayListSongs;
import com.kamalkavin96.VibeXBackend.model.Song;
import com.kamalkavin96.VibeXBackend.repository.PlayListRepository;
import com.kamalkavin96.VibeXBackend.repository.PlayListSongsRepository;
import com.kamalkavin96.VibeXBackend.repository.SongRepository;
import com.kamalkavin96.VibeXBackend.service.PlayListSongsService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PlayListSongsServiceImpl implements PlayListSongsService {

    private final PlayListSongsRepository playListSongsRepository;
    private final PlayListRepository playListRepository;
    private final SongRepository songRepository;

    /* ---------------- ADD SONG ---------------- */
    @Override
    public PlayListSongs addSongToPlaylist(UUID playlistId, UUID songId) {

        // Validate playlist
        playListRepository.findById(playlistId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Playlist not found: " + playlistId)
                );

        // Validate song
        songRepository.findById(songId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Song not found: " + songId)
                );

        // Optional fast check (UX-friendly)
        if (playListSongsRepository.existsByPlaylistIdAndSongId(playlistId, songId)) {
            throw new IllegalStateException("Song already exists in playlist");
        }

        try {
            PlayListSongs entity = PlayListSongs.builder()
                    .playlistId(playlistId)
                    .songId(songId)
                    .build();

            return playListSongsRepository.save(entity);

        } catch (DataIntegrityViolationException ex) {
            // Safety net if race-condition hits UNIQUE constraint
            throw new IllegalStateException("Song already exists in playlist", ex);
        }
    }

    /* ---------------- ADD SONGS TO PLAYLIST ---------------- */
    @Override
    @Transactional
    public List<UUID> updateSongsToPlaylist(UUID playlistId, List<UUID> songsIdList) {

        // 1️⃣ Validate playlist
        playListRepository.findById(playlistId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Playlist not found: " + playlistId)
                );

        // 2️⃣ Current playlist songs
        List<UUID> existingSongIds =
                playListSongsRepository.findSongIdsByPlaylistId(playlistId);

        // If request is null → no change
        if (songsIdList == null) {
            return existingSongIds;
        }

        Set<UUID> existingSet = new HashSet<>(existingSongIds);
        Set<UUID> incomingSet = new HashSet<>(songsIdList);

        List<UUID> songAddList = new ArrayList<>();
        List<UUID> songDeleteList = new ArrayList<>();

        // 3️⃣ Songs to ADD
        for (UUID songId : incomingSet) {
            if (!existingSet.contains(songId)) {
                songAddList.add(songId);
            }
        }

        // 4️⃣ Songs to REMOVE
        for (UUID songId : existingSet) {
            if (!incomingSet.contains(songId)) {
                songDeleteList.add(songId);
            }
        }

        // 5️⃣ Apply changes
        songDeleteList.forEach(songId ->
                removeSongFromPlaylist(playlistId, songId)
        );

        if (!songAddList.isEmpty()) {
            addSongsToPlaylistBulk(playlistId, songAddList);
        }

        // 6️⃣ Return updated list
        return playListSongsRepository.findSongIdsByPlaylistId(playlistId);
    }



    /* ---------------- REMOVE SONG ---------------- */
    @Override
    public void removeSongFromPlaylist(UUID playlistId, UUID songId) {

        PlayListSongs entity = playListSongsRepository
                .findByPlaylistIdAndSongId(playlistId, songId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Song not found in playlist")
                );

        playListSongsRepository.delete(entity);
    }

    /* ---------------- REMOVE ALL SONG ---------------- */
    @Override
    public void removeAllSongFromPlaylist(UUID playlistId) {

        List<PlayListSongs> playListSongsList = this.getSongsByPlaylist(playlistId);
        playListSongsList.forEach(playListSong -> {
            PlayListSongs entity = playListSongsRepository
                    .findByPlaylistIdAndSongId(playlistId, playListSong.getSongId())
                    .orElseThrow();
            playListSongsRepository.delete(entity);
        });


    }

    /* ---------------- GET SONGS BY PLAYLIST ---------------- */
    @Override
    public List<PlayListSongs> getSongsByPlaylist(UUID playlistId) {

        // Validate playlist exists
        playListRepository.findById(playlistId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Playlist not found: " + playlistId)
                );

        return playListSongsRepository.findByPlaylistIdOrderByAddedOnDesc(playlistId);
    }

    /* ---------------- ADD SONG BULK ---------------- */
    @Override
    public List<PlayListSongs> addSongsToPlaylistBulk(
            UUID playlistId,
            List<UUID> songIds
    ) {

        // Validate playlist
        playListRepository.findById(playlistId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Playlist not found: " + playlistId)
                );

        if (songIds == null || songIds.isEmpty()) {
            throw new IllegalArgumentException("SongIds list cannot be empty");
        }

        // Validate songs exist
        List<UUID> existingSongIds =
                songRepository.findAllById(songIds)
                        .stream()
                        .map(Song::getId)
                        .toList();

        if (existingSongIds.size() != songIds.size()) {
            throw new EntityNotFoundException("One or more songs not found");
        }

        // Filter out already existing entries
        List<UUID> alreadyPresent =
                playListSongsRepository.findSongIdsByPlaylistId(playlistId);

        List<PlayListSongs> entities = songIds.stream()
                .filter(songId -> !alreadyPresent.contains(songId))
                .map(songId -> PlayListSongs.builder()
                        .playlistId(playlistId)
                        .songId(songId)
                        .build()
                )
                .toList();

        if (entities.isEmpty()) {
            return List.of();
        }

        return playListSongsRepository.saveAll(entities);
    }
}
