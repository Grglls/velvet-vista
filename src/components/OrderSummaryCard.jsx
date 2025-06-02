import { Link } from "react-router-dom";

export default function OrderSummaryCard({ order }) {
  return (
    <Link
    to={`/orders/${order._id}`}
    className="card mb-3 focus-ring focus-ring-light link-light link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-offset-2"
    >
      <div className="card-body">
        <h5 className="card-title">Order ID: {order.orderId}</h5>
        <p className="card-text">Items: <span className="float-end">{order.totalQuantity}</span></p>
        <p className="card-text">Total: <span className="float-end">${order.totalPrice.toFixed(2)}</span></p>
        <p className="card-text">Date ordered: <span className="float-end">{new Date(order.updatedAt).toLocaleDateString()}</span></p>
      </div>
    </Link>
  );
}