"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "#github",
      icon: GitHubLogoIcon,
    },
    {
      name: "Twitter",
      href: "#twitter",
      icon: TwitterLogoIcon,
    },
  ];

  return (
    <footer className="w-full bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image src="/logo.svg" alt="SiteSurveyor" width={32} height={32} />
            </Link>
            <span className="text-sm text-muted-foreground">
              © {year} SiteSurveyor. All rights reserved.
            </span>
          </div>

          <div className="flex space-x-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
