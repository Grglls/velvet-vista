import { useState, useEffect } from "react";
import * as ordersAPI from "../../utilities/orders-api";
import OrderSummaryCard from "../../components/OrderSummaryCard";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  
  useEffect(function() {
    async function getOrders() {
      const orders = await ordersAPI.getAll();
      setOrders(orders);
    }
    getOrders();
  }, []);
  
  // Wait until orders are populated:
  if (!orders) return <p>Loading...</p>;
  
  return (
    <>
      <h1>Previous Orders</h1>
      <div>{orders.map((order, index) => <OrderSummaryCard key={index} order={order} />)}</div>
    </>
  );
}