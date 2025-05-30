import { useState } from "react";
import AddressForm from "../components/AddressForm";

export default function CheckoutPage({ cart, handleCheckout }) {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });
  const [error, setError] = useState('');
  
  // Wait until cart is populated on page reload:
  if (!cart) return <p>Loading...</p>;
  
  function handleChange(event) {
    setAddress({ ...address, [event.target.name]: event.target.value });
    setError('');
    console.log(address);
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleCheckout(address);
  }

  return (
    <>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <AddressForm address={address} handleChange={handleChange} />
        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mb-3">Place Order</button>
        </div>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}