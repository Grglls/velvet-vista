import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage'
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import * as itemsAPI from '../../utilities/items-api';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [clothesItems, setClothesItems] = useState([]);
  const categoriesRef = useRef([]);

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setClothesItems(items);
    }
    getItems();
  }, []);

  return (
    <main className="">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={ <HomePage clothesItems={clothesItems} categories={categoriesRef.current} /> } />
        <Route path="/orders" element={ <OrderHistoryPage /> } />
        <Route path="/orders/new" element={ <NewOrderPage /> } />
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        {/* redirect to "/" if path in address bar hasn't matched a <Route> above */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  )
}
