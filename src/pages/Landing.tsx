import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import Features from "../components/sections/Features";
import WhoItsFor from "../components/sections/WhoItsFor";
import Trust from "../components/sections/Trust";
import Faq from "../components/sections/Faq";
import FinalCta from "../components/sections/FinalCta";

export default function Landing() {
  return (
    <>
      <a
        href="#main"
        className="absolute -top-16 left-4 z-10 rounded-lg bg-ink px-4 py-2.5 text-white focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Features />
        <WhoItsFor />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}