package com.kamalkavin96.VibeXBackend.service;

import com.kamalkavin96.VibeXBackend.dto.request.UserRequest;
import com.kamalkavin96.VibeXBackend.model.User;

import java.util.List;

public interface UserService {
    User addUser(UserRequest user);
    List<User> getAllUsers();
    String deleteUser(Long userId);
    User getUser(Long userId);
}
