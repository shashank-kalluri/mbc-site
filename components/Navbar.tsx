"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
  disabled?: boolean;
  external?: boolean;
};

type NavEntry = NavItem & { children?: NavItem[] };

const navLinks: NavEntry[] = [
  { href: "/#about", label: "About" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/#sponsors", label: "Sponsors" },
  { href: "/programs", label: "Programs" },
  {
    href: "#",
    label: "Resources",
    children: [
      { href: "/travel-grants", label: "Travel Grants" },
      { href: "/#faq", label: "FAQ" },
      { href: "https://badge.universityblockchain.org", label: "Badge", external: true },
    ],
  },
];

const linkClass =
  "text-[13px] font-bold font-[var(--font-zuume)] tracking-[0.08em] uppercase transition-colors hover:text-[#EC8644] text-white/60";

const itemClass =
  "block whitespace-nowrap px-3.5 py-2.5 rounded-xl text-[13px] font-bold font-[var(--font-zuume)] tracking-[0.08em] uppercase text-white/65 hover:text-white hover:bg-white/[0.07] transition-colors";

/** Desktop dropdown. Opens on hover and on keyboard focus; the panel is padded
 *  above so the cursor can cross the gap without the menu closing.
 *
 *  The panel takes on the header's own material: frosted glass while the nav is
 *  transparent over the hero, and the solid pill surface once the nav condenses,
 *  so it never reads as a slab pasted over the page. */
function ResourcesMenu({ items, scrolled }: { items: NavItem[]; scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  // The panel always overhangs onto the page, so it stays dark enough to carry
  // white text over the cream background. What changes is its relationship to
  // the header: the condensed pill's exact material, or a lighter navy glass
  // while the nav itself has no surface of its own.
  const panelClass = scrolled
    ? "bg-[#1A2A36]/95 backdrop-blur-md border-white/10"
    : "bg-[#293C4B]/88 backdrop-blur-xl border-white/12";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`${linkClass} flex items-center gap-1.5 ${open ? "text-[#EC8644]" : ""}`}
      >
        Resources
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3.5"
          >
            <div
              className={`relative min-w-[190px] overflow-hidden rounded-2xl border p-1.5 shadow-[0_22px_50px_-24px_rgba(26,42,54,0.75)] ${panelClass}`}
            >
              {/* Soft top-edge highlight so the panel reads as a lit surface
                  rather than a cut-out block. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent" />
              {items.map(({ href, label, external }) =>
                external ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={`relative ${itemClass}`}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`relative ${itemClass}`}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

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

  // Collapse any expanded group once the overlay closes
  useEffect(() => {
    if (!open) setMobileGroup(null);
  }, [open]);

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
            {navLinks.map(({ href, label, disabled, children }) =>
              children ? (
                <ResourcesMenu key={label} items={children} scrolled={scrolled} />
              ) : disabled ? (
                <span
                  key={label}
                  className="text-[13px] font-bold font-[var(--font-zuume)] tracking-[0.08em] uppercase select-none text-white/25"
                >
                  {label}
                </span>
              ) : (
                <Link key={label} href={href} className={linkClass}>
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="https://luma.com/n4ad0k9m"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex bg-[#EC8644] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#D4703A] transition-colors"
            >
              Get Tickets
            </a>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-1 text-white transition-colors"
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
            <div className="flex justify-between items-center px-6 h-16 shrink-0">
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
            <nav className="flex-1 overflow-y-auto flex flex-col items-center justify-center gap-2 py-8">
              {navLinks.map(({ href, label, disabled, children }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  {children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileGroup === label}
                        onClick={() =>
                          setMobileGroup((g) => (g === label ? null : label))
                        }
                        className={`flex items-center gap-3 text-5xl font-black font-[var(--font-zuume)] transition-colors tracking-tight py-2 ${
                          mobileGroup === label ? "text-[#EC8644]" : "text-white/80"
                        }`}
                      >
                        {label.toUpperCase()}
                        <ChevronDown
                          size={28}
                          strokeWidth={3}
                          className={`transition-transform duration-200 ${
                            mobileGroup === label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileGroup === label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden w-full"
                          >
                            <div className="flex flex-col items-center gap-1 pt-1 pb-2">
                              {children.map((child) =>
                                child.external ? (
                                  <a
                                    key={child.label}
                                    href={child.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="block text-2xl font-black font-[var(--font-zuume)] text-white/50 hover:text-[#EC8644] transition-colors tracking-tight py-1.5"
                                  >
                                    {child.label.toUpperCase()}
                                  </a>
                                ) : (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    onClick={() => setOpen(false)}
                                    className="block text-2xl font-black font-[var(--font-zuume)] text-white/50 hover:text-[#EC8644] transition-colors tracking-tight py-1.5"
                                  >
                                    {child.label.toUpperCase()}
                                  </Link>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : disabled ? (
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
                  href="https://luma.com/n4ad0k9m"
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
            <div className="px-6 pb-8 text-center shrink-0">
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
