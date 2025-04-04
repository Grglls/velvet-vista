import { useParams } from 'react-router-dom';

export default function ItemDetailPage({ clothesItems }) {
  const itemId = useParams().itemId;
  const item = clothesItems.find(item => item._id === itemId);

  return (
    <>
      <h1>{item.name}</h1>
      <div className="row row-cols-3 p-2">
        <div className="col">
          <img src={item.image} className="card-img-top" alt={item.name} />
        </div>
        <div className="col">
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </>
  );
}