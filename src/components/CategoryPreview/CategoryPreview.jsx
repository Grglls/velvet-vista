import { Link } from "react-router-dom";
import ClothingItemCard from "../ClothingItemCard/ClothingItemCard";

export default function CategoryPreview({ category, clothes }) {
  return (
    <div className="mb-3">
      <Link to={`/category/${category}`} className="dropdown-item" ><h5 className="text-decoration-underline">{category}</h5></Link>
      <div className="row row-cols-3 p-2">
        {clothes.map((item, index) => index < 3 && <ClothingItemCard item={item} key={index} /> )}
      </div>
    </div>
  );
}