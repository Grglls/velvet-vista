import CategoryPreview from "../components/CategoryPreview";

export default function HomePage({ clothesItems, categories }) {
  console.log(categories);
  const clothesCats = categories.map((cat, index) =>
    <CategoryPreview
      key={index}
      category={cat}
      clothes={clothesItems.filter(item => item.category.name === cat)}
    />
  );

  return (
    <>
      <h1>Home</h1>
      {clothesCats}
    </>
  );
}