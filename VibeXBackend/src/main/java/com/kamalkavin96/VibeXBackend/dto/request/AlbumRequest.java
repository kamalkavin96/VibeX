package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class AlbumRequest {
    private String name;
    private Date releaseDate;
}