package com.kamalkavin96.VibeXBackend.mapper;

import com.kamalkavin96.VibeXBackend.dto.request.SongCreateRequest;
import com.kamalkavin96.VibeXBackend.dto.response.SongResponse;
import com.kamalkavin96.VibeXBackend.model.Song;

public class SongMapper {

    public static Song toEntity(SongCreateRequest req) {
        Song song = new Song();
        song.setTitle(req.getTitle());
        song.setAlbumId(req.getAlbumId());
        song.setLabelId(req.getLabelId());
        song.setLanguageId(req.getLanguageId());
        song.setSingerIds(req.getSingerIds());
        song.setLyricistIds(req.getLyricistIds());
        song.setMusicianIds(req.getMusicianIds());
        song.setDirectorIds(req.getDirectorIds());
        song.setCastIds(req.getCastIds());
        return song;
    }

    public static SongResponse toResponse(Song song) {
        SongResponse res = new SongResponse();
        res.setId(song.getId());
        res.setTitle(song.getTitle());
        res.setAlbumId(song.getAlbumId());
        res.setLabelId(song.getLabelId());
        res.setLanguageId(song.getLanguageId());
        res.setSingerIds(song.getSingerIds());
        res.setLyricistIds(song.getLyricistIds());
        res.setMusicianIds(song.getMusicianIds());
        res.setDirectorIds(song.getDirectorIds());
        res.setCastIds(song.getCastIds());
        res.setCreatedAt(song.getCreatedAt());
        return res;
    }
}
