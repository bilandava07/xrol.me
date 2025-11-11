import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";


import Autoplay from "embla-carousel-autoplay";


function PhotoCarousel({ photos, onPhotoClick }) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (

    <>
      <div className="pt-8 pb-3 text-center">
        <h1 className="pt-5 text-5xl font-bold my-4">Latest work</h1>
      </div>


      <div className="w-full overflow-hidden bg-transparent my-4">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
            speed: 20,
            duration: 60
          }}
          className="w-full mx-auto"
        >
          <div className="">
            <CarouselContent className="-ml-2 md:-ml-4">
              {photos.map((photo, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 pl-2 md:pl-4 cursor-pointer"
                  onClick={() => onPhotoClick(photo)}
                >
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={photo.imageUrl}
                      alt={`Carousel ${i}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>


          </div>


          {/* Left fade */}
          {/* <div className="absolute left-0 top-0 h-full w-3 pointer-events-none bg-gradient-to-r from-background/100 to-background/0"></div> */}

          {/* Right fade */}

          {/* <div className="absolute right-0 top-0 h-full w-3 pointer-events-none bg-gradient-to-l from-background/100 to-background/0"></div> */}

        </Carousel>
      </div>



    </>


  );
}

export default PhotoCarousel
