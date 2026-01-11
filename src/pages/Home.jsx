
import PortfolioGrid from '@/components/ui/PortfolioGrid';
import PhotoCard from '@/components/ui/PhotoCard'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';



import photos_js_array from "@/data/photos.js";
import HeroSection from '@/components/ui/HeroSection';
import Navbar from '@/components/ui/NavBar';
import PhotoCarousel from '@/components/ui/PhotoCarousel';
import MotionCarousel from '@/components/ui/MotionCarousel';
import PhotoOverlay from '@/components/ui/PhotoOverlay';
import ContactSection from '@/components/ui/ContactSection';
import ContactOverlay from '@/components/ui/ContactOverlay';








function Home() {

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [contactOverlay, setContactOverlay] = useState(false)

    const photos = photos_js_array.sort((a,b) => b.lastModifiedTime - a.lastModifiedTime);

    const [darkMode, setDarkMode] = useState(() => {
        // Check if the user has a stored preference first
        const stored = localStorage.getItem("theme");
        if (stored) return stored === "dark";

        // Otherwise, use system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        // Apply the theme to the document root
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);


    // Disable scroll when any overlay is open
    const isOverlayOpen = selectedPhoto !== null || contactOverlay;

    useEffect(() => {
        if (isOverlayOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOverlayOpen]);


    function handlePhotoClick(photo) {
        setSelectedPhoto(photo);
    }

    function handleCloseOverlay() {
        setSelectedPhoto(null);
    }

    function handleOpenContactOverlay() {
        setContactOverlay(true);
    }

    function handleCloseContactOverlay() {
        setContactOverlay(false);
    }


    return (
        <>

            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />




            <div id="hero">
                <HeroSection imageUrl={"/images/hero_image.jpg"} title={"Vladimir Papuna"} />


            </div>




            <div className="max-w-[85vw] mx-auto p-6 sm:px-6 lg:px-8" >


                <PhotoCarousel photos={photos} onPhotoClick={handlePhotoClick} />

                <div id="portfolio" className='sd:scroll-mt-5 md:scroll-mt-0 lg:scroll-mt-0'>

                    <PortfolioGrid photos={photos} onPhotoClick={handlePhotoClick} />

                </div>

            </div>

            <div id='contact'>
                <ContactSection handleOpenContactOverlay={handleOpenContactOverlay} />


            </div>


            {/* Only shown when photo is selected */}

            <PhotoOverlay selectedPhoto={selectedPhoto} handleCloseOverlay={handleCloseOverlay} />


            {/* Only shown when contact overlay is opened */}

            <ContactOverlay contactOverlay={contactOverlay} handleCloseContactOverlay={handleCloseContactOverlay} />

        </>

    );




}

export default Home