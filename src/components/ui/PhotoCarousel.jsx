import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

function PhotoCarousel({ photos, onPhotoClick }) {
  let latest_photos = photos.slice(0, 6);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      viewport={{ once: false, amount: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="pt-8 pb-3 text-center">
        <h1 className="pt-5 text-5xl font-bold my-4">Latest work</h1>
      </div>

      <div
        className="w-full overflow-hidden bg-transparent my-4"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
            speed: 20,
            duration: 60,
          }}
          className="w-full mx-auto"
        >
          <div className="">
            <CarouselContent className="-ml-2 md:-ml-4">
              {latest_photos.map((photo, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/4 pl-3 md:pl-3 lg:pl-6 cursor-pointer"
                  onClick={() => onPhotoClick(photo)}
                >
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl relative group">
                    {/* Image */}
                    <img
                      src={photo.imageUrl}
                      alt={`Carousel ${i}`}
                      className="object-cover w-full h-full rounded-xl transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-45 transition-opacity duration-500 rounded-xl"></div>

                    {/* Text overlay */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                      {photo.title}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </motion.div>
  );
}

export default PhotoCarousel;
