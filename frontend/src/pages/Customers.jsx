import { useEffect, useState } from "react";
import { getCustomers, createCustomer } from "../api/services";
import "./index.css";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.log("Error fetching customers", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
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
      await createCustomer(form);
      setForm({ name: "", email: "", phone: "" });
      fetchCustomers();
    } catch (err) {
      console.log("Error creating customer", err);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Customers</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="form-input"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="form-input"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-input"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <button className="form-button">Add Customer</button>
      </form>

      <div className="list-container">
        {/* HEADER ROW ADDED */}
        <div className="list-card" style={{ fontWeight: "bold" }}>
          <div className="list-name">Name</div>
          <div className="list-meta">Email</div>
          <div className="list-meta">Phone</div>
        </div>

        {customers.map((c) => (
          <div className="list-card" key={c.id}>
            <div className="list-name">{c.name}</div>
            <div className="list-meta">{c.email}</div>
            <div className="list-meta">{c.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
