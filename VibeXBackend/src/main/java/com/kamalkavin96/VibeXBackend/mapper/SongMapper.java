package com.kamalkavin96.VibeXBackend.mapper;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.model.Song;

public class SongMapper {

    public static Song toEntity(SongCreateRequest req) {
        Song song = new Song();
        song.setTitle(req.getTitle());
        song.setAlbumName(req.getAlbumName());
        song.setSingerName(req.getAlbumName());
        return song;
    }

    public static SongResponse toResponse(Song song) {
        SongResponse res = new SongResponse();
        res.setId(song.getId());
        res.setTitle(song.getTitle());
        res.setAlbumName(song.getAlbumName());
        res.setSingerName(song.getSingerName());
        res.setSongKey(song.getSongKey());
        res.setThumbnailKey(song.getThumbnailKey());
        res.setCreatedAt(song.getCreatedAt());
        return res;
    }
}
