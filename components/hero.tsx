"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="relative justify-center items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating circles */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-40 right-20 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Animated dots */}
        {mounted && [...Array(20)].map((_, i) => {
          const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000);
          const randomY = Math.random() * 600;
          const randomDuration = 3 + Math.random() * 2;
          const randomDelay = Math.random() * 5;
          
          return (
            <motion.div
              key={i}
              initial={{
                x: randomX,
                y: randomY,
                opacity: 0,
              }}
              animate={{
                y: randomY - 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeOut",
              }}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
            />
          );
        })}
      </div>

      <section className="relative max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <span className="w-fit h-full text-sm bg-card px-2 py-1 border border-border rounded-full">
            Affordable Geomatics Software
          </span>
          <h1 className="text-3xl font-medium tracking-tighter mx-auto md:text-4xl text-pretty bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">
            Affordable Geomatics Software for Professionals
          </h1>
          <p className="max-w-2xl text-lg mx-auto text-muted-foreground text-balance">
            Geomatics software for land surveying, GPS tracking, and mapping.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <Button className="shadow-lg" size="lg">
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
