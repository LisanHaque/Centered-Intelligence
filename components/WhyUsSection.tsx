"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Cpu, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Local Dhaka Expertise",
    description: "We understand the unique challenges and market dynamics of Bangladeshi businesses, allowing us to build solutions that actually work here.",
  },
  {
    icon: Cpu,
    title: "Tailored AI Solutions",
    description: "No generic templates. We analyze your specific operational bottlenecks and build custom AI pipelines that fit perfectly into your workflow.",
  },
  {
    icon: TrendingUp,
    title: "Real Business Results",
    description: "Our focus isn't just on cool tech—it's on your bottom line. We implement AI to reduce costs, save time, and dramatically increase output.",
  },
];

export default function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="why-us" className="section-pad bg-[var(--bg)] relative">
      <div className="absolute inset-0 noise z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-spaceGrotesk font-bold text-[var(--text)] mb-6 leading-tight">
              Why Partner <br />
              With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Us?</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8">
              We bridge the gap between complex artificial intelligence and practical business applications.
            </p>
            <div className="hidden lg:block relative w-full aspect-square max-w-[300px]">
               {/* Abstract decorative element representing AI core */}
               <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full blur-[80px] opacity-20 animate-pulse"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-[var(--primary)]/30 rounded-full flex items-center justify-center">
                 <div className="w-20 h-20 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_var(--primary-glow)]">
                    <div className="absolute w-[200%] h-[20px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50 rotate-45 animate-[spin-ring_3s_linear_infinite]"></div>
                    <div className="w-16 h-16 bg-[var(--bg)] rounded-full z-10 flex items-center justify-center">
                       <span className="font-spaceGrotesk font-bold text-[var(--text)]">CI</span>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Right: Cards */}
          <div className="lg:w-2/3 grid gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="gradient-border group"
              >
                <div className="bg-[var(--surface)] p-8 rounded-[16px] flex flex-col sm:flex-row gap-6 items-start h-full relative overflow-hidden z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <reason.icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-spaceGrotesk font-bold text-[var(--text)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
