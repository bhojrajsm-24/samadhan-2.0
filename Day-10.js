//task-10 of hackthon....
//frontend :-
import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  // fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // add product
  const addProduct = async () => {
    if (!name || !price || !img) return;
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, img }),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setImg("");
  };

  // delete product
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <h2>🛒 Product Card List</h2>

      <div className="form">
        <input
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Enter Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <div className="card-list">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price}</p>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

//backend :-

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Fake DB (products)
let products = [
  { id: 1, name: "Laptop", price: "₹55,000", img: "https://via.placeholder.com/150" },
  { id: 2, name: "Headphones", price: "₹2,500", img: "https://via.placeholder.com/150" },
  { id: 3, name: "Smartphone", price: "₹30,000", img: "https://via.placeholder.com/150" },
  { id: 4, name: "Smartwatch", price: "₹8,000", img: "https://via.placeholder.com/150" },
];

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// ADD product
app.post("/products", (req, res) => {
  const { name, price, img } = req.body;
  const newProduct = { id: products.length + 1, name, price, img };
  products.push(newProduct);
  res.json(newProduct);
});

// DELETE product
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Product deleted" });
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));

// styling by css

body {
  font-family: Arial, sans-serif;
  background: #f7f7f7;
  margin: 0;
  padding: 0;
}

.container {
  text-align: center;
  padding: 20px;
}

.form {
  margin-bottom: 20px;
}

.form input {
  margin: 5px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.form button {
  padding: 8px 12px;
  background: #007bff;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.form button:hover {
  background: #0056b3;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background: #fff;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  border-radius: 10px;
}

.price {
  font-weight: bold;
  color: #2c7;
}

