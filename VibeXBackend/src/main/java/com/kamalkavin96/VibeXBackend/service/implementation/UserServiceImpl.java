package com.kamalkavin96.VibeXBackend.service.implementation;

import com.kamalkavin96.VibeXBackend.dto.request.UserRequest;
import com.kamalkavin96.VibeXBackend.model.User;
import com.kamalkavin96.VibeXBackend.repository.UserRepository;
import com.kamalkavin96.VibeXBackend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(UserRequest userRequest) {
        User user = User.builder()
                .name(userRequest.getName())
                .email(userRequest.getEmail())
                .dob(userRequest.getDob())
                .build();
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return List.of();
    }

    @Override
    public String deleteUser(Long userId) {
        return "";
    }

    @Override
    public User getUser(Long userId) {
        return null;
    }
}
