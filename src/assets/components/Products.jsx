import { useState, useEffect } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get the logged in user on load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const response = await fetch('http://localhost:3001/api/auth/check', {
      credentials: 'include'
    });
    const data = await response.json();
    
    if (data.loggedIn) {
      setUser(data.user);
      fetchProducts(); // Only fetch products if logged in
    }
  };

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/api/products');
    const data = await response.json();
    setProducts(data);
  };

  // Show message if not logged in
  if (!user) {
    return (
      <div className="products-container">
        <h1>Shop</h1>
        <p>Bitte einloggen zum Einkaufen</p>
      </div>
    );
  }

  return (
    <>
      <div className="products-container">
        <h1>Shop</h1>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.short_description}</p>
              <p className="price">${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
  
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            <img src={selectedProduct.image_url} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p className="price">${selectedProduct.price}</p>
            <p>{selectedProduct.full_description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;