import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { Link } from "react-router-dom";

export default function CartPage({ cart }) {
  // Wait until cart is populated on page reload:
  if (!cart) return <p>Loading...</p>;
  
  return (
    <>
      <h1>Items in cart: {cart.lineItems.reduce((acc, curr) => acc + curr.quantity, 0)}</h1>
      <OrderSummary order={cart} />
      <div className="d-flex justify-content-center">
        <Link to={'/orders/checkout'} className="btn btn-primary mb-3">Proceed to Checkout</Link>
      </div>
    </>
  );
}