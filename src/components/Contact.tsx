"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, CheckCircle2, User, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

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
    <section id="contact" className="py-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-neon/[0.035] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12] mb-6">
              Let&apos;s Build <span className="text-neon">Something Great</span> Together.
            </h2>

            <p className="text-base text-dark-muted leading-relaxed font-normal mb-8">
              Tell us about your project and we&apos;ll get back to you within 24 hours to set up a free consultation.
            </p>

            <a
              href="https://wa.me/94702251601"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white hover:text-neon transition-colors"
            >
              <Phone className="w-5 h-5 text-neon" />
              <span className="text-base font-semibold">Call / WhatsApp: 070 225 1601</span>
            </a>
          </div>

          {/* Inquiry form */}
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
