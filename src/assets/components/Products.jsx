import { useState, useEffect } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');

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

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const response = await fetch('http://localhost:3001/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          productId: product.product_id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`${product.name} zum Warenkorb hinzugefügt!`);
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage(`Fehler: ${data.error}`);
      }
    } catch (err) {
      setMessage('Fehler beim Hinzufügen');
    }
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
        
        {message && <div style={{ color: 'green', padding: '10px', marginBottom: '10px' }}>{message}</div>}
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.product_id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.short_description}</p>
              <p className="price">{product.price}€</p>
              <button onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening
                addToCart(product);
              }}>
                In den Einkaufswagen
              </button>
            </div>
          ))}
        </div>
      </div>
  
      {/*modal overlay for popout detail view*/}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            <img src={selectedProduct.image_url} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p className="price">{selectedProduct.price}€</p>
            <p>{selectedProduct.full_description}</p>
            <button onClick={() => {
              addToCart(selectedProduct);
              setSelectedProduct(null); // Close modal after adding
            }}>
              In den Einkaufswagen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;