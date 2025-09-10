import { Link } from "react-router-dom";
import ClothingItemCard from "./ClothingItemCard";

export default function CategoryPreview({ category, clothes }) {
  return (
    <div className="mb-3">
      <Link
        to={`/category/${category}`}
        className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
      >
        <h5 className="d-inline-block mb-0 text-decoration-underline">
          {category}:
        </h5>
        <span className="d-inline-block">&nbsp;&nbsp;</span>
        <small>
          view all {category} &rarr;
        </small>
      </Link>
      <div className="row row-cols-3 p-2">
        {clothes.map((item, index) => index < 3 && <ClothingItemCard item={item} key={index} /> )}
      </div>
    </div>
  );
}