"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 shadow-md px-6 py-3 flex justify-between items-center transition-all ${
          isOpen
            ? "bg-background"
            : "bg-background/10 backdrop-blur-sm md:bg-background/10 md:backdrop-blur-sm md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 md:w-[90%] md:max-w-5xl md:rounded-lg"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/MBC Logo-08-white.png"
            alt="Logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-foreground hover:text-muted-foreground transition font-sans"
          >
            About
          </a>
          <a
            href="#"
            className="text-foreground hover:text-muted-foreground transition font-sans"
          >
            Sponsors
          </a>
          <a
            href="#"
            className="text-foreground hover:text-muted-foreground transition font-sans"
          >
            Universities
          </a>
          <a
            href="#"
            className="text-foreground hover:text-muted-foreground transition font-sans"
          >
            Speakers
          </a>
          <a
            href="#"
            className="text-foreground hover:text-muted-foreground transition font-sans"
          >
            Agenda
          </a>
          <a
            href="#"
            className="text-foreground hover:text-muted-foreground transition font-sans"
          >
            Tickets
          </a>
          <a
            href="#"
            className="text-foreground hover:text-muted-foreground transition font-sans"
          >
            FAQ
          </a>
          <Button className="ml-4">Sponsor Us</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={30} className="text-foreground" />
          ) : (
            <Menu size={30} className="text-foreground" />
          )}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-background shadow-md py-4 flex flex-col items-start space-y-4 md:hidden pl-6"
            >
              <a
                href="#"
                className="text-foreground hover:text-muted-foreground transition font-sans"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="#"
                className="text-foreground hover:text-muted-foreground transition font-sans"
                onClick={() => setIsOpen(false)}
              >
                Sponsors
              </a>
              <a
                href="#"
                className="text-foreground hover:text-muted-foreground transition font-sans"
                onClick={() => setIsOpen(false)}
              >
                Universities
              </a>
              <a
                href="#"
                className="text-foreground hover:text-muted-foreground transition font-sans"
                onClick={() => setIsOpen(false)}
              >
                Speakers
              </a>
              <a
                href="#"
                className="text-foreground hover:text-muted-foreground transition font-sans"
                onClick={() => setIsOpen(false)}
              >
                Agenda
              </a>
              <a
                href="#"
                className="text-foreground hover:text-muted-foreground transition font-sans"
                onClick={() => setIsOpen(false)}
              >
                Tickets
              </a>
              <a
                href="#"
                className="text-foreground hover:text-muted-foreground transition font-sans"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
              <Button onClick={() => setIsOpen(false)}>Sponsor Us</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
