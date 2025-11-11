import React, { useState, useEffect, useRef } from "react";
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
import ThemeToggle from "./themeToggle";

function Navbar({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => setOpen(false);


    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return;

            const navHeight = navRef.current.offsetHeight;
            const heroHeight = window.innerHeight; // or measure hero section dynamically if needed

            if (window.scrollY > heroHeight - navHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check in case page is not at top

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-30">
            {/* Background */}
            <div className={`w-full h-16 transition-colors duration-100 backdrop-blur-md ${isScrolled ? "bg-background/90 shadow-md" : "bg-transparent backdrop-blur-none"
                }`}></div>

            {/* Content */}
            <div className={`absolute inset-0 flex items-center justify-between px-4 md:px-8 ${isScrolled ? "text-foreground/90" : "text-white/90"}`}>
                {/* Logo */}
                <div className="text-2xl font-bold">MyLogo</div>

                {/* Right Section: Links + ThemeToggle + Mobile Menu */}
                <div className="flex items-center space-x-1 md:space-x-6">
                    {/* Desktop links */}
                    <div className="hidden md:flex items-center space-x-6 text-lg ">
                        <a
                            href="#hero"
                            className="inline-block hover:text-foreground/80 hover:scale-105 transition-transform duration-300"
                        >
                            Home
                        </a>
                        <a
                            href="#portfolio"
                            className="inline-block hover:text-foreground/70 hover:scale-105 transition-transform duration-300"
                        >
                            Portfolio
                        </a>
                        <a
                            href="#contact"
                            className="inline-block hover:text-foreground/70 hover:scale-105 transition-transform duration-300"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Theme Toggle — Always visible */}
                    <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

                    {/* Mobile Menu (hamburger) */}
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

                                <a
                                    href="#hero"
                                    className="block text-lg font-medium"
                                    onClick={handleLinkClick}
                                >
                                    Home
                                </a>
                                <a
                                    href="#portfolio"
                                    className="block text-lg font-medium"
                                    onClick={handleLinkClick}
                                >
                                    Portfolio
                                </a>
                                <a
                                    href="#contact"
                                    className="block text-lg font-medium"
                                    onClick={handleLinkClick}
                                >
                                    Contact
                                </a>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
