"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";

export default function Pricing() {
  const plans = [
    {
      name: "Student Plan (Free)",
      desc: "$0 — free for students; core features to get started",
      price: 0,
      isMostPop: false,
      features: [
        "Basic features",
        "Community support",
        "Open-source access on GitHub",
      ],
      ctaHref: "https://github.com/ConsoleMangena/sitesurveyor/releases/latest",
      ctaText: "Get Started Free",
    },
    {
      name: "Pro Plan",
      desc: "$3.00/month — advanced tools for individuals and teams",
      price: 3,
      isMostPop: true,
      features: [
        "Everything in Free",
        "Advanced AI tools",
        "Priority support",
        "Custom integrations",
      ],
      ctaHref: "https://github.com/ConsoleMangena/sitesurveyor",
      ctaText: "Choose Pro",
    },
    {
      name: "Enterprise Plan",
      desc: "Find the proper enterprise pricing for your organization",
      price: 0,
      isMostPop: false,
      features: [
        "Everything in Pro",
        "Advanced security & compliance",
        "Dedicated support & SLA",
      ],
      ctaHref: "https://github.com/ConsoleMangena/sitesurveyorsite/issues/new?labels=enterprise&title=Enterprise%20Inquiry&body=Organization%20name%3A%0AUse%20case%3A%0ASeats%3A%0A",
      ctaText: "Contact us",
    },
  ];

  return (
    <>
      <section
        id="pricing"
        className="w-full max-w-7xl mx-auto px-4 py-24 md:px-6"
      >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16 flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Choose Your Plan
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-center">
          Select the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative ${plan.isMostPop ? "scale-105" : ""}`}
          >
            <Card
              className={`relative h-full ${
                plan.isMostPop ? "border-2 border-primary shadow-xl" : ""
              }`}
            >
              {plan.isMostPop && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-card border-2 border-primary px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <CardContent className="p-6 pt-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.desc}
                  </p>
                  <div className="flex items-baseline justify-center">
                    {plan.name === "Enterprise Plan" ? (
                      <span className="text-4xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground ml-1">/month</span>
                      </>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm"
                    >
                      <CheckIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  className="w-full"
                  variant={plan.isMostPop ? "default" : "outline"}
                  size="lg"
                >
                  <a href={plan.ctaHref} target="_blank" rel="noopener noreferrer">
                    {plan.ctaText}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    <p className="text-center text-sm text-muted-foreground mt-6">
      SiteSurveyor is open source — view the code on
      {' '}<a className="underline underline-offset-4" href="https://github.com/ConsoleMangena/sitesurveyor" target="_blank" rel="noopener noreferrer">GitHub</a>.
    </p>
    </>
  );
}
