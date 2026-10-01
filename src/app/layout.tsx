import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { firm, seo, SITE_URL } from "@/content/site";
import { socialMetadata } from "@/lib/pageMetadata";
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
  preload: false,
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.defaultTitle, template: `%s | ${firm.shortName}` },
  description: seo.description,
  applicationName: firm.shortName,
  authors: [{ name: firm.name }],
  creator: firm.name,
  publisher: firm.name,
  alternates: { canonical: "/" },
  ...socialMetadata(seo.defaultTitle, seo.description, "/"),
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
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
        <MotionRuntime />
      </body>
    </html>
  );
}
