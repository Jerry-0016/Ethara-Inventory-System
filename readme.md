# 📦 Inventory & Order Management System

A full-stack **Inventory & Order Management System** built using **Spring Boot, React, PostgreSQL, and Docker**.  
This project demonstrates real-world backend architecture, REST API design, and frontend integration with inventory business logic.

---

## 🚀 Live Demo (Optional)
- Frontend: https://your-frontend-url
- Backend API: https://your-backend-url

---

## 🛠️ Tech Stack

### Backend
- Java 17+
- Spring Boot
- Spring Data JPA (Hibernate)
- PostgreSQL
- REST APIs
- Maven

### Frontend
- React.js (Vite)
- Axios
- JavaScript (ES6+)
- CSS (Custom UI)

### DevOps / Tools
- Docker
- Docker Compose
- Postman
- Git & GitHub

---

## 📌 Features

### Product Management
- Add, update, delete products
- Track stock quantity
- Unique SKU validation

### Customer Management
- Add customers
- Unique email validation
- View customers list

### Order Management
- Create orders
- Select customer & product
- Automatic stock reduction
- Prevent order if stock is insufficient
- Order history tracking

---

## 🧠 Business Rules

- Unique product SKU validation
- Unique customer email validation
- Stock validation before order creation
- Automatic stock reduction on order placement
- Order blocked if stock is insufficient

---

## 🐳 Run with Docker

### 1. Clone Repository
```bash
git clone https://github.com/your-username/inventory-system.git