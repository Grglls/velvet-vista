import { Link } from "react-router-dom";
import CategoryPreviewCard from "../CategoryPreviewCard/CategoryPreviewCard";

export default function CategoryPreview({ category, clothes }) {
  return (
    <div className="mb-3">
      <Link to={`/products/${category}`} className="dropdown-item" ><h5 className="text-decoration-underline">{category}</h5></Link>
      <div className="row row-cols-3 p-2">
        {clothes.map((item, index) => index < 3 && <CategoryPreviewCard item={item} key={index} /> )}
      </div>
    </div>
  );
}