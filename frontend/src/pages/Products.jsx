import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/services";

import "./index.css";

function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stockQuantity: "",
  });

  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FORM CHANGE
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // MESSAGE
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        sku: form.sku,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
      };

      await createProduct(payload);

      if (payload.stockQuantity === 0) {
        showMessage("⚠ OUT OF STOCK PRODUCT ADDED");
      }

      setForm({ name: "", sku: "", price: "", stockQuantity: "" });
      fetchProducts();
    } catch (err) {
      console.log("Error creating product", err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.log("Delete error", err);
    }
  };

  // EDIT
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name || "",
      sku: product.sku || "",
      price: product.price || "",
      stockQuantity: product.stockQuantity || "",
    });
  };

  // UPDATE
  const handleUpdate = async (id) => {
    try {
      const payload = {
        name: editForm.name,
        sku: editForm.sku,
        price: Number(editForm.price),
        stockQuantity: Number(editForm.stockQuantity),
      };

      await updateProduct(id, payload);

      setEditingId(null);
      setEditForm({});
      fetchProducts();
    } catch (err) {
      console.log("Update error", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="page-container">
      {message && <div className="out-of-stock-popup">{message}</div>}

      <h2 className="page-title">Products</h2>

      {/* FORM */}
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
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
        />
        <input
          className="form-input"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          className="form-input"
          name="stockQuantity"
          placeholder="Stock"
          value={form.stockQuantity}
          onChange={handleChange}
        />

        <button className="form-button" type="submit">
          Add Product
        </button>
      </form>

      {/* TABLE */}
      <div className="list-container">
        {/* HEADER */}
        <div className="list-card" style={{ fontWeight: "bold" }}>
          <div className="list-meta">ID</div>
          <div className="list-name">Name</div>
          <div className="list-meta">SKU</div>
          <div className="list-meta">Price</div>
          <div className="list-meta">Qty</div>
          <div className="list-meta">Actions</div>
        </div>

        {/* ROWS */}
        {products.map((p) => (
          <div className="list-card" key={p.id}>
            {editingId === p.id ? (
              <>
                <div className="list-meta">{p.id}</div>

                <input
                  className="form-input"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />

                <input
                  className="form-input"
                  value={editForm.sku}
                  onChange={(e) =>
                    setEditForm({ ...editForm, sku: e.target.value })
                  }
                />

                <input
                  className="form-input"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                />

                <input
                  className="form-input"
                  value={editForm.stockQuantity}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      stockQuantity: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <>
                <div className="list-meta">{p.id}</div>
                <div className="list-name">{p.name}</div>
                <div className="list-meta">{p.sku}</div>
                <div className="list-meta">₹{p.price}</div>
                <div className="list-meta">
                  {Number(p.stockQuantity) > 0
                    ? `${p.stockQuantity} Left`
                    : "❌ Out of Stock"}
                </div>
              </>
            )}

            {/* ACTIONS */}
            <div className="list-actions">
              {editingId === p.id ? (
                <>
                  <button
                    type="button"
                    className="action-btn edit-btn"
                    onClick={() => handleUpdate(p.id)}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="action-btn delete-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
