
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";


function PhotoCard({ title, id, imageUrl, onClick, orientation }) {
  return (

    <motion.div
      className={`
        w-full h-full overflow-hidden shadow-2xl cursor-pointer
        ${orientation === "wide" ? "[grid-column:span_2] [grid-row:span_2]" : ""}
        ${orientation === "tall" ? "[grid-row:span_2]" : ""}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      viewport={{ once: false, amount: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Card className="h-full rounded-lg overflow-hidden" onClick={onClick}>

        <CardContent className="p-0 h-full rounded-lg">
          <div className="relative w-full h-full group">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover  transform transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-45 transition-opacity duration-500 "></div>

            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {title}
            </div>
          </div>
        </CardContent>


      </Card>
    </motion.div >


  );
}

export default PhotoCard
