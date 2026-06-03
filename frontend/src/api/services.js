import api from "./api";

// PRODUCTS
export const getProducts = () => api.get("/api/products");
export const createProduct = (data) => api.post("/api/products", data);
export const updateProduct = (id, data) => api.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

// CUSTOMERS
export const getCustomers = () => api.get("/api/customers");
export const createCustomer = (data) => api.post("/api/customers", data);

// ORDERS
export const getOrders = () => api.get("/api/orders");
export const createOrder = (data) => api.post("/api/orders", data);
s;
