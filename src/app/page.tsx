import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Diagnosis } from "@/components/sections/Diagnosis";
import { Solutions } from "@/components/sections/Solutions";
import { Comparison } from "@/components/sections/Comparison";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Purpose } from "@/components/sections/Purpose";
import { WhyZentra } from "@/components/sections/WhyZentra";
import { Segments } from "@/components/sections/Segments";
import { Compliance } from "@/components/sections/Compliance";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero />
        <Stats />
        <Diagnosis />
        <Solutions />
        <Comparison />
        <HowItWorks />
        <Purpose />
        <WhyZentra />
        <Segments />
        <Compliance />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
