import { useParams } from 'react-router-dom';

export default function ItemDetailPage({ clothesItems }) {
  const itemId = useParams().itemId;

  // Wait until clothesItems is populated:
  if (!clothesItems.length) return <p>Loading...</p>;

  const item = clothesItems.find(item => item._id === itemId);

  // Handle case where item is not found:
  if (!item) return <p>Item not found.</p>;

  return (
    <>
      <h1>{item.name}</h1>
      <div className="row row-cols-1 row-cols-sm-2 p-2">
        <div className="mb-3">
          <img src={item.image} className="card-img-top" alt={item.name} />
        </div>
        <div className="mb-3">
          <p>Price: ${item.price}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </>
  );
}