"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Rocket, LineChart, Award, Users, ShieldCheck, Zap } from "lucide-react";

const processSteps = [
  {
    number: "01",
    icon: Compass,
    title: "Discovery & Strategy",
    desc: "We analyze your target market, competitor positioning, UX bottlenecks, and social algorithm opportunities to define an execution roadmap.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Design & Prototyping",
    desc: "We build interactive 3D WebGL interfaces while scripting high-retention short-form video hooks engineered for conversion.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Engineering & Content",
    desc: "Full Next.js production development combined with video editing, graphics production, and Lighthouse speed optimization.",
  },
  {
    number: "04",
    icon: LineChart,
    title: "Launch & Growth Scaling",
    desc: "Deploying to edge networks, executing audience growth funnels, and continuously optimizing conversion rates based on data.",
  },
];

export default function MetricsProcess() {
  return (
    <section id="process" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            Execution Framework
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-normal mb-4">
            How We Guarantee Results
          </h2>
          <p className="text-base text-dark-muted max-w-2xl font-normal">
            A battle-tested 4-stage system engineered to eliminate guesswork, accelerate build velocity, and maximize audience reach.
          </p>
        </div>

        {/* 4-Stage Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border border-white/10 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-3xl text-dark-border group-hover:text-neon transition-colors">
                    {step.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-dark-card text-neon border border-neon/20 group-hover:scale-110 transition-transform">
                    <step.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-dark-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-dark-muted">
                <span>PHASE {step.number}</span>
                <span className="text-neon font-semibold">VALIDATED ✓</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-Impact Proof Banner */}
        <div id="metrics" className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { val: "99.9%", label: "Platform Uptime Guarantee", icon: ShieldCheck },
              { val: "15M+", label: "Organic Impressions", icon: Zap },
              { val: "100%", label: "On-Time Project Delivery", icon: Award },
              { val: "4.9/5", label: "Client Satisfaction Rating", icon: Users },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <stat.icon className="w-6 h-6 text-neon mb-3" />
                <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-normal mb-1 neon-text-glow">
                  {stat.val}
                </span>
                <span className="text-xs text-dark-muted uppercase tracking-wider font-mono">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
