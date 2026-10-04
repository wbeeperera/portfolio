"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  { title: "Built for you", desc: "Custom solutions, never templates." },
  { title: "One team", desc: "Website, systems and social media handled together." },
  { title: "Honest pricing", desc: "Clear quotes with no hidden fees." },
  { title: "Fast delivery", desc: "Quick turnaround and regular updates." },
  { title: "Support after launch", desc: "We stay with you long after go-live." },
  { title: "Local know-how", desc: "We understand your market and customers." },
];

const industries = [
  "Restaurants & Cafés",
  "Retail",
  "Salons & Spas",
  "Hotels & Tourism",
  "Healthcare",
  "Education",
  "Real Estate",
  "Startups",
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section flex flex-col !pb-0 lg:!py-0 lg:h-[100svh] lg:min-h-[620px] lg:justify-center">
      {/* The thinker: bleeds off the right edge and fades into the next section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
        className="pointer-events-none relative order-last -mx-6 mt-14 md:-mx-10 lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:mt-0 lg:w-[min(40vw,700px,calc(100svh-9rem))] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      >
        {/* Laptop screen light falling on the statue */}
        <div className="absolute left-[58%] top-[38%] h-[45%] w-[38%] -translate-x-1/2 rounded-full bg-neon/[0.14] blur-[90px]" />
        <Image
          src="/images/statue-laptop.webp"
          alt=""
          width={1841}
          height={1833}
          quality={100}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="relative h-auto w-full"
        />
      </motion.div>

      {/* Desktop: spacing scales with screen height so the whole section fits one screen */}
      <div className="container-x lg:pt-20 lg:pb-[3svh]">
        <div className="lg:w-[54%] xl:w-1/2">
          <span className="eyebrow">Why us</span>
          <h2 className="section-title lg:text-[clamp(2rem,6svh,3.75rem)]">Why businesses choose Serenode</h2>
          <p className="mt-5 lg:mt-[2svh] max-w-xl text-lead text-dark-muted">
            Clear thinking before we build anything, and a team that stays with you after launch.
          </p>

          <div className="mt-12 lg:mt-[3.6svh] grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 lg:gap-y-[2.6svh]">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border-l-2 border-neon/35 pl-5"
              >
                <h3 className="font-display font-bold text-h3 text-white mb-1.5">
                  {r.title}
                </h3>
                <p className="text-base text-dark-muted">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 lg:mt-[3.6svh]">
            <h3 className="text-eyebrow font-semibold uppercase text-dark-muted mb-5 lg:mb-[2svh]">
              Industries we serve
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {industries.map((name) => (
                <span
                  key={name}
                  className="px-4 py-2 lg:py-1.5 rounded-full border border-white/10 text-[15px] lg:text-sm text-silver-light"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
