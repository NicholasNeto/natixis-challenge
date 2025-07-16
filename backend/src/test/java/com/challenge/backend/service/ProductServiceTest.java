package com.challenge.backend.service;

import com.challenge.backend.model.Product;
import com.challenge.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest { 

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    
    @Test
    void whenCreateProduct_shouldReturnSavedProduct() {
    
        Product productToSave = new Product(null, "Novo Produto", "Descrição", 100.0, 10);
        Product savedProduct = new Product(1L, "Novo Produto", "Descrição", 100.0, 10);

        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

    
        Product result = productService.save(productToSave); 

    
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getName()).isEqualTo("Novo Produto");

        verify(productRepository, times(1)).save(productToSave);
    }

} 

