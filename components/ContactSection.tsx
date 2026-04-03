"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/centeredintelligencebd@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            service: data.service || "Not specified",
            message: data.message,
            _subject: "New Website Lead: " + data.name
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
       console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="section-pad bg-[var(--surface2)] relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-spaceGrotesk font-bold text-[var(--text)] mb-6">
            Ready to Scale?
          </h2>
          <p className="text-[var(--text-muted)] text-lg">
            Reach out to discuss how our AI solutions can transform your operations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="gradient-border">
            <div className="glass p-8 md:p-12 rounded-[16px] relative overflow-hidden">
              
              {/* Optional Background Glow inside the card */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-spaceGrotesk font-bold text-[var(--text)] mb-2">Message Sent!</h3>
                  <p className="text-[var(--text-muted)]">We will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text)]">Name</label>
                      <input 
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-[var(--primary)] font-medium text-xs">* {errors.name.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text)]">Email</label>
                      <input 
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                        })}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                        placeholder="john@company.com"
                      />
                      {errors.email && <span className="text-[var(--primary)] font-medium text-xs">* {errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text)]">Interested Service</label>
                    <select 
                      {...register("service")}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      <option value="website">Custom Business Website</option>
                      <option value="marketing">AI Marketing Automation</option>
                      <option value="customer-service">AI Customer Service Bot</option>
                      <option value="management">Intelligent Business Management</option>
                      <option value="other">Other / Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text)]">Message</label>
                    <textarea 
                      {...register("message", { required: "Message is required" })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all resize-none"
                      placeholder="Tell us about your business and goals..."
                    ></textarea>
                    {errors.message && <span className="text-[var(--primary)] font-medium text-xs">* {errors.message.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-[var(--bg)] rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_var(--primary-glow)] transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full font-semibold px-2"></span>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
