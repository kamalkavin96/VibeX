package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.model.PlayListSongs;

import java.util.List;
import java.util.UUID;

public interface PlayListSongsService {

    PlayListSongs addSongToPlaylist(UUID playlistId, UUID songId);

    void removeSongFromPlaylist(UUID playlistId, UUID songId);

    void removeAllSongFromPlaylist(UUID playlistId);

    List<PlayListSongs> getSongsByPlaylist(UUID playlistId);

    List<PlayListSongs> addSongsToPlaylistBulk(UUID playlistId, List<UUID> songIds);

    List<UUID> updateSongsToPlaylist(UUID playlistId, List<UUID> songsIdList);
}
