import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { firm, seo, SITE_URL } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionRuntime } from "@/components/ui/MotionRuntime";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: seo.title,
  description: seo.description,
  applicationName: firm.shortName,
  authors: [{ name: firm.name }],
  creator: firm.name,
  publisher: firm.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: firm.name,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${plexMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <JsonLd />
        <MotionRuntime />
      </body>
    </html>
  );
}
