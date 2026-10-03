"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import SignalTransmission from "@/components/reactbits/SignalTransmission";

const serviceOptions = [
  "Website Development",
  "Mobile Application Development",
  "SEO Growth",
  "POS System Development",
  "Website + SEO",
  "Custom System",
  "Other",
];

const benefits = [
  {
    icon: Zap,
    title: "Free strategy call",
    desc: "We review your goal, audience, and current setup before recommending a build path.",
  },
  {
    icon: Sparkles,
    title: "Clear scope before pricing",
    desc: "You get a practical recommendation based on pages, features, integrations, and timeline.",
  },
  {
    icon: CheckCircle2,
    title: "Launch and support mindset",
    desc: "We think beyond the first release, including SEO, analytics, updates, and maintenance.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Website Development",
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
        particleCount: 100,
        spread: 72,
        origin: { y: 0.62 },
        colors: ["#79FC32", "#49D3FF", "#F8D66D", "#FFFFFF"],
      });
    }, 750);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden bg-dark px-4 py-24 md:px-8"
    >
      <SignalTransmission className="opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,13,0.96)_0%,rgba(11,11,13,0.86)_46%,rgba(11,11,13,0.94)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-neon">
            Contact
          </span>
          <h2 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
            Tell us what you want to build.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-dark-muted">
            Websites, mobile apps, SEO, POS systems, and custom digital products. Send the basics and we will help shape the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#49D3FF]/30 bg-[#49D3FF]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#49D3FF]">
              <span className="h-2 w-2 rounded-full bg-[#49D3FF]" />
              Direct inquiry, fast response
            </div>

            <h3 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Let&apos;s turn the messy idea into a clear digital plan.
            </h3>
            <p className="mt-6 text-base leading-8 text-dark-muted">
              Whether you need a fresh website, an app, SEO growth, or a POS system, we will help define the first useful version and the roadmap after launch.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-neon">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-black text-white">{benefit.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-dark-muted">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-silver-light">
              <a href="tel:+94702251601" className="inline-flex items-center gap-3 hover:text-neon">
                <Phone className="h-4 w-4 text-neon" />
                <span>070 225 1601</span>
              </a>
              <a
                href="https://wa.me/94702251601"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-neon"
              >
                <MessageSquare className="h-4 w-4 text-neon" />
                <span>WhatsApp project enquiries</span>
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-[#121318]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[520px] flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-neon bg-neon/15 text-neon shadow-[0_0_24px_rgba(121,252,50,0.35)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-3xl font-black text-white">
                  Inquiry Sent Successfully
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-dark-muted">
                  Thank you for reaching out. We will review your project details and contact you to arrange the strategy call.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-neon underline hover:text-white"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-dark-muted">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-dark-muted" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] py-3 pl-10 pr-4 text-sm text-white placeholder:text-dark-muted/50 focus:border-neon focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-dark-muted">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-dark-muted" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Your phone number"
                        className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] py-3 pl-10 pr-4 text-sm text-white placeholder:text-dark-muted/50 focus:border-neon focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-dark-muted">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-dark-muted" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@business.com"
                      className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] py-3 pl-10 pr-4 text-sm text-white placeholder:text-dark-muted/50 focus:border-neon focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-dark-muted">
                    Service Needed *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#0B0B0D] px-4 py-3 text-sm text-white focus:border-neon focus:outline-none"
                  >
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-dark-muted">
                    Project Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-dark-muted" />
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you need, what is not working now, and any timeline you have in mind."
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0B0D] py-3 pl-10 pr-4 text-sm text-white placeholder:text-dark-muted/50 focus:border-neon focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] shadow-[0_0_24px_rgba(121,252,50,0.32)] transition-all hover:bg-neon-hover disabled:cursor-wait disabled:opacity-75"
                >
                  {loading ? (
                    <span>Sending inquiry...</span>
                  ) : (
                    <>
                      <span>Send project inquiry</span>
                      <Send className="h-4 w-4" />
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
