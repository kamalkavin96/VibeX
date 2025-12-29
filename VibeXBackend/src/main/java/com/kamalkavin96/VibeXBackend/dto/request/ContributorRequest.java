package com.kamalkavin96.VibeXBackend.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ContributorRequest {
    private String name;
    private LocalDate dateOfBirth;
    private String gender;
}
