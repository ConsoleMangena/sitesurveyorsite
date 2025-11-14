"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function Faq() {
  const accordionItems = [
    {
      title: "Is SiteSurveyor open source?",
      content: (
        <div className="text-muted-foreground">
          Yes. The full codebase is available on GitHub and released under an
          open-source license, so you can inspect, fork, and extend it for your
          own workflows.
        </div>
      ),
    },
    {
      title: "Which platforms are supported?",
      content: (
        <div className="text-muted-foreground">
          SiteSurveyor ships as a responsive web app and through desktop builds
          for Windows and Debian. Check the downloads page for the latest
          release bundles and installation notes.
        </div>
      ),
    },
    {
      title: "Do I need my own Appwrite backend to start?",
      content: (
        <div className="text-muted-foreground">
          No. You can explore the product without configuring Appwrite. When
          you are ready to self-host or connect to your infrastructure, simply
          add the environment variables described in the documentation.
        </div>
      ),
    },
    {
      title: "Is there a free plan?",
      content: (
        <div className="text-muted-foreground">
          Yes. Teams can get started on the free tier for small projects and
          field trials. Additional automation and QA tooling is unlocked on the
          paid plans when you need more scale.
        </div>
      ),
    },
    {
      title: "How can my team contribute?",
      content: (
        <div className="text-muted-foreground">
          Contributions are welcome. Open an issue to share feedback, submit a
          pull request with improvements, or showcase your results on the
          success stories page.
        </div>
      ),
    },
  ];

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0 }}
      className="relative w-full max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          FAQ
        </h4>
        <p className="max-w-xl text-muted-foreground text-center">
          Here are some of our frequently asked questions.
        </p>
      </div>
      <div className="flex w-full max-w-lg">
        <Accordion type="multiple" className="w-full">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="text-muted-foreground"
            >
              <AccordionTrigger className="text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
