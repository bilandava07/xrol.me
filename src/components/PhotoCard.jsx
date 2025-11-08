

// function PhotoCard ({photo}) {

//     function onFavoriteClick () {
//         alert("Favorite clicked!")
//     }

//     return (

//         <>
//             <div className="photo-card">
//                 <div className="photo-image">
//                     <img src={photo.url} alt={photo.title} />
//                     <div className="photo-overlay">
//                         <button className="favorite-btn" onClick={onFavoriteClick}>❤️</button>
//                     </div>

//                 </div>

//                 <div className="photo-info"> 
//                     <h3 className="photo-title">{photo.title}</h3>
//                     <p className="photo-date">{photo.date}</p>
//                 </div>


//             </div>
//         </>


//     );

// }


import { Card, CardContent } from "@/components/ui/card";

function PhotoCard({ title, imageUrl }) {
  return (
    <Card className="w-auto overflow-hidden shadow-2xl ">
      <CardContent className="p-0">
        <div className="relative group">
          {/* Image */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg transform transition-transform duration-700 group-hover:scale-110"
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
  );
}

export default PhotoCard;