import { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Fetch cart when component loads
  useEffect(() => {
    fetchCart();
  }, []);

  // GET cart from API
  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/cart', {
        credentials: 'include'  // Important! Sends session cookie
      });
      const data = await response.json();
      
      if (response.ok) {
        setCart(data.cart);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to load cart');
    }
  };

  // Increase quantity
  const increaseQuantity = async (productId) => {
    const item = cart.find(item => item.productId === productId);
    if (!item) return;

    try {
      const response = await fetch('http://localhost:3001/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          productId, 
          quantity: item.quantity + 1 
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      }
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId) => {
    const item = cart.find(item => item.productId === productId);
    if (!item || item.quantity <= 1) return;

    try {
      const response = await fetch('http://localhost:3001/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          productId, 
          quantity: item.quantity - 1 
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      }
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/remove/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      }
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  // Handle order
  const handleOrder = () => {
    // TODO: Add order API endpoint later
    alert('Bestellung abgeschickt!');
    setShowCheckout(false);
    // Clear cart after order
    setCart([]);
  };

  // Calculate total
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Einkaufswagen</h2>
          {cart.length > 0 && (
            <button 
              onClick={() => setShowCheckout(true)}
              style={{
                padding: '10px 30px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Zur Kasse
            </button>
          )}
        </div>
        
        {cart.length === 0 ? (
          <p>Einkaufswagen ist leer</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.productId} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                <h3>{item.name}</h3>
                <p>Preis: {item.price}€</p>
                
                <div>
                  <button onClick={() => decreaseQuantity(item.productId)}>-</button>
                  <span> Menge: {item.quantity} </span>
                  <button onClick={() => increaseQuantity(item.productId)}>+</button>
                </div>
                
                <p>Zwischensumme: {(item.price * item.quantity).toFixed(2)}€</p>
                <button onClick={() => removeItem(item.productId)}>Entfernen</button>
              </div>
            ))}
            
            <h3>Gesamt: {totalPrice.toFixed(2)}€</h3>
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowCheckout(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowCheckout(false)}
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            
            <h2>Bestellübersicht</h2>
            
            <div style={{ marginTop: '20px' }}>
              {cart.map(item => (
                <div key={item.productId} style={{ 
                  padding: '10px 0', 
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <strong>{item.name}</strong>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      {item.quantity}x {item.price}€
                    </p>
                  </div>
                  <div style={{ fontWeight: 'bold' }}>
                    {(item.price * item.quantity).toFixed(2)}€
                  </div>
                </div>
              ))}
              
              <div style={{ 
                marginTop: '20px', 
                padding: '15px 0',
                borderTop: '2px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                <span>Gesamtsumme:</span>
                <span>{totalPrice.toFixed(2)}€</span>
              </div>
            </div>
            
            <button
              onClick={handleOrder}
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '18px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Jetzt bestellen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;