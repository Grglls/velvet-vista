import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage'
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import CategoryPage from '../CategoryPage/CategoryPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
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
      <NavBar user={user} setUser={setUser} categories={categoriesRef.current} />
      <div className="container-fluid mt-2" style={{"maxWidth": "1000px"}}>
        <Routes>
          <Route path="/" element={ <HomePage clothesItems={clothesItems} categories={categoriesRef.current} /> } />
          <Route path="/orders" element={ <OrderHistoryPage /> } />
          <Route path="/orders/new" element={ <NewOrderPage /> } />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route path="/category/:categoryId" element={<CategoryPage clothesItems={clothesItems} />} />
          <Route path="/items/:itemId" element={<ItemDetailPage clothesItems={clothesItems} />} />
          {/* redirect to "/" if path in address bar hasn't matched a <Route> above */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </main>
  )
}
