import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const navLinks = [
  { href: "/#speakers", label: "Speakers" },
  { href: "/#sponsors", label: "Sponsors" },
  { href: "/programs", label: "Programs" },
  { href: "/#faq", label: "FAQ" },
  {
    href: "mailto:blockchain@umich.edu?subject=UBC%20Inquiry",
    label: "Contact",
    external: true,
  },
];

const socialLinks = [
  { href: "https://www.instagram.com/college.xyz/", Icon: Instagram, label: "Instagram" },
  { href: "https://x.com/MBC_Conference", Icon: Twitter, label: "X / Twitter" },
  { href: "https://www.linkedin.com/company/midwest-blockchain-conference/", Icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A2A36]">
      {/* CTA strip */}
      <div className="border-b border-white/8">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3
              className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-none"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Ready to Build the Future?
            </h3>
            <p className="text-white/40 text-sm mt-2">
              Nov 20–21, 2026 · UT Austin, Texas
            </p>
          </div>
          <a
            href="https://lu.ma/x6apzbr8"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#EC8644] text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#D4703A] transition-colors shadow-lg shadow-[#EC8644]/20"
          >
            Get Tickets →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-black font-[var(--font-zuume)] text-white tracking-tight">
                UBC
              </span>
              <span className="text-2xl font-black font-[var(--font-zuume)] text-[#EC8644] tracking-tight">
                2026
              </span>
            </Link>
            <p className="text-white/30 text-xs max-w-[200px] leading-relaxed">
              The premier student-run blockchain conference. Built by students, for the industry.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-10 gap-y-4 sm:gap-x-14">
            {navLinks.map(({ href, label, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  className="text-white/40 hover:text-white/70 text-sm transition-colors self-start"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="text-white/40 hover:text-white/70 text-sm transition-colors self-start"
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} University Blockchain Conference. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with ♥ in Austin, TX
          </p>
        </div>
      </div>

      {/* Full-bleed floor wordmark */}
      <div className="overflow-hidden pointer-events-none select-none px-4 sm:px-6">
        <p
          className="font-[var(--font-zuume)] font-black text-white/[0.04] leading-none tracking-tight whitespace-nowrap -mb-[0.14em]"
          style={{ fontSize: "clamp(72px, 20vw, 300px)" }}
        >
          UNIVERSITY BLOCKCHAIN
        </p>
      </div>
    </footer>
  );
}
