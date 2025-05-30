import { useParams } from "react-router-dom";
import ClothingItemCard from "../../components/ClothingItemCard";

export default function CategoryPage({ clothesItems }) {
  const category = useParams().categoryId;
  const categoryItems = clothesItems.filter(item => item.category.name === category);

  return (
    <>
      <h1>{category}</h1>
      <div className="row row-cols-2 row-cols-sm-3 p-2">
        { categoryItems.map((item, index) => <ClothingItemCard item={item} key={index} /> ) }
      </div>
    </>
  )
}