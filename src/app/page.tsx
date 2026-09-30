import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { Deliverables } from "@/components/sections/Deliverables";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Purpose } from "@/components/sections/Purpose";
import { Screens } from "@/components/sections/Screens";
import { Compliance } from "@/components/sections/Compliance";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero />
        <Deliverables />
        <HowItWorks />
        <Purpose />
        <Screens />
        <Compliance />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
