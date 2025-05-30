import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import CartPage from '../CartPage/CartPage';
import CheckoutPage from '../CheckoutPage/CheckoutPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import CategoryPage from '../CategoryPage/CategoryPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
import OrderDetailPage from '../OrderDetailPage/OrderDetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [clothesItems, setClothesItems] = useState([]);
  const categoriesRef = useRef([]);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setClothesItems(items);
    }
    getItems();
  }, []);

  useEffect(function() {
    if (!user) return; // Exit the effect if no user is logged in.
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, [user]);

  // ------------------- Event Handlers -------------------
  async function handleAddToCart(itemId, size, quantity) {
    // If user is not logged in, redirect to login page:
    if (!user) {
      navigate('/login');
      return;
    }
    const updatedCart = await ordersAPI.addItemToCart(itemId, size, quantity);
    setCart(updatedCart);
  }
  
  async function handleChangeQuantity(itemId, size, quantity) {
    console.log('handleChangeQuantity', itemId, size, quantity);
    
    const updatedCart = await ordersAPI.setItemQuantity(itemId, size, quantity);
    setCart(updatedCart);
  }

  async function handleCheckout(address) {
    await ordersAPI.checkout(address);
    navigate('/orders');
    // After checkout, reset to an empty cart:
    const cart = await ordersAPI.getCart();
    setCart(cart);
  }

  return (
    <>
      <NavBar user={user} setUser={setUser} categories={categoriesRef.current} cart={cart} />
      <div className="container-fluid mt-2" style={{"maxWidth": "1000px"}}>
        <Routes>
          <Route path="/" element={ <HomePage clothesItems={clothesItems} categories={categoriesRef.current} /> } />
          <Route path="/orders" element={user ? <OrderHistoryPage /> : <Navigate to="/login" /> } />
          <Route path="/orders/cart" element={user ? <CartPage cart={cart} handleChangeQuantity={handleChangeQuantity} /> : <Navigate to="/login" /> } />
          <Route path="/orders/checkout" element={user ? <CheckoutPage cart={cart} handleCheckout={handleCheckout} /> : <Navigate to="/login" /> } />
          <Route path="/orders/:orderId" element={user ? <OrderDetailPage /> : <Navigate to="/login" /> } />
          <Route path="/login" element={user ? <Navigate to="/" /> : <AuthPage setUser={setUser} />} />
          <Route path="/category/:categoryId" element={<CategoryPage clothesItems={clothesItems} />} />
          <Route path="/items/:itemId" element={<ItemDetailPage clothesItems={clothesItems} handleAddToCart={handleAddToCart} />} />
          {/* redirect to "/" if path in address bar hasn't matched a <Route> above */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}
