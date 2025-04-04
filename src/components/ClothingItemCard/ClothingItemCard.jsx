import { Link } from "react-router-dom";

export default function ClothingItemCard({ item }) {
  console.log(item);
  return (
    <div className="p-1">
      <Link to={`/items/${item._id}`} className="card p-0" >
        <img src={item.image} className="card-img-top" alt="..." />
        <div className="card-body p-1">
          <p className="card-text">{item.name}</p>
        </div>
      </Link>
    </div>
  )
}