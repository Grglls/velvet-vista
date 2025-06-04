import { useState, useEffect } from "react";
import * as ordersAPI from "../utilities/orders-api";
import OrderSummaryCard from "../components/OrderSummaryCard";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState(null);

  useEffect(function() {
    async function getOrders() {
      const orders = await ordersAPI.getAll();
      setOrders(orders);
    }
    getOrders();
  }, []);

  // Wait until orders are populated:
  if (!orders) return <p>Loading orders...</p>;

  return (
    <>
      <h1>Previous Orders</h1>
      {orders.length > 0 ? (
        <>
          {orders.map((order, index) => (
            <OrderSummaryCard order={order} key={index} />
          ))}
        </>
      ) : (
        <p>No previous orders found.</p>
      )}
    </>
  );
}