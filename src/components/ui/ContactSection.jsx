import React from "react";
import { Instagram, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

function ContactSection() {
  return (
    <section className="bg-foreground/90 text-background py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
        
        {/* Social Icons */}
        <div className="flex space-x-6 md:mb-0 ">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:scale-120 transition-transform duration-300">
            <Youtube className=" w-7 h-7 md:w-10 md:h-10" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-120 transition-transform duration-300">
            <Instagram className="w-7 h-7 md:w-10 md:h-10" />
          </a>
        </div>

        {/* Contact Me Button */}
        <Button
          href="#contact"
          className="flex items-center space-x-2 bg-accent text-foreground hover:bg-accent/85 transition-colors"
        >
          <span>Contact Me</span>
        </Button>
      </div>
    </section>
  );
}

export default ContactSection;
