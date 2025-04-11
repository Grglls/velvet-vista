import { Link } from "react-router-dom";

export default function ClothingItemCard({ item }) {
  return (
    <div className="p-1">
      <Link
        to={`/items/${item._id}`}
        className="card h-100 p-0 focus-ring focus-ring-light link-light link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-offset-2"
      >
        <img src={item.image} className="card-img-top" alt={item.name} />
        <div className="card-body p-1">
          <p className="card-text mb-0"><small className="text-body-secondary">${item.price.toFixed(2)}</small></p>
          <p className="card-text">{item.name}</p>
        </div>
      </Link>
    </div>
  )
}