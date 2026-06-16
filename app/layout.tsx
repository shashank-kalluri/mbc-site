import type { Metadata } from "next";
import { Roboto_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactLenis } from "@/lib/lenis";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://universityblockchain.org"),
  title: "UBC 2026",
  description: "The University Blockchain Conference — November 20–21, 2026 @ UT Austin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "/navlogo.png",
    apple: "/navlogo.png",
  },
  openGraph: {
    siteName: "University Blockchain Conference",
    url: "https://universityblockchain.org/",
    images: [
      {
        url: "https://raw.githubusercontent.com/shashank-kalluri/mbc-site/refs/heads/main/public/opengraph.png",
        width: 3001,
        height: 3000,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UBC 2026",
    description: "The University Blockchain Conference — November 20–21, 2026 @ UT Austin",
    creator: "@UBC_Conference",
    images: [
      "https://raw.githubusercontent.com/shashank-kalluri/mbc-site/refs/heads/main/public/opengraph.png",
    ],
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const zuume = localFont({
  src: [
    {
      path: "/zuume-cdnfonts/Zuume Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "/zuume-cdnfonts/Zuume Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume Light Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "/zuume-cdnfonts/Zuume ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume ExtraLight Italic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "/zuume-cdnfonts/Zuume Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume Medium Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "/zuume-cdnfonts/Zuume SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume SemiBold Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "/zuume-cdnfonts/Zuume Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "/zuume-cdnfonts/Zuume ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume ExtraBold Italic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "/zuume-cdnfonts/Zuume Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "/zuume-cdnfonts/Zuume Black Italic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-zuume",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${inter.variable} ${robotoMono.variable} ${zuume.variable} antialiased`}
        >
          <Analytics />
          <Navbar />
          {children}
          <Footer />
        </body>
      </ReactLenis>
    </html>
  );
}
