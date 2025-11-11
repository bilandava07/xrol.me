import { animate, scale } from 'framer-motion';
import React from 'react';

import { motion } from "framer-motion";

function HeroSection({ imageUrl, title }) {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background image as motion div */}
            <motion.div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${imageUrl})` }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }} // slightly zoom in
                transition={{ duration: 5, ease: "easeOut" }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Centered text */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <motion.div
                    initial={{ opacity: 0 }}            
                    whileInView={{ opacity: 1 }}       
                    transition={{ duration: 5, ease: "easeOut" }} 
                >
                    <h1 className="text-white/75 text-4xl sm:text-5xl md:text-6xl font-bold text-center px-4">
                        {title}
                    </h1>
                </motion.div>
            </div>



        </section >


    );
}

export default HeroSection
