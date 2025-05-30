export default function AddressTabulated({ address }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Shipping Address</h5>
        <p className="card-text">First name: <span className="float-end">{address.firstName}</span></p>
        <p className="card-text">Last name: <span className="float-end">{address.lastName}</span></p>
        <p className="card-text">Phone number: <span className="float-end">{address.phone}</span></p>
        <p className="card-text">Street: <span className="float-end">{address.street}</span></p>
        <p className="card-text">City: <span className="float-end">{address.city}</span></p>
        <p className="card-text">State: <span className="float-end">{address.state}</span></p>
        <p className="card-text">Postcode: <span className="float-end">{address.postcode}</span></p>
        <p className="card-text">Country: <span className="float-end">{address.country}</span></p>
      </div>
    </div>
  );
}