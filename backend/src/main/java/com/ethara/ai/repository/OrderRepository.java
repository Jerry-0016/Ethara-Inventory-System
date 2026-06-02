package com.ethara.ai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ethara.ai.entity.Order;

public interface OrderRepository
        extends JpaRepository<Order, Long> {
}