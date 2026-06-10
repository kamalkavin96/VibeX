package com.kamalkavin96.VibeXBackend.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.stream.Stream;

@Configuration
public class CorsConfig implements WebMvcConfigurer {


    // Stream

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOrigins(
//                        "http://localhost:3000",
//                        "http://localhost:5173",
//                        "http://192.168.1.5:5173",
                        "*"
                )
                .allowedMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
                .allowedHeaders("*")
                .exposedHeaders(
                        "Authorization"
                )
                .allowCredentials(false)
                .maxAge(3600);
    }
}
