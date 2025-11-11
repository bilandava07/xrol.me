
import PortfolioGrid from '@/components/ui/PortfolioGird';
import PhotoCard from '@/components/ui/PhotoCard'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import PhotoCardOverlay from '@/components/ui/PhotoCardOverlay';

import { createPortal } from "react-dom";

import photos from "/data/photos.js";
import HeroSection from '@/components/ui/HeroSection';
import Navbar from '@/components/ui/NavBar';
import PhotoCarousel from '@/components/ui/PhotoCarousel';
import MotionCarousel from '@/components/ui/MotionCarousel';








function Home() {

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    function handlePhotoClick(photo) {
        setSelectedPhoto(photo);
    }

    function handleCloseOverlay() {
        setSelectedPhoto(null);
    }



    return (
        <>

            <Navbar hidden={!!selectedPhoto} />

            <div id="hero">
                <HeroSection imageUrl={"/images/hero_image.jpg"} title={"Maryna Papuna"} />


            </div>





            <div id="portfolio">

                <div className="max-w-[80vw] mx-auto p-6 sm:px-6 lg:px-8" >


                    <PhotoCarousel photos={photos} onPhotoClick={handlePhotoClick} />

                    <div>
                        <div className="pt-8 pb-3 text-center">
                            <h1 className="pt-5 text-5xl font-bold mb-4">Nature</h1>
                            <p className=" p-3 text-base leading-relaxed text-gray-700">Here is some example content.</p>
                        </div>
                    </div>

                    <PortfolioGrid photos={photos} selectedPhoto={selectedPhoto} onPhotoClick={handlePhotoClick} />


                </div>



            </div>





            {/* Overlay */}

            <AnimatePresence>
                {selectedPhoto && (
                    <>
                        {/* Background overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/95 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleCloseOverlay}
                        />

                        {/* Close button */}
                        <motion.div
                            className="fixed top-4 right-4 z-50"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button
                                className="rounded-4xl cursor-pointer"
                                size="sm"
                                variant="secondary"
                                onClick={handleCloseOverlay}
                            >
                                X
                            </Button>
                        </motion.div>

                        {/* Image container */}
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div
                                className="pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedPhoto.imageUrl}
                                    alt={selectedPhoto.title}
                                    className="max-w-full max-h-[90vh]  rounded-lg shadow-lg"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


        </>

    );




}

export default Home