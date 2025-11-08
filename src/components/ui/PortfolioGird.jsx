import PhotoCard from "./PhotoCard";

export default function PortfolioGrid({ photos, selectedPhoto, onPhotoClick}) {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {photos.map((photo, idx) => (
        <PhotoCard
          key={idx}
          id={photo.id}
          title={photo.title}
          imageUrl={photo.imageUrl}
          hidden={selectedPhoto?.id === photo.id}
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
}
