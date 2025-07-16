package com.challenge.backend.controller;

import com.challenge.backend.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// Inicia o contexto completo do Spring Boot para um teste de integração
@SpringBootTest
// Configura o MockMvc para fazer pedidos HTTP simulados
@AutoConfigureMockMvc
class ProductControllerTest {

    // MockMvc permite-nos enviar pedidos HTTP para os nossos controllers sem iniciar um servidor real.
    @Autowired
    private MockMvc mockMvc;

    // ObjectMapper ajuda a converter objetos Java para JSON e vice-versa.
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    // Como o endpoint de POST está protegido, usamos @WithMockUser para simular um utilizador autenticado.
    // Para endpoints públicos, esta anotação não é necessária.
    @WithMockUser
    void whenPostProduct_thenCreateProduct() throws Exception {
        // Arrange
        Product newProduct = new Product(null, "Produto via API", "Teste de API", 199.99, 50);
        String newProductAsJson = objectMapper.writeValueAsString(newProduct);

        // Act & Assert
        mockMvc.perform(post("/api/products") // Faz um POST para o endpoint
                        .contentType(MediaType.APPLICATION_JSON) // Define o tipo de conteúdo
                        .content(newProductAsJson)) // Adiciona o nosso produto JSON ao corpo do pedido
                .andExpect(status().isCreated()) // Esperamos um status 201 Created
                .andExpect(jsonPath("$.id").exists()) // Esperamos que a resposta JSON tenha um campo 'id'
                .andExpect(jsonPath("$.name").value("Produto via API")); // E que o nome seja o que enviámos
    }
}
