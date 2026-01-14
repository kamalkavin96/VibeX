package com.kamalkavin96.VibeXBackend.controller;

import com.kamalkavin96.VibeXBackend.dto.request.UserRequest;
import com.kamalkavin96.VibeXBackend.model.User;
import com.kamalkavin96.VibeXBackend.service.UserService;
import com.kamalkavin96.VibeXBackend.service.implementation.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    UserController(UserServiceImpl userService){
        this.userService = userService;
    }


    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserRequest userRequest){
        User user = userService.addUser(userRequest);
        return ResponseEntity.ok(user);
    }
}
