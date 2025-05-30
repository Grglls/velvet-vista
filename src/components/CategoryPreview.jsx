import { Link } from "react-router-dom";
import ClothingItemCard from "./ClothingItemCard";

export default function CategoryPreview({ category, clothes }) {
  return (
    <div className="mb-3">
      <Link to={`/category/${category}`} className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" >
        <h5 className="text-decoration-underline d-inline-block">{category}:</h5>
      </Link>
      <div className="row row-cols-3 p-2">
        {clothes.map((item, index) => index < 3 && <ClothingItemCard item={item} key={index} /> )}
      </div>
    </div>
  );
}