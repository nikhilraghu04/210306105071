import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', minPrice: 0, maxPrice: 10000 });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    const response = await axios.get(`http://20.244.56.144/test/companies/CompanyA/categories/${filters.category}/products/top-10?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`);
    setProducts(response.data.products);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Top N Products</h1>
      <div className="filters">
        <input type="text" name="category" value={filters.category} onChange={handleFilterChange} placeholder="Category" />
        <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min Price" />
        <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max Price" />
      </div>
      <div className="products">
        {products.map(product => (
          <div key={product.productName} className="product-card">
            <h2>{product.productName}</h2>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
