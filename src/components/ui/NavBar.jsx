import React from "react";
import { useState } from 'react';

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


function Navbar({ }) {

    const [open, setOpen] = useState(false); // control state

    // Function to close the sheet when a link is clicked
    const handleLinkClick = () => {
        setOpen(false);
    };


    return (

        <nav className="fixed top-0 left-0 w-full z-30">
            {/* Background rectangle */}
            <div className="bg-white/80 backdrop-blur-md shadow-md w-full h-16"></div>

            {/* Content Desktop (links/logo) */}
            <div className="absolute inset-0 flex items-center justify-between px-8">
                <div className="text-2xl font-bold">MyLogo</div>
                <div className="hidden md:flex space-x-6 space-x-6 text-lg">
                    <a
                        href="#hero"
                        className="inline-block text-gray-800 hover:text-gray-600 hover:scale-110 transition-transform duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="#portfolio"
                        className="inline-block text-gray-800 hover:text-gray-600 hover:scale-110 transition-transform duration-300"
                    >
                        Portfolio
                    </a>
                    <a
                        href="#contact"
                        className="inline-block text-gray-800 hover:text-gray-600 hover:scale-110 transition-transform duration-300"
                    >
                        Contact
                    </a>
                </div>


                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-6 space-y-4">
                            <SheetHeader>
                                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                                <SheetDescription className="sr-only">
                                    Navigation links for the mobile view of the site.
                                </SheetDescription>
                            </SheetHeader>

                            <a href="#hero" className="block text-lg font-medium" onClick={handleLinkClick}>
                                Home
                            </a>
                            <a href="#portfolio" className="block text-lg font-medium" onClick={handleLinkClick}>
                                Portfolio
                            </a>
                            <a href="#contact" className="block text-lg font-medium" onClick={handleLinkClick}>
                                Contact
                            </a>
                        </SheetContent>
                    </Sheet>
                </div>






            </div>
        </nav>
    );
}

export default Navbar
