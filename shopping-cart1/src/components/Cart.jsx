import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../features/cartSlice";

export default function Cart() {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            {item.name} - ${item.price}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dispatch(removeItem(item.id))}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <h3>Total: ${total}</h3>
    </div>
  );
}
