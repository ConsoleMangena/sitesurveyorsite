import Image from "next/image";

import Hero from "@/components/hero";
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
      <section className="border-y bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
          <div className="flex justify-center md:justify-start">
            <div className="overflow-hidden rounded-3xl border shadow-lg">
              <Image
                src="/profile.jpg"
                alt="Console Mangena, SiteSurveyor lead developer"
                width={208}
                height={208}
                className="h-52 w-52 object-cover"
                priority
              />
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Project founder</p>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Console Mangena</h2>
              <p className="text-sm text-muted-foreground">Lead developer, geospatial engineer, and SiteSurveyor creator.</p>
            </div>
            <p className="text-muted-foreground">
              Console guides the roadmap, reviews community pull requests, and ensures every release mirrors the needs
              of working survey teams. The open-source stack reflects years spent capturing, QA&apos;ing, and delivering
              geospatial data in the field.
            </p>
          </div>
        </div>
      </section>
      <Partners />
      <Pricing />
      <Faq />
      <Testimonials />
    </main>
  );
}
