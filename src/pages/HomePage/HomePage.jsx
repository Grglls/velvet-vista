import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";

export default function HomePage({ clothesItems, categories }) {
  console.log(categories);
  const clothesCats = categories.map(cat => 
    <CategoryPreview
      category={cat} 
      clothes={clothesItems.filter(item => item.category.name === cat)} 
    />
  );
  
  return (
    <div className="container-fluid">
      <h1>Home</h1>
      {clothesCats}
    </div>
  );
}