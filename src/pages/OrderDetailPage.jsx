import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as ordersAPI from '../utilities/orders-api';
import OrderTabulated from '../components/OrderTabulated';
import AddressTabulated from '../components/AddressTabulated';

export default function OrderDetailPage() {
  const orderId = useParams().orderId;
  const [order, setOrder] = useState(null);

  useEffect(function() {
    async function getOrder() {
      const order = await ordersAPI.getOne(orderId);
      setOrder(order);
    }
    getOrder();
  }, [orderId]);

  // Wait until order is populated:
  if (!order) return <p>Loading...</p>;

  console.log('OrderDetailPage', order.address);

  return (
    <>
      <h1>Order Details</h1>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Order ID: {order.orderId}</h5>
          <p className="card-text">Items: <span className="float-end">{order.totalQuantity}</span></p>
          <p className="card-text">Total: <span className="float-end">${order.totalPrice.toFixed(2)}</span></p>
          <p className="card-text">Date ordered: <span className="float-end">{new Date(order.createdAt).toLocaleDateString()}</span></p>
        </div>
      </div>
      <AddressTabulated address={order.address} />
      <OrderTabulated order={order} />
    </>
  );
}