export default function OrderSummary({ order }) {
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
            <tr key={index}>
              <td scope="row">
                <img src={lineItem.item.image} alt={lineItem.item.name} style={{"maxHeight": "80px"}} className="img-fluid me-2 d-block d-sm-inline" />
                {lineItem.item.name}
              </td>
              <td>{lineItem.size}</td>
              <td>{lineItem.quantity}</td>
              <td>${lineItem.item.price}</td>
              <td>${(lineItem.item.price * lineItem.quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <th colSpan="4">Total</th>
            <th>${order.totalPrice.toFixed(2)}</th>
          </tr>
        </tbody>
      </table>
  );
}