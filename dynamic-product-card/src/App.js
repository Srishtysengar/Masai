import React, { useState } from "react";
import ProductCard from "./ProductCard";

function App() {
  const [products, setProducts] = useState([
    {
      name: "Smartphone",
      price: 25000,
      image: "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1694605258",
      discount: 10,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    discount: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.image.startsWith("http")) {
      newErrors.image = "Image must be a valid URL (starting with http)";
    }

    if (formData.discount) {
      if (
        isNaN(formData.discount) ||
        Number(formData.discount) < 0 ||
        Number(formData.discount) > 100
      ) {
        newErrors.discount = "Discount must be a number between 0 and 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setProducts([
        ...products,
        {
          name: formData.name,
          price: Number(formData.price),
          image: formData.image,
          discount: formData.discount ? Number(formData.discount) : undefined,
        },
      ]);
      setFormData({ name: "", price: "", image: "", discount: "" });
      setErrors({});
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Product List</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Add a New Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.name}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Price: </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          {errors.price && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.price}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL: </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          {errors.image && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.image}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Discount (%): </label>
          <input
            type="number"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: e.target.value })
            }
          />
          {errors.discount && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.discount}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default App;
