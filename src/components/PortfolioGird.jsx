import PhotoCard from "./PhotoCard";

export default function PortfolioGrid() {
  const photos = [
    {
      title: "Neuschwanstein",
      imageUrl: "/images/IMG_9264.JPG",
    },
    {
      title: "Tegernsee",
      imageUrl: "/images/C7AC92DE-97BF-4CD3-827F-2865CF38F3EE.PNG",
    },
    {
        title: "Alps",
        imageUrl: "/images/9E4F17FF-55B9-4643-A2F4-7050369FB8CD.PNG",
    }



  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {photos.map((photo, idx) => (
        <PhotoCard
          key={idx}
          title={photo.title}
          description={photo.description}
          imageUrl={photo.imageUrl}
        />
      ))}
    </div>
  );
}
