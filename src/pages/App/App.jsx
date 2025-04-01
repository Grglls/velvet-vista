import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage'
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/orders" element={ <OrderHistoryPage /> } />
        <Route path="/orders/new" element={ <NewOrderPage /> } />
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        {/* redirect to "/" if path in address bar hasn't matched a <Route> above */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  )
}
