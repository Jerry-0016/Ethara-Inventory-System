package com.ethara.ai.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductDto {

    @NotBlank
    private String name;

    @NotBlank
    private String sku;

    @Min(1)
    private Double price;

    @Min(0)
    private Integer stockQuantity;
}
