# Inventory Management System

A full-stack Inventory Management System built using Java Spring Boot, React, PostgreSQL, and Docker. The application provides inventory tracking, customer management, and order management through a modern web interface and RESTful APIs.

## 🚀 Live Demo

**Frontend:**
https://ethara-inventory-system-1.onrender.com

**Backend API:**
https://ethara-inventory-system-jo05.onrender.com

---

## 📌 Features

### Product Management

* Add new products
* View product inventory
* Update product details
* Delete products
* Track stock quantities

### Customer Management

* Add customers
* View customer information
* Manage customer records

### Order Management

* Create customer orders
* View order history
* Associate orders with customers and products

### Backend Features

* RESTful API architecture
* Spring Data JPA integration
* PostgreSQL database
* Exception handling
* Layered architecture (Controller → Service → Repository)

### Frontend Features

* React + Vite
* Axios API integration
* Responsive UI
* Component-based architecture
* Real-time CRUD operations

---

## 🛠 Technology Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven

### Frontend

* React
* Vite
* Axios
* JavaScript
* HTML5
* CSS3

### DevOps & Deployment

* Docker
* Docker Compose
* Render
* Git
* GitHub

---

## 🏗 Architecture

```text
React Frontend
       │
       ▼
Spring Boot REST APIs
       │
       ▼
PostgreSQL Database
```

---

## 🔗 REST API Endpoints

### Products

```http
GET    /api/products
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
```

### Customers

```http
GET    /api/customers
POST   /api/customers
```

### Orders

```http
GET    /api/orders
POST   /api/orders
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/<your-username>/Ethara-Inventory-System.git
cd Ethara-Inventory-System
```

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### PostgreSQL Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE inventory_db;
```

Update database credentials in `application.properties`.

---

## 🐳 Docker Setup

Run the complete application using Docker Compose:

```bash
docker compose up --build
```

Services included:

* PostgreSQL
* Spring Boot Backend
* React Frontend

---

## 📁 Project Structure

```text
Ethara-Inventory-System
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   └── config
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   └── pages
│
├── docker-compose.yml
└── README.md
```

---

## 💡 Key Skills Demonstrated

* Full Stack Development
* Java Spring Boot
* REST API Development
* React Development
* PostgreSQL Database Design
* JPA/Hibernate ORM
* Docker Containerization
* Cloud Deployment (Render)
* Git Version Control
* CRUD Operations
* Client-Server Architecture

---

## 👨‍💻 Author

**Prashant Kumar**
Software Engineer | Java Full Stack Developer

### Skills

Java • Spring Boot • React • Angular • SQL • PostgreSQL • AWS • Docker • Jenkins • CI/CD • Microservices

**GitHub:** https://github.com/Jerry-0016

**LinkedIn:** https://www.linkedin.com/in/prashantkumar-dev/

---

This project demonstrates end-to-end full-stack application development, deployment, database integration, containerization, and REST API implementation using modern enterprise technologies.
