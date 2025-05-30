export default function AddressForm({ address, handleChange }) {
  return (
    <>
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
    </>
  );
}