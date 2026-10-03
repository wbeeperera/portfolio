"use client";

import { motion } from "framer-motion";
import {
  Laptop,
  Database,
  Store,
  Settings,
  ShieldCheck,
  Video,
  Globe2,
  Megaphone,
  Palette,
  BarChart3,
} from "lucide-react";

const pillars = [
  {
    title: "Web Design & Development",
    services: [
      { icon: Laptop, title: "Websites & Web Apps", desc: "Fast, mobile-friendly sites that turn visitors into customers." },
      { icon: Database, title: "In-House Systems", desc: "Manage staff, inventory, orders and reports in one place." },
      { icon: Store, title: "POS Systems", desc: "Billing, stock tracking and sales reports for shops and restaurants." },
      { icon: Settings, title: "Custom Software", desc: "Tools built around how your business works." },
      { icon: ShieldCheck, title: "Maintenance & Support", desc: "Updates, security and hosting after launch." },
    ],
  },
  {
    title: "Social Media Management",
    services: [
      { icon: Video, title: "Content Creation", desc: "Posts, reels and stories designed around your brand." },
      { icon: Globe2, title: "Page Management", desc: "Consistent posting and replies on Facebook, Instagram and TikTok." },
      { icon: Megaphone, title: "Paid Ads", desc: "Targeted campaigns that reach the right people." },
      { icon: Palette, title: "Branding", desc: "Logos, colors and brand guidelines." },
      { icon: BarChart3, title: "Monthly Reports", desc: "Clear insights on what's working." },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Services
          </h2>
          <p className="text-base text-dark-muted max-w-2xl font-normal">
            Websites, business systems and social media, all under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {pillars.map((pillar, pIdx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: pIdx * 0.15 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10"
            >
              <h3 className="font-display text-2xl font-black text-white mb-6">
                {pillar.title}
              </h3>

              <div className="space-y-5">
                {pillar.services.map((srv) => (
                  <div key={srv.title} className="flex items-start gap-4">
                    <srv.icon className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {srv.title}
                      </h4>
                      <p className="text-sm text-dark-muted leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
