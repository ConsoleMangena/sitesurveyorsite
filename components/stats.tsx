"use client";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "500M+", label: "API Calls" },
    { number: "150+", label: "Contributors" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="text-center"
            >
              <a
                href="https://github.com/ConsoleMangena/sitesurveyor"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a
            href="https://github.com/ConsoleMangena/sitesurveyor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
          >
            View repository on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
