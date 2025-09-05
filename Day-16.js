//task-16 of hackathon ...
//backend :-
// server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// In-memory DB
let products = [
  { id: 1, name: "Basic Laptop", price: 55000, img: "https://via.placeholder.com/300x200?text=Laptop" },
  { id: 2, name: "Headphones", price: 2500, img: "https://via.placeholder.com/300x200?text=Headphones" },
  { id: 3, name: "Smartphone", price: 30000, img: "https://via.placeholder.com/300x200?text=Phone" },
  { id: 4, name: "Smartwatch", price: 8000, img: "https://via.placeholder.com/300x200?text=Watch" }
];

let orders = [];
let nextProductId = products.length + 1;
let nextOrderId = 1;

// Products
app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const { name, price, img } = req.body;
  const p = { id: nextProductId++, name, price: Number(price), img: img || "https://via.placeholder.com/300x200?text=Product" };
  products.push(p);
  res.status(201).json(p);
});
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: "deleted" });
});

// Checkout (simulate order save)
app.post("/api/checkout", (req, res) => {
  const { items, customer } = req.body; // items = [{id, qty, price, name}, ...]
  if (!items || !items.length) return res.status(400).json({ message: "Cart empty" });

  const order = { id: nextOrderId++, items, customer: customer || {}, total: items.reduce((s,i)=>s+i.price*i.qty,0), createdAt: new Date() };
  orders.push(order);
  res.status(201).json({ message: "Order placed", orderId: order.id });
});

// Simple admin read of orders
app.get("/api/orders", (req, res) => res.json(orders));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on http://localhost:" + PORT));

// frontend :-

import React from "react";
import Store from "./Store";
import "./App.css";

export default function App(){
  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">Hydrian Store</div>
        <div className="desc">Simple Full-Stack Demo</div>
      </header>
      <Store />
      <footer className="footer">Built for demo • Not production</footer>
    </div>
  );
}

import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

function useFetchProducts(){
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch(e){ console.error(e) }
  };
  useEffect(()=> fetchProducts(), []);
  return { products, setProducts, fetchProducts };
}

export default function Store(){
  const { products, setProducts, fetchProducts } = useFetchProducts();
  const [cart, setCart] = useState(()=> {
    try { return JSON.parse(localStorage.getItem("cart_v1")) || []; } catch { return []; }
  });
  const [form, setForm] = useState({ name: "", price: "", img: "" });
  const [message, setMessage] = useState("");

  useEffect(()=> localStorage.setItem("cart_v1", JSON.stringify(cart)), [cart]);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if(ex) return prev.map(i => i.id === p.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id===id? {...i, qty: Math.max(1,i.qty+delta)}: i));
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);

  const submitProduct = async () => {
    if(!form.name || !form.price) return setMessage("Name & price required");
    const res = await fetch(`${API}/products`, {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name: form.name, price: form.price, img: form.img })
    });
    if(res.ok){
      setForm({ name: "", price: "", img: ""});
      fetchProducts();
      setMessage("Product added");
      setTimeout(()=>setMessage(""), 2000);
    } else setMessage("Failed");
  };

  const checkout = async () => {
    if(!cart.length) return setMessage("Cart empty");
    setMessage("Placing order...");
    const res = await fetch(`${API}/checkout`, {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ items: cart, customer: { name: "Guest" } })
    });
    const data = await res.json();
    if(res.ok){
      setCart([]);
      setMessage(`Order #${data.orderId} placed`);
    } else setMessage(data.message || "Checkout failed");
    setTimeout(()=>setMessage(""), 4000);
  };

  const deleteProduct = async (id) => {
    if(!window.confirm("Delete product?")) return;
    await fetch(`${API}/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="store-wrap">
      <div className="left">
        <section className="add-product card">
          <h3>Add Product (Admin)</h3>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
          <input placeholder="Image URL (optional)" value={form.img} onChange={e=>setForm({...form,img:e.target.value})} />
          <div className="row">
            <button onClick={submitProduct}>Add</button>
            <button onClick={()=>{ setForm({name:"",price:"",img:""}); setMessage(""); }}>Clear</button>
            <div className="msg">{message}</div>
          </div>
        </section>

        <section className="product-list">
          <h3>Products</h3>
          <div className="grid">
            {products.map(p => (
              <div className="card product-card" key={p.id}>
                <img src={p.img} alt={p.name} />
                <h4>{p.name}</h4>
                <div className="price">₹{p.price.toLocaleString()}</div>
                <div className="actions">
                  <button onClick={()=>addToCart(p)}>Add to Cart</button>
                  <button className="danger" onClick={()=>deleteProduct(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="right card">
        <h3>Cart</h3>
        {cart.length === 0 ? <div className="empty">Cart is empty</div> : (
          <div>
            {cart.map(i=>(
              <div className="cart-item" key={i.id}>
                <div className="ci-left">
                  <div className="ci-name">{i.name}</div>
                  <div className="ci-price">₹{i.price} x {i.qty} = ₹{i.price*i.qty}</div>
                </div>
                <div className="ci-controls">
                  <button onClick={()=>changeQty(i.id, -1)}>-</button>
                  <button onClick={()=>changeQty(i.id, +1)}>+</button>
                  <button className="danger" onClick={()=>removeFromCart(i.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="total">Total: ₹{total.toLocaleString()}</div>
            <button className="checkout" onClick={checkout}>Checkout</button>
          </div>
        )}
      </aside>
    </div>
  );
}

/* App.css - simple neat style */
:root{
  --bg:#f4f7fb; --card:#ffffff; --accent:#0b6efd; --muted:#6b7280; --danger:#e44;
}
*{box-sizing:border-box;font-family:Inter,Arial,Helvetica,sans-serif}
body,html,#root{height:100%;margin:0;background:var(--bg)}
.app-root{min-height:100vh;display:flex;flex-direction:column}
.topbar{background:#03203c;color:white;padding:16px 20px;display:flex;align-items:center;gap:16px}
.topbar .brand{font-weight:800;font-size:20px}
.topbar .desc{opacity:.9;font-size:13px}

.store-wrap{display:flex;gap:18px;padding:20px;flex:1}
.left{flex:1}
.right{width:340px}

.card{background:var(--card);border-radius:10px;padding:14px;box-shadow:0 6px 18px rgba(10,20,30,.06)}
.add-product input{display:block;width:100%;padding:8px;margin:8px 0;border-radius:6px;border:1px solid #ddd}
.add-product .row{display:flex;gap:8px;align-items:center}
.add-product button{padding:8px 12px;border:none;background:var(--accent);color:white;border-radius:8px;cursor:pointer}
.add-product button:last-child{background:#666}
.add-product .msg{margin-left:8px;color:var(--muted)}

.product-list h3, .add-product h3, .right h3{margin:0 0 10px 0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.product-card img{width:100%;height:120px;object-fit:cover;border-radius:8px}
.product-card h4{margin:8px 0 4px 0}
.price{font-weight:700;color:var(--accent)}
.actions{display:flex;gap:8px;margin-top:8px}
.actions button{flex:1;padding:8px;border-radius:8px;border:none;cursor:pointer}
.actions .danger{background:#eee;color:var(--danger);}

.right .empty{color:var(--muted);padding:12px}
.cart-item{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f0f0f0}
.ci-name{font-weight:600}
.ci-price{font-size:13px;color:var(--muted)}
.ci-controls button{margin-left:6px;padding:6px 8px;border-radius:6px;border:none;cursor:pointer}
.ci-controls .danger{background:#ffeaea;color:var(--danger);}

.total{font-weight:800;margin-top:10px}
.checkout{margin-top:10px;padding:10px 14px;border-radius:8px;background:#0f9d58;color:white;border:none;cursor:pointer;width:100%}

.footer{padding:12px;text-align:center;color:var(--muted);font-size:13px}
@media(max-width:900px){
  .store-wrap{flex-direction:column}
  .right{width:100%}
}





