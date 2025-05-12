export default function LineItem({ lineItem }) {
  return (
    <tr>
      <td scope="row">
        <img src={lineItem.item.image} alt={lineItem.item.name} style={{"maxHeight": "80px"}} className="img-fluid me-2 d-block d-sm-inline" />
        {lineItem.item.name}
      </td>
      <td>{lineItem.size}</td>
      <td>{lineItem.quantity}</td>
      <td>${lineItem.item.price}</td>
      <td>${(lineItem.item.price * lineItem.quantity).toFixed(2)}</td>
    </tr>
  );
}