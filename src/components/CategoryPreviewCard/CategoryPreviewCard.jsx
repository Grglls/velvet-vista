export default function CategoryPreviewCard({ item }) {
  return (
    <div className="p-1">
      <div className="card p-0">
        <img src={item.image} className="card-img-top" alt="..." />
        <div className="card-body p-1">
          <p className="card-text">{item.name}</p>
        </div>
      </div>
    </div>
  )
}