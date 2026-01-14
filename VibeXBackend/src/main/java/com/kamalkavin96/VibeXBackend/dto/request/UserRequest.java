package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequest {
    private String name;
    private LocalDate dob;
    private String email;
}
