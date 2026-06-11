"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#speakers", label: "Speakers", disabled: false },
  { href: "/#sponsors", label: "Sponsors", disabled: false },
  { href: "/programs", label: "Programs", disabled: true },
  { href: "/#faq", label: "FAQ", disabled: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setScrolled(true);
      else if (window.scrollY < 20) setScrolled(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Pill is always dark-on-dark; only invert when neither scrolled nor in open state
  const isDark = true;

  return (
    <>
      <header
        className={`fixed z-40 transition-all duration-500 ${
          scrolled
            ? "top-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-[#1A2A36]/95 backdrop-blur-md border border-white/10 shadow-xl shadow-black/30"
            : "top-0 left-0 w-full bg-transparent"
        }`}
      >
        <div className="px-5 sm:px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Home">
            <Image
              src="/navlogo.png"
              alt="UBC Logo"
              width={120}
              height={40}
              className="object-contain h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label, disabled }) =>
              disabled ? (
                <span
                  key={label}
                  className={`text-[13px] font-black font-[var(--font-zuume)] tracking-[0.12em] uppercase select-none ${
                    isDark ? "text-white/25" : "text-[#293C4B]/25"
                  }`}
                >
                  {label}
                </span>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={`text-[13px] font-black font-[var(--font-zuume)] tracking-[0.12em] uppercase transition-colors hover:text-[#EC8644] ${
                    isDark ? "text-white/60" : "text-[#293C4B]/50"
                  }`}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="https://lu.ma/x6apzbr8"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex bg-[#EC8644] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#D4703A] transition-colors"
            >
              Get Tickets
            </a>
            <button
              onClick={() => setOpen(true)}
              className={`md:hidden p-1 transition-colors ${
                isDark ? "text-white" : "text-[#293C4B]"
              }`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#1A2A36] flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-between items-center px-6 h-16">
              <Image
                src="/navlogo.png"
                alt="UBC Logo"
                width={100}
                height={34}
                className="object-contain h-7 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2">
              {navLinks.map(({ href, label, disabled }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {disabled ? (
                    <span className="block text-5xl font-black font-[var(--font-zuume)] text-white/25 select-none tracking-tight py-2">
                      {label.toUpperCase()}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block text-5xl font-black font-[var(--font-zuume)] text-white/80 hover:text-[#EC8644] transition-colors tracking-tight py-2"
                    >
                      {label.toUpperCase()}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.05, duration: 0.3 }}
                className="mt-6"
              >
                <a
                  href="https://lu.ma/x6apzbr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="bg-[#EC8644] text-white font-semibold text-base px-8 py-3 rounded-full hover:bg-[#D4703A] transition-colors"
                >
                  Get Tickets →
                </a>
              </motion.div>
            </nav>

            {/* Bottom info */}
            <div className="px-6 pb-8 text-center">
              <p className="text-white/30 text-xs tracking-widest uppercase">
                Nov 20–21, 2026 · UT Austin, TX
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
