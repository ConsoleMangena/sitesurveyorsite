"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcher from "@/components/theme-switcher";
import {
  ChevronDownIcon,
  FaceIcon,
  GlobeIcon,
  OpenInNewWindowIcon,
  PersonIcon,
  TimerIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  ExitIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  const menuItems: { name: string; href: string }[] = [
    { name: "About", href: "/about" },
    { name: "Downloads", href: "/downloads" },
    { name: "Documentation", href: "/documentation" },
    { name: "Community", href: "/community" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "News", href: "/news" },
    { name: "Events", href: "/events" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/80 shadow-sm relative">
      {user && (
        <div className="w-full bg-sky-500/10 border-b border-sky-500/20 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300">
              <BellIcon className="h-4 w-4" />
              <span className="hidden sm:inline">You have notifications</span>
            </div>
            <Link href="/notifications" className="text-sky-700 dark:text-sky-300 hover:underline underline-offset-4">
              View notifications
            </Link>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
              </motion.div>
            </Button>
          </div>
          <div className="flex sm:hidden">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="SiteSurveyor" width={32} height={32} />
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="SiteSurveyor" width={40} height={40} />
            </Link>
            <nav className="hidden md:flex items-center space-x-1 ml-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={
                      `group relative text-sm px-3 py-1 rounded-md transition-colors after:content-[""] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-gradient-to-r after:from-sky-500/80 after:to-cyan-500/80 after:rounded-full after:transition-transform after:duration-300 after:origin-left ${
                        isActive
                          ? "text-foreground bg-accent/50 after:scale-x-100"
                          : "text-foreground/80 hover:text-foreground hover:bg-accent/50 after:scale-x-0 group-hover:after:scale-x-100"
                      }`
                    }
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/downloads">Download</Link>
            </Button>
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <PersonIcon className="mr-2 h-4 w-4" />
                      {user.name || user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
                      <ExitIcon className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild size="sm" variant="ghost">
                  <Link href="/login">
                    <PersonIcon className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              )
            )}
            <ThemeSwitcher />
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="sm:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="px-2 pt-2 pb-3 space-y-1"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    {(() => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                      return (
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${isActive ? "bg-muted text-foreground" : "text-foreground hover:bg-muted"}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })()}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
    </nav>
  );
}
