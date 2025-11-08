
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";


function PhotoCard({ title, id, imageUrl, layoutId, onClick }) {
  return (


    <motion.div
      layoutId={layoutId}   // Animate the whole card
    >



      <Card className="w-auto overflow-hidden aspect-w-16 aspect-h-9 shadow-2xl"
        onClick={onClick}
      >
        <CardContent className="p-0 ">
          <div className="relative group">
            {/* Image */}
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto object-cover overflow-hidden rounded-lg transform transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-45 transition-opacity duration-500 rounded-lg"></div>

            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg">
              {title}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default PhotoCard
