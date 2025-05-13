export default function LineItem({ lineItem, handleChangeQuantity }) {
  return (
    <tr>
      <td scope="row">
        <img src={lineItem.item.image} alt={lineItem.item.name} style={{"maxHeight": "80px"}} className="img-fluid me-2 d-block d-sm-inline" />
        {lineItem.item.name}
      </td>
      <td>{lineItem.size}</td>
      <td>
        <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() => handleChangeQuantity(lineItem.item._id, lineItem.size, lineItem.quantity + 1)}
          >+</button>
          <span className="btn btn-outline-secondary" style={{"textAlign": "center", "color": "white"}}>{lineItem.quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() => handleChangeQuantity(lineItem.item._id, lineItem.size, lineItem.quantity - 1)}
          >-</button>
        </div>
      </td>
      <td>${lineItem.item.price}</td>
      <td>${(lineItem.item.price * lineItem.quantity).toFixed(2)}</td>
    </tr>
  );
}