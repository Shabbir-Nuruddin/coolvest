import type { Metadata, Viewport } from "next";
import { Archivo, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow-c",
  display: "swap",
});

const title = "CoolVest — a cooling undershirt for people who work in the heat";
const description =
  "A thin undershirt with phase-change liners that hold at 28 °C, worn under the uniform a guard or labourer already has. No fan, no battery. Charged in a fridge, swapped at midday. Request a quote for your workforce.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "CoolVest",
  keywords: [
    "cooling undershirt",
    "phase change cooling",
    "security guard heat",
    "worker heat stress",
    "PCM cooling vest India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "CoolVest",
    title,
    description,
    images: [{ url: "/product/security-worker.webp", width: 1024, height: 1536 }],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d1b24",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
