package com.kamalkavin96.VibeXBackend.mapper;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.model.Song;

public final class SongMapper {

    private SongMapper() {}

    public static Song toEntity(SongCreateRequest request) {

        Song song = new Song();
        song.setTitle(request.getTitle());
        return song;
    }

    public static SongResponse toResponse(Song song) {

        SongResponse response = new SongResponse();
        response.setId(song.getId());
        response.setTitle(song.getTitle());

        if (song.getAlbum() != null) {

            response.setAlbumId(song.getAlbum().getId());
            response.setAlbumTitle(song.getAlbum().getTitle());
        }

        response.setSongKey(song.getSongKey());
        response.setThumbnailKey(song.getThumbnailKey());
        response.setCreatedAt(song.getCreatedAt());
        response.setUpdatedAt(song.getUpdatedAt());

        return response;
    }
}