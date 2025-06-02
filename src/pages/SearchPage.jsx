import { useParams } from "react-router-dom";
import ClothingItemCard from "../components/ClothingItemCard";

export default function SearchPage({ searchResults }) {
  const searchTerm = useParams().searchTerm;

  return (
    <>
      <h1>Search Results</h1>
      <h3>Showing results for: "{searchTerm}"</h3>
      {searchResults.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 p-2">
          { searchResults.map((item, index) => <ClothingItemCard item={item} key={index} /> ) }
        </div>
      ) : (
        <p>We couldn't find anything matching your request...</p>
      )}
    </>
  )
}