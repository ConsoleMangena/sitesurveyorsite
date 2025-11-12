import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Partners from "@/components/partners";
import Pricing from "@/components/pricing";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import Faq from "@/components/faq";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Hero />
      <Stats />
      <Partners />
      <Pricing />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}
