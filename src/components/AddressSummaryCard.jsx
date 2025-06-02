export default function AddressSummaryCard({ address, handleSelectAddress }) {
  return (
    <div className="card mb-3">
      <div className="card-body hoverable" onClick={() => handleSelectAddress(address)}>
        <p className="card-text mb-0">First name: <span className="float-end">{address.firstName}</span></p>
        <p className="card-text mb-0">Last name: <span className="float-end">{address.lastName}</span></p>
        <p className="card-text mb-0">Phone number: <span className="float-end">{address.phone}</span></p>
        <p className="card-text mb-0">Street: <span className="float-end">{address.street}</span></p>
        <p className="card-text mb-0">City: <span className="float-end">{address.city}</span></p>
        <p className="card-text mb-0">State: <span className="float-end">{address.state}</span></p>
        <p className="card-text mb-0">Postcode: <span className="float-end">{address.postcode}</span></p>
        <p className="card-text mb-0">Country: <span className="float-end">{address.country}</span></p>
      </div>
    </div>
  );
}