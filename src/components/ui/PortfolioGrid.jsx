import { CATEGORIES } from "@/constants/photo_categories";
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
        <div className="pt-20 text-center">

          <h1 className="pt-5 text-5xl font-bold mb-4">Portfolio</h1>

          <div className='flex justify-center py-10 '>

            <div className="hidden md:flex items-center space-x-10 text-xl">
              {Object.values(CATEGORIES).map((cat) => (
                <li
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-block cursor-pointer hover:scale-105 transition-transform duration-200 ${selectedCategory === cat
                    ? " text-foreground" // Highlight active category
                    : "text-foreground/60"
                    }`}
                >
                  {cat}
                </li>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-2 lg:gap-6 py-6">
        <AnimatePresence>
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={`${photo.id}-${selectedCategory}`} // key changes when category changes
              id={photo.id}
              title={photo.title}
              imageUrl={photo.imageUrl}
              onClick={() => onPhotoClick(photo)}
            />
          ))}
        </AnimatePresence>
      </div>



    </>

  );
}
