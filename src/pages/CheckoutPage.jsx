import { useState } from "react";

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
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleCheckout(address);
  }

  return (
    <>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First name:</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={address.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last name:</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={address.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone number:</label>
          <input type="text" className="form-control" id="phone" name="phone" value={address.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street:</label>
          <input type="text" className="form-control" id="street" name="street" value={address.street} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City:</label>
          <input type="text" className="form-control" id="city" name="city" value={address.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State:</label>
          <input type="text" className="form-control" id="state" name="state" value={address.state} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="postcode" className="form-label">Postcode:</label>
          <input type="text" className="form-control" id="postcode" name="postcode" value={address.postcode} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country:</label>
          <input type="text" className="form-control" id="country" name="country" value={address.country} onChange={handleChange} required />
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mb-3">Place Order</button>
        </div>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}