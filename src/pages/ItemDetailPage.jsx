import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ItemDetailPage({ clothesItems, handleAddToCart }) {
  const itemId = useParams().itemId;
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Wait until clothesItems is populated:
  if (!clothesItems.length) return <p>Loading...</p>;

  const item = clothesItems.find(item => item._id === itemId);

  // Handle case where item is not found:
  if (!item) return <p>Item not found.</p>;

  function handleSubmit(event) {
    event.preventDefault();
    handleAddToCart(item._id, size, quantity);
  }

  return (
    <>
      <h1>{item.name}</h1>
      <div className="row row-cols-1 row-cols-sm-2 p-2">
        <div className="mb-3">
          <img src={item.image} className="card-img-top" alt={item.name} />
        </div>
        <div className="mb-3">
          <p>Price: ${item.price}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="size" className="form-label">Size:</label>
              <select id="size" className="form-select" name="size" value={size} onChange={(event) => setSize(event.target.value)} required >
                <option value="">Select Size</option>
                {item.sizes.map((size, index) => (
                  <option value={size} key={index}>{size}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <select id="quantity" className="form-select" name="quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add to Cart</button>
          </form>
        </div>
      </div>
    </>
  );
}