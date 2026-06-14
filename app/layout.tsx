import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { LayoutShell } from "@/components/layout-shell";

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
    "Consequence: real-time music production, marketplace, and creator royalty consequence engine — composition to USDC settlement. Built by HBM & Company.",
  metadataBase: new URL("https://www.consequence.cc"),
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
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
