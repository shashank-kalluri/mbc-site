import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const navigationLinks = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "/services", label: "Services" },
    {
      href: "mailto:blockchain@umich.edu?subject=MBC%20Inquiry&body=Hi%20MBC%20Team",
      label: "Contact",
    },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/michiganblockchain",
      icon: <Facebook className="h-5 w-5" />,
      alt: "Facebook",
    },
    {
      href: "https://www.instagram.com/college.xyz/",
      icon: <Instagram className="h-5 w-5" />,
      alt: "Instagram",
    },
    {
      href: "https://x.com/MBC_Conference",
      icon: <Twitter className="h-5 w-5" />,
      alt: "Twitter",
    },
    {
      href: "https://www.linkedin.com/company/midwest-blockchain-conference/about/",
      icon: <Linkedin className="h-5 w-5" />,
      alt: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <div className="md:flex md:justify-between md:items-start lg:items-center border-b border-muted pb-8 mb-8">
          {/* Logo Area */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="block">
              <Image
                src="/MBC Logo-07-white.png" // Replace with your actual logo path
                alt="Footer Logo"
                width={150} // Adjust as needed
                height={50} // Adjust as needed
                className="object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <h6 className="font-semibold mb-2">Explore</h6>
              <ul className="space-y-2">
                {navigationLinks.slice(0, 3).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-2">More</h6>
              <ul className="space-y-2">
                {navigationLinks.slice(3).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Add more navigation sections if needed */}
          </div>

          {/* Social Icons */}
          <div className="mt-6 md:mt-0">
            <h6 className="font-semibold mb-2">Connect</h6>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.alt}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition"
                  aria-label={link.alt}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Midwest Blockchain Conference. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
