import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soul-dunes.vercel.app"), // ✅ REQUIRED

  title: {
    default: "Sol Dunes | Experiences with a soul of their own",
    template: "%s | Sol Dunes",
  },

  description:
    "Across sand, sea, and skyline — Sol Dunes offers curated desert escapes, adrenaline rides, and cultural journeys in the UAE that breathe beyond itineraries.",

  keywords: [
    "Desert Safari Dubai",
    "Luxury UAE Tours",
    "Private Desert Camp",
    "Sol Dunes",
    "Dubai Experiences",
  ],

  authors: [{ name: "Sol Dunes" }],
  creator: "Sol Dunes",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soul-dunes.vercel.app",
    siteName: "Sol Dunes",
    title: "Sol Dunes | Experiences with a soul of their own",
    description:
      "Immerse yourself in the golden silence of the dunes. Discover experiences that breathe beyond itineraries.",
    images: [
      {
        url: "/Sol-Logo.jpg",
        width: 1200,
        height: 630,
        alt: "Sol Dunes Experience",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sol Dunes | Experiences with a soul of their own",
    description:
      "Experiences that breathe beyond itineraries — curated desert journeys in the UAE.",
    images: ["/Sol-Logo.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}