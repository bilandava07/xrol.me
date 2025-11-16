import { CATEGORIES } from "@/constants/photo_categories";
import { SHORT_CATEGORIES } from "@/constants/short_photo_categories";
import PhotoCard from "./PhotoCard";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function PortfolioGrid({ photos, onPhotoClick }) {



  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);

  // Filter photos based on selected category
  // true means keep the photo, false means skip the photo
  const filteredPhotos = photos.filter((photo) =>
    selectedCategory === CATEGORIES.ALL
      ? true
      : photo.category === selectedCategory
  );




  return (
    <>
      <div>
        <div className="pt-2 md:pt-10 lg:pt-20 text-center">

          <h1 className="pt-5 text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Portfolio</h1>

          <div className='flex justify-center py-3 md:py-10 '>

            <div className="flex flex-wrap justify-center items-center text-base gap-x-5 gap-y-2  sm:gap-x-4 md:gap-x-3 lg:gap-x-10 text-center md:text-xl">
              {Object.keys(CATEGORIES).map((catKey) => (
                <li
                  key={catKey}
                  onClick={() => setSelectedCategory(CATEGORIES[catKey])}
                  className={`inline-block cursor-pointer hover:scale-105 transition-transform duration-200 ${selectedCategory === CATEGORIES[catKey] ? "text-foreground" : "text-foreground/60"
                    }`}
                >
                  <span className="block md:hidden">{SHORT_CATEGORIES[catKey]}</span>
                  <span className="hidden md:block">{CATEGORIES[catKey]}</span>
                </li>
              ))}
            </div>



          </div>
        </div>
      </div>

      <div className="
          grid
          gap-2
          md:gap-4
          lg:gap-7                
          grid-flow-dense
          [grid-template-columns:repeat(auto-fit,minmax(clamp(150px,20%,280px),1fr))]
          [grid-auto-rows:auto]
          box-border
          max-w-full
        ">
        <AnimatePresence>
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={`${photo.id}-${selectedCategory}`} // key changes when category changes
              id={photo.id}
              title={photo.title}
              imageUrl={photo.imageUrl}
              orientation={photo.orientation}
              onClick={() => onPhotoClick(photo)}
            />
          ))}
        </AnimatePresence>
      </div>



    </>

  );
}
