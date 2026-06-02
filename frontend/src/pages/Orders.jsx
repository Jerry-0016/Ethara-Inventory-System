import { useEffect, useState } from "react";
import {
  getOrders,
  createOrder,
  getCustomers,
  getProducts,
} from "../api/services";
import "./index.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customerId: "",
    productId: "",
    quantity: "",
  });

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders", err);
    }
  };

  const fetchMasterData = async () => {
    try {
      const [c, p] = await Promise.all([getCustomers(), getProducts()]);

      setCustomers(c.data);
      setProducts(p.data);
    } catch (err) {
      console.log("Error loading dropdown data", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMasterData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrder(form);
      setForm({ customerId: "", productId: "", quantity: "" });
      fetchOrders();
    } catch (err) {
      console.log("Error creating order", err);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Orders</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        <select
          className="form-input"
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="form-input"
          name="productId"
          value={form.productId}
          onChange={handleChange}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          className="form-input"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <button className="form-button">Place Order</button>
      </form>

      <div className="list-container">
        {/* HEADER ROW */}
        <div className="list-card" style={{ fontWeight: "bold" }}>
          <div className="list-name">Customer</div>
          <div className="list-meta">Bought</div>
          <div className="list-meta">Qty</div>
          <div className="list-meta">Status</div>
        </div>

        {orders.map((o) => (
          <div className="list-card" key={o.id}>
            <div className="list-name">{o.customer?.name}</div>
            <div className="list-meta">{o.product?.name}</div>
            <div className="list-meta">{o.quantity}</div>

            {/* NEW STATUS COLUMN */}
            <div className="list-meta status-delivered">Delivered</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
