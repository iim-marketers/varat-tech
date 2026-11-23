import { Faq, Footer, Guarantee, Pricing, Steps } from "@/components/landing/bottom";
import { CheckoutProvider } from "@/components/landing/checkout";
import { PageTracking, StickyBar } from "@/components/landing/client-bits";
import { Features } from "@/components/landing/features";
import { PainSolution } from "@/components/landing/pain-solution";
import { SavingsCalculator } from "@/components/landing/savings-calculator";
import { Showcase } from "@/components/landing/showcase";
import { Header, Hero, Ticker, TrustStrip } from "@/components/landing/top";
import { VideoGuide } from "@/components/landing/video";

export default function StartPage() {
  return (
    <CheckoutProvider>
      <PageTracking />
      <Ticker />
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <PainSolution />
        <VideoGuide />
        <SavingsCalculator />
        <Showcase />
        <Features />
        <Guarantee />
        <Steps />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <StickyBar />
    </CheckoutProvider>
  );
}
