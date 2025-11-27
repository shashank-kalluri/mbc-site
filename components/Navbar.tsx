"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const navLinks: NavItem[] = [
  { href: "/#agenda", label: "Agenda" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/#sponsors", label: "Sponsors" },
  { href: "/programs", label: "Programs" },
  { href: "/#universities", label: "Universities" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass =
    "text-foreground hover:text-muted-foreground transition font-sans";

  const isActive = (href: string) => {
    // Basic active check: exact path or same base path for /programs
    if (href === "/") return pathname === "/";
    if (href.startsWith("/programs")) return pathname.startsWith("/programs");
    // For hash links, highlight when on home
    if (href.startsWith("/#")) return pathname === "/";
    return false;
  };

  const DesktopLinks = useMemo(
    () =>
      navLinks.map(({ href, label, external }) =>
        external ? (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {label}
          </a>
        ) : (
          <Link
            key={href}
            href={href}
            className={`${linkClass} ${
              isActive(href) ? "opacity-100" : "opacity-90"
            }`}
            aria-current={isActive(href) ? "page" : undefined}
          >
            {label}
          </Link>
        )
      ),
    [pathname]
  );

  const MobileLinks = useMemo(
    () =>
      navLinks.map(({ href, label, external }) =>
        external ? (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </a>
        ) : (
          <Link
            key={href}
            href={href}
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        )
      ),
    []
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md px-6 py-3 flex justify-between items-center transition-all ${
        isOpen
          ? "bg-background"
          : "bg-background/10 backdrop-blur-sm md:bg-background/10 md:backdrop-blur-sm md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 md:w-[90%] md:max-w-5xl md:rounded-lg"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Go to Home">
          <Image
            src="/MBC Logo-08-white.png"
            alt="Midwest Blockchain Conference"
            width={30}
            height={30}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {DesktopLinks}
        <Button asChild className="ml-2">
          <a
            href="https://lu.ma/x6apzbr8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tickets
          </a>
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
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
            className="absolute top-full left-0 w-full bg-background shadow-md py-4 flex flex-col items-start space-y-4 md:hidden pl-6 z-40"
          >
            {MobileLinks}
            <Button asChild onClick={() => setIsOpen(false)}>
              <a
                href="https://lu.ma/x6apzbr8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tickets
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
