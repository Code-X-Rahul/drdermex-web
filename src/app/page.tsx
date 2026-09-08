import Hero from "@/components/home/Hero";
import RootCauses from "@/components/home/RootCauses";
import AccuracyBand from "@/components/home/AccuracyBand";
import CareCards from "@/components/home/CareCards";
import Untreated from "@/components/home/Untreated";
import WhatYouGet from "@/components/home/WhatYouGet";
import Steps from "@/components/home/Steps";
import Science from "@/components/home/Science";
import AppCta from "@/components/home/AppCta";
import Features from "@/components/home/Features";
import Benefits from "@/components/home/Benefits";
import Faq from "@/components/home/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <RootCauses />
      <AccuracyBand />
      <CareCards />
      <Untreated />
      <WhatYouGet />
      <Steps />
      <Science />
      <AppCta />
      <Features />
      <Benefits />
      <Faq />
    </>
  );
}
