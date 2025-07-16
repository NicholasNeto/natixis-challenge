package com.challenge.backend.dto;

public class LoginRequest {
    private String username; // Ou username, dependendo do que usa
    private String password;

    // Getters e Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

