"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[var(--bg)]/80 navbar-blur border-b border-[var(--border)] shadow-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden shadow-sm">
            <Image
              src="/logo.png"
              alt="Centered Intelligence Logo"
              fill
              className="object-cover scale-110"
            />
          </div>
          <span className="font-spaceGrotesk font-bold text-lg hidden sm:block tracking-wide">
            CENTERED<br />INTELLIGENCE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-[var(--border)] pl-4">
            <ThemeToggle />
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 font-medium text-sm rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] transition-all hover:shadow-[0_0_15px_var(--primary-glow)]"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 text-[var(--text)] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[var(--bg)] border-b border-[var(--border)] shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-[var(--text)] hover:text-[var(--primary)] py-2 border-b border-[var(--border)]"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-4 px-6 py-3 font-medium text-center rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-[var(--bg)]"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
