import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Redux Toolkit Shopping Cart</h1>
      <ProductList />
      <Cart />
    </div>
  );
}
