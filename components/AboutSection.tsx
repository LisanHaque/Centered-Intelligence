"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { MapPin, Target, Zap } from "lucide-react";

const stats = [
  { value: 4, label: "Core AI Services", suffix: "+" },
  { value: 100, label: "Tailored Solutions", suffix: "%" },
  { value: 24, label: "Hour Support", suffix: "/7" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    } else {
      setCount(0); // Reset when out of view
    }
  }, [inView, value]);

  return (
    <div className="flex flex-col">
      <span className="stat-number text-transparent bg-clip-text bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
        {count}{suffix}
      </span>
      <span className="text-[var(--text-muted)] font-medium text-sm md:text-base mt-2">
        {label}
      </span>
    </div>
  );
}

// Fixed the AnimatedCounter usage by moving label prop manually to render or adjust prop signature
function StatItem({ value, label, suffix, inView }: { value: number; label: string; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = Math.abs(Math.floor(duration / end || 1));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [inView, value]);

  return (
    <div className="flex flex-col p-4 border-l-2 border-[var(--border)]">
      <span className="stat-number text-transparent bg-clip-text bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] drop-shadow-[0_0_10px_var(--primary-glow)]">
        {count}{suffix}
      </span>
      <span className="text-[var(--text-muted)] font-medium text-sm md:text-base mt-2">
        {label}
      </span>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section id="about" className="section-pad bg-[var(--bg)] relative">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-spaceGrotesk font-bold mb-6 text-[var(--text)]">
              Transforming Bangladesh's <br className="hidden lg:block"/>
              Business Landscape
            </h2>
            
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Based in the heart of Dhaka, Centered Intelligence is an AI consulting
              agency dedicated to helping businesses scale. We do not just talk about AI —
              we build and implement concrete AI solutions directly into your operations
              to drive real growth.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center flex-shrink-0 border border-[var(--primary)]/20">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-spaceGrotesk text-[var(--text)] mb-2">Our Mission</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    To democratize enterprise-grade AI for businesses in Bangladesh, making intelligent automation accessible, practical, and highly profitable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center flex-shrink-0 border border-[var(--secondary)]/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-spaceGrotesk text-[var(--text)] mb-2">Our Location</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Shiyalbari 6/11, Mirpur,<br/>
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Design Element */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-glow)] to-transparent rounded-[2rem] blur-3xl -z-10"></div>
            
            <div className="gradient-border p-[1px] rounded-[2rem]">
              <div className="bg-[var(--surface)] p-8 md:p-12 rounded-[2rem] h-full flex flex-col justify-center">
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-4 shadow-[0_4px_20px_var(--primary-glow)] mb-10 text-[var(--bg)] flex items-center justify-center float-animation">
                  <Zap size={32} />
                </div>

                <h3 className="text-2xl font-spaceGrotesk font-bold text-[var(--text)] mb-8">
                  By the Numbers
                </h3>

                <div className="grid gap-8">
                  {stats.map((stat) => (
                    <StatItem
                      key={stat.label}
                      value={stat.value}
                      label={stat.label}
                      suffix={stat.suffix}
                      inView={isInView}
                    />
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
