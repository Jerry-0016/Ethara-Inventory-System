package com.ethara.ai.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ethara.ai.dto.OrderDto;
import com.ethara.ai.entity.Customer;
import com.ethara.ai.entity.Order;
import com.ethara.ai.entity.Product;
import com.ethara.ai.repository.CustomerRepository;
import com.ethara.ai.repository.OrderRepository;
import com.ethara.ai.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            CustomerRepository customerRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order createOrder(OrderDto dto) {

        if (dto.getQuantity() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity must be greater than 0");
        }

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found"));

        if (product.getStockQuantity() < dto.getQuantity()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock");
        }

        product.setStockQuantity(
                product.getStockQuantity() - dto.getQuantity());

        productRepository.save(product);

        Order order = new Order();

        order.setCustomer(customer);
        order.setProduct(product);
        order.setQuantity(dto.getQuantity());
        order.setOrderDate(LocalDateTime.now());

        double totalPrice = product.getPrice() * dto.getQuantity();

        order.setTotalPrice(totalPrice);

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}