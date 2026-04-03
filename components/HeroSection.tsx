"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import NeuralCanvas from "./NeuralCanvas";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const bounceVariants = {
    animate: {
      y: [0, 10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background with Grid + Neural Network */}
      <div className="absolute inset-0 grid-bg opacity-30 z-0"></div>
      <div className="absolute inset-0 z-10">
        <NeuralCanvas />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 md:px-6 relative z-20 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Top Label */}
          <motion.div variants={childVariants} className="mb-6 inline-flex">
            <span className="px-4 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] font-firaCode text-sm font-medium tracking-wide">
              {">"} NEXT-GEN AI CONSULTING
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={childVariants} className="text-4xl md:text-6xl lg:text-7xl font-spaceGrotesk font-extrabold leading-tight tracking-tight mb-6 text-[var(--text)]">
            AI Consulting That{" "}
            <span className="animated-gradient-text block mt-2">
              Scales Your Business
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={childVariants} className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl leading-relaxed">
            We implement intelligent AI solutions to help businesses in Bangladesh grow efficiently, automate operations, and outpace the competition.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={childVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <a
              href="#services"
              className="btn-shine relative overflow-hidden group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-[var(--bg)] rounded-full font-semibold outline-none focus:ring-4 focus:ring-[var(--primary-glow)] transition-transform hover:scale-105 shadow-[0_0_20px_var(--primary-glow)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Our Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface2)] text-[var(--text)] transition-all hover:border-[var(--silver)] hover:shadow-[0_0_15px_rgba(192,192,192,0.1)] outline-none focus:ring-4 focus:ring-[var(--border)]"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        variants={bounceVariants}
        animate="animate"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-xs uppercase tracking-widest font-firaCode text-[var(--text-muted)]">Scroll</span>
        <ChevronDown size={24} className="text-[var(--text-muted)]" />
      </motion.div>

      {/* Fade out to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
