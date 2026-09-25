import type { Metadata } from "next";
import { Roboto_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactLenis } from "@/lib/lenis";
import { Analytics } from "@vercel/analytics/next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const OG_IMAGE = `${SITE_URL}/opengraph.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
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
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1254,
        height: 1254,
        alt: "University Blockchain Conference 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@UBC_Conference",
    images: [OG_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: [
    "UBC",
    "UBC 2026",
    "Midwest Blockchain Conference",
    "MBC",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/university_blockchain_conference_logo.svg`,
  email: "uniblockchainconferences@gmail.com",
  sameAs: [
    "https://x.com/UBC_Conference",
    "https://www.linkedin.com/company/midwest-blockchain-conference/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: "UBC",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
            }}
          />
          <Analytics />
          <Navbar />
          {children}
          <Footer />
        </body>
      </ReactLenis>
    </html>
  );
}
