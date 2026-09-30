import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
