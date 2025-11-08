import { Card, CardContent } from "@/components/ui/card";


function PhotoCardOverlay({ photo }) {
  return (
      <Card className="overflow-hidden rounded-lg ">
        <CardContent className="p-0">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-auto object-cover"
          />
        </CardContent>
      </Card>
  );
}

export default PhotoCardOverlay
