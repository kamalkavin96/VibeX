package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AlbumRequest {

    private String title;

    private String description;

    private String albumImageUrl;

    private LocalDate releaseDate;

    private String language;

    private String genre;
}