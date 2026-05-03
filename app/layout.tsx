import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { HashScroll } from "@/components/hash-scroll";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Consequence — Studio, marketplace & engine",
  description:
    "Consequence Software: real-time consequence engine, Trending (studio & marketplace), and WorkSpace infrastructure — one experience. Built by HBM & Company.",
  metadataBase: new URL("https://consequence.software"),
  openGraph: {
    title: "Consequence",
    description: "What happens next.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="paper min-h-screen text-ink antialiased">
        <SiteNav />
        <HashScroll />
        <main className="relative">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
