import PhotoCard from "./PhotoCard";

export default function PortfolioGrid({ photos, onPhotoClick}) {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
      {photos.map((photo, idx) => (
        <PhotoCard
          key={idx}
          id={photo.id}
          title={photo.title}
          imageUrl={photo.imageUrl}
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
}
