import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function MotionCarousel({ photos, speed = 14 }) {
    const ref = useRef(null);

    let lastTime = null;

    useAnimationFrame((t) => {
        if (!ref.current) return;

        if (lastTime === null) lastTime = t; // first frame
        const delta = t - lastTime;
        lastTime = t;

        ref.current.scrollLeft += (speed * delta) / 200;
        if (ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
            ref.current.scrollLeft = 0;
        }
    });


    return (
        <div ref={ref} className="flex overflow-x-hidden whitespace-nowrap ">
            {photos.concat(photos).map((photo, i) => (
                <img
                    key={i}
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-80 md:w-1/3 h-auto object-cover rounded-xl mx-3"
                />
            ))}
        </div>
    );
}
