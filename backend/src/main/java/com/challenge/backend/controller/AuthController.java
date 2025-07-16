package com.challenge.backend.controller;

import com.challenge.backend.dto.AuthResponse;
import com.challenge.backend.dto.LoginRequest;
import com.challenge.backend.security.JwtUtil; // Garanta que tem este import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil; // Garanta que tem o JwtUtil

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) throws Exception {
        // Autentica o utilizador
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        // Carrega os detalhes do utilizador
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        // Gera o token JWT
        final String jwt = jwtUtil.generateToken(userDetails);

        // Retorna o token
        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}




// package com.challenge.backend.controller;

// import com.challenge.backend.dto.LoginRequest;
// // import org.springframework.beans.factory.annotation.Autowired; // Comente isto
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// // import org.springframework.security.authentication.AuthenticationManager; // Comente isto
// // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // Comente isto

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     // @Autowired
//     // private AuthenticationManager authenticationManager; // Comente isto

//     // ... comente os outros @Autowired se os tiver

//     @PostMapping("/login")
//     public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
//         // Comente toda a lógica de autenticação por agora
//         /* authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
//         );
//         */

//         // Apenas imprima no console e retorne uma resposta de sucesso
//         System.out.println("Endpoint /api/auth/login alcançado com sucesso!");
//         return ResponseEntity.ok("Endpoint de login alcançado!");
//     }
// }

