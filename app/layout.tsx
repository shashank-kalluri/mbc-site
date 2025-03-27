import type { Metadata } from "next";
// import {
//   Geist,
//   Geist_Mono,
//   Inter,
//   Roboto,
//   Roboto_Mono,
// } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactLenis } from "@/lib/lenis";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "MBC 2025",
  description: "The student blockchain conference",
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
    shortcut: "/MBC Logo-08-white.png",
    apple: "/MBC Logo-08-white.png",
  },
  openGraph: {
    siteName: "https://mbc-site-five.vercel.app/",
    images: [
      {
        url: "https://raw.githubusercontent.com/shashank-kalluri/mbc-site/refs/heads/main/public/MBC%20Logo-02.png", // Must be an absolute URL
        width: 30001,
        height: 3000,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "https://mbc-site-five.vercel.app/",
    description: "The student blockchain conference",
    creator: "@MBC_Conference",
    creatorId: "1805686542125744129",
    images: [
      "https://raw.githubusercontent.com/shashank-kalluri/mbc-site/refs/heads/main/public/MBC%20Logo-02.png",
    ], // Must be an absolute URL
  },
};

// const roboto = Roboto({
//   variable: "--font-roboto",
//   subsets: ["latin"],
// });

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
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
    <html lang="en" className="dark">
      <ReactLenis root>
        <body
          className={`${robotoMono.variable} ${zuume.variable} antialiased`}
        >
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </body>
      </ReactLenis>
    </html>
  );
}
