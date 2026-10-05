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
    <section id="services" className="section section-alt">
      <div className="container-x">

        <div className="section-header">
          <span className="eyebrow">Services</span>
          <h2 className="section-title">Everything your business needs online</h2>
          <p className="section-lead">
            Websites, business systems and social media, all under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {pillars.map((pillar, pIdx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 120px 0px" }}
              transition={{ duration: 0.5, delay: pIdx * 0.15 }}
              className="glass-panel rounded-3xl p-7 sm:p-10 border border-white/10"
            >
              <h3 className="font-display text-h3 font-bold text-white mb-8">
                {pillar.title}
              </h3>

              <div className="space-y-6">
                {pillar.services.map((srv) => (
                  <div key={srv.title} className="flex items-start gap-4">
                    <srv.icon className="w-5 h-5 text-neon/80 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1">
                        {srv.title}
                      </h4>
                      <p className="text-[15px] leading-relaxed text-dark-muted">
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
