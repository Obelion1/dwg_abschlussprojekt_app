import { useState } from 'react'
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Welcome from "./assets/components/Welcome.jsx";
import Cart from "./assets/components/Cart.jsx";
import Login from "./assets/components/Login.jsx";
import Products from "./assets/components/Products.jsx";

function App() {

  return (
    <>
    <div>
      <header>
        <h1>Online Shop!</h1>
      <nav>
        {/*Navbar buttons */}
        <Link to="/">Home (placeholder)</Link> |{" "}
        <Link to="/cart">Einkaufswagen</Link> |{" "}
        <Link to="/login">Einloggen</Link> |{" "}
        <Link to="/products">Produkte</Link>
      </nav>
      </header>

      {/*Navbar routes */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        </Routes>
    </div>

      <div>
       </div>
    </>
  )
}

export default App
