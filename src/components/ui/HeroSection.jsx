import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

function HeroSection({ imageUrl, title }) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload the image
    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setIsLoaded(true);
    }, [imageUrl]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background image as motion div */}
            <motion.div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: "right bottom" // focus on bottom-right
                }}
                initial={{ scale: 1 }}
                animate={isLoaded ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 5, ease: "easeOut" }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Centered text */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 5, ease: "easeOut" }}
                >
                    <h1 className="text-white/75 text-4xl sm:text-5xl md:text-6xl font-bold text-center px-4">
                        {title}
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;
