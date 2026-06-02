package com.ethara.ai.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ethara.ai.dto.ProductDto;
import com.ethara.ai.entity.Product;
import com.ethara.ai.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(ProductDto dto) {
        if (productRepository.existsBySku(dto.getSku())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "SKU already exists");
        }

        Product product = Product.builder()
                .name(dto.getName())
                .sku(dto.getSku())
                .price(dto.getPrice())
                .stockQuantity(dto.getStockQuantity())
                .build();

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found"));

        if (!product.getSku().equals(dto.getSku()) &&
                productRepository.existsBySku(dto.getSku())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "SKU already exists");
        }

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setPrice(dto.getPrice());
        product.setStockQuantity(dto.getStockQuantity());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found");
        }

        productRepository.deleteById(id);
    }
}
