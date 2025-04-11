import OrderSummary from "../../components/OrderSummary/OrderSummary";

export default function CartPage({ cart }) {
  // Wait until cart is populated on page reload:
  if (!cart) return <p>Loading...</p>;
  
  return (
    <>
      <h1>Items in cart: {cart.lineItems.reduce((acc, curr) => acc + curr.quantity, 0)}</h1>
      <OrderSummary order={cart} />
    </>
  );
}