"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Megaphone, Headset, Cog, ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Custom Business Website Development",
    description: "Premium, high-performance websites built fully from scratch tailored to your brand to drive conversions and establish authority.",
    icon: Globe,
    benefits: ["SEO Optimized Architecture", "Modern & Premium Aesthetics", "High Loading Speed"],
  },
  {
    id: 2,
    title: "Custom AI Powered Marketing Automation",
    description: "Scale your reach with intelligent automation that generates, nurtures, and converts leads without manual effort.",
    icon: Megaphone,
    benefits: ["Data-driven campaigns", "Automated Lead Funnels", "Personalized Outreach"],
  },
  {
    id: 3,
    title: "Next Gen AI Customer Service Bot",
    description: "Provide 24/7 intelligent support that understands context, resolves issues instantly, and escalates complex queries.",
    icon: Headset,
    benefits: ["Instant Response Time", "Multilingual Support", "Seamless Human Handoff"],
  },
  {
    id: 4,
    title: "Intelligent Business Management Bot",
    description: "Streamline your internal operations with AI agents that handle scheduling, data entry, and resource tracking.",
    icon: Cog,
    benefits: ["Workflow Automation", "Error Reduction", "Operational Efficiency"],
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg tilt
    const rotateY = ((x - centerX) / centerX) * 5;

    cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (cardElement: HTMLDivElement) => {
    cardElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="services" className="section-pad bg-[var(--surface2)] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--secondary)] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--primary)] font-firaCode font-medium tracking-wider uppercase text-sm mb-4 block">
              // What We Do
            </span>
            <h2 className="text-3xl md:text-5xl font-spaceGrotesk font-bold text-[var(--text)] mb-6">
              Intelligent Solutions to <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                Scale Your Operations
              </span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              We replace manual bottlenecks with bespoke AI systems that work tirelessly, allowing you to focus on strategy and growth.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={cardVariants} className="h-full">
              <div 
                className="gradient-border h-full tilt-card cursor-pointer group"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                onMouseEnter={() => setHoveredCard(service.id)}
              >
                <div className="glass p-8 md:p-10 rounded-[16px] h-full flex flex-col relative overflow-hidden transition-colors duration-500 group-hover:bg-[var(--surface)]/90">
                  
                  {/* Hover Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-full z-0 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 group-hover:text-[var(--secondary)] transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_var(--primary-glow)]">
                      <service.icon size={28} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-2xl font-spaceGrotesk font-bold text-[var(--text)] mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary)] group-hover:to-[var(--secondary)] transition-all">
                      {service.title}
                    </h3>
                    
                    <p className="text-[var(--text-muted)] mb-8 flex-grow">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-[var(--primary)] font-bold font-spaceGrotesk text-sm uppercase tracking-wider group-hover:text-[var(--secondary)] transition-colors">
                      Learn More 
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
