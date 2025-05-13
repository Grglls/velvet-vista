import LineItem from "../LineItem/LineItem";

export default function OrderSummary({ order, handleChangeQuantity }) {
  return (
    <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Size</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.lineItems.map((lineItem, index) => (
            <LineItem key={index} lineItem={lineItem} handleChangeQuantity={handleChangeQuantity} />
          ))}
          <tr>
            <th colSpan="4">Total</th>
            <th>${order.totalPrice.toFixed(2)}</th>
          </tr>
        </tbody>
      </table>
  );
}