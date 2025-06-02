import { useState, useEffect } from "react";
import * as ordersAPI from "../utilities/orders-api";
import AddressForm from "../components/AddressForm";
import AddressSummaryCard from "../components/AddressSummaryCard";

export default function CheckoutPage({ handleCheckout }) {
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
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState(null);

  useEffect(function() {
    async function getAddresses() {
      const addresses = await ordersAPI.getAddresses();
      setAddresses(addresses);
    }
    getAddresses();
  }, []);

  // Wait until addresses are populated:
  if (!addresses) return <p>Loading addresses...</p>;
  
  function handleChange(event) {
    setAddress({ ...address, [event.target.name]: event.target.value });
    setError('');
  };

  function handleSelectAddress(selectedAddress) {
    setAddress(selectedAddress);
    setError('');
    setShowAddressForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleCheckout(address);
  }

  return (
    <>
      <h1>Checkout</h1>
      <div className="btn-group mb-3 w-100" role="group">
        <button 
          className={showAddressForm ? "btn btn-primary" : "btn btn-outline-primary"}
          onClick={() => setShowAddressForm(true)}
        >
          Enter new address
        </button>
        <button 
          className={!showAddressForm ? "btn btn-primary" : "btn btn-outline-primary"}
          onClick={() => setShowAddressForm(false)}
        >
          Use previous address
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {showAddressForm ? 
          <>
            <AddressForm address={address} handleChange={handleChange} />
            <div className="mb-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mb-3">Place Order</button>
            </div>
          </>
          :
          <>
            <h3 className="mb-3">Select an address:</h3>
            {addresses.length > 0 ? (
              <>
                {addresses.map((address, index) => (
                  <AddressSummaryCard
                    address={address}
                    handleSelectAddress={handleSelectAddress}
                    key={index}
                  />
                ))}
              </>
            ) : (
              <p>No previous addresses found.</p>
            )}
          </>
        }
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}