export default function OrderSummaryCard({ order }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Order ID: {order.orderId}</h5>
        <p className="card-text">Items: <span className="float-end">{order.totalQuantity}</span></p>
        <p className="card-text">Total: <span className="float-end">${order.totalPrice.toFixed(2)}</span></p>
        <p className="card-text">Date ordered: <span className="float-end">{new Date(order.createdAt).toLocaleDateString()}</span></p>
      </div>
    </div>
  );
}