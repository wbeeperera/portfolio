"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  CheckCircle2,
  User,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import SignalTransmission from "@/components/reactbits/SignalTransmission";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Website",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#79FC32", "#FFFFFF", "#4C4D4F"],
      });
    }, 750);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden min-h-screen flex items-center">
      {/* 1. Interactive Signal & Network Transmission Background Animation */}
      <SignalTransmission className="opacity-75" />

      {/* 2. Soft Ambient Radial Vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(11,11,13,0.3)_0%,rgba(11,11,13,0.85)_75%,#0B0B0D_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-neon/[0.035] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Contact Us
          </h2>
          <p className="text-base text-dark-muted max-w-xl font-normal">
            Fill out the inquiry form below to arrange a free consultation for your project.
          </p>
        </div>

        {/* 2-Column Layout: Open Background Narrative Left + Polished Inquiry Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Open Typography & Value Points (NO CARD, seamlessly on background) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon/10 border border-neon/30 text-xs font-mono font-bold text-neon mb-6">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_8px_#79FC32]" />
                <span>DIRECT INQUIRY • FAST 24H RESPONSE</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12] mb-6">
                Let&apos;s Build <br className="hidden sm:inline" />
                <span className="text-neon neon-text-glow italic">Something Great</span> Together.
              </h3>

              <p className="text-base text-dark-muted leading-relaxed font-normal">
                Websites, business systems and social media management, all under one roof. Reach out today and let&apos;s map out your tailored solution.
              </p>
            </div>

            {/* Core Reassurance Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center text-neon shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">Free Strategic Consultation</span>
                  <span className="text-xs text-dark-muted font-mono leading-relaxed">Discovery audit to evaluate your online presence &amp; systems</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center text-neon shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">Custom-Engineered Solutions</span>
                  <span className="text-xs text-dark-muted font-mono leading-relaxed">Built specifically around your workflows — zero cookie-cutter templates</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center text-neon shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">End-to-End Dedicated Execution</span>
                  <span className="text-xs text-dark-muted font-mono leading-relaxed">One unified team managing dev, internal tools &amp; social ads</span>
                </div>
              </div>
            </div>

            {/* Network Transmission Status Indicator */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-dark-muted">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neon shadow-[0_0_8px_#79FC32]" />
                <span className="text-white font-medium">Ready for New Projects</span>
              </div>
              <span className="text-neon bg-neon/10 px-3 py-1 rounded-full border border-neon/20">
                Interactive Signal Grid
              </span>
            </div>
          </div>

          {/* Right Column: Full-Height Expansive Inquiry Form Card */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 bg-dark-card/90 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 flex-1"
              >
                <div className="w-16 h-16 rounded-full bg-neon/15 border border-neon flex items-center justify-center mb-6 text-neon shadow-[0_0_20px_rgba(121,252,50,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-black text-white mb-2">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-sm text-dark-muted max-w-md leading-relaxed mb-6">
                  Thank you for reaching out. Our team will contact you promptly to arrange your free consultation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono font-bold text-neon tracking-widest uppercase underline hover:text-white"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-5">
                
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-dark-muted mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-dark-muted absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-dark-card border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-dark-muted/40 focus:outline-none focus:border-neon transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-dark-muted mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-dark-muted absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your phone number"
                          className="w-full bg-dark-card border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-dark-muted/40 focus:outline-none focus:border-neon transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-dark-muted mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-dark-muted absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@business.com"
                          className="w-full bg-dark-card border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-dark-muted/40 focus:outline-none focus:border-neon transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Needed Dropdown */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-dark-muted mb-2">
                      Service Needed *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-dark-card border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-neon transition-colors font-mono cursor-pointer"
                    >
                      <option value="Website">Website</option>
                      <option value="POS System">POS System</option>
                      <option value="In-House System">In-House System</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-dark-muted mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-dark-muted absolute left-3.5 top-3.5" />
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your business, current challenges, or goals..."
                        className="w-full bg-dark-card border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-dark-muted/40 focus:outline-none focus:border-neon transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-neon text-[#0B0B0D] font-extrabold text-xs font-mono tracking-widest uppercase py-4 rounded-xl shadow-[0_0_25px_rgba(121,252,50,0.35)] hover:bg-neon-hover hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
