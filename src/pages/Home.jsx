
import PortfolioGrid from '@/components/ui/PortfolioGird';
import PhotoCard from '@/components/ui/PhotoCard'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import PhotoCardOverlay from '@/components/ui/PhotoCardOverlay';

import { createPortal } from "react-dom";




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
            <div>
                <div className="p-8">
                    <h1 className="text-4xl font-bold mb-4">Welcome to my Portfolio</h1>
                    <p className="text-gray-700">Here is some example content.</p>
                </div>
            </div>


            <PortfolioGrid onPhotoClick={handlePhotoClick} />


            <AnimatePresence>

                {/* Modal (Overlay) */}
                {selectedPhoto && (

                    <>


                        <div
                            className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        >

                            <motion.div
                                className="fixed inset-0 bg-black z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />



                            <motion.div
                                className="fixed top-4 right-4 z-20"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button className="rounded-4xl" size="sm" variant="secondary" onClick={handleCloseOverlay}>X</Button>
                            </motion.div>
                            <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 pointer-events-none">
                                <motion.div
                                    layoutId={`photo-${selectedPhoto.id}`}
                                    className="pointer-events-auto w-full max-w-3xl z-[200]" // <-- THIS IS THE FIX
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <PhotoCardOverlay photo={selectedPhoto} />
                                </motion.div>
                            </div>




                        </div>




                    </>

                )



                }
            </AnimatePresence>
        </>
    );




}

export default Home