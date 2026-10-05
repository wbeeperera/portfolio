"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  business: string;
  service: string;
  logo: string;
  logoClass?: string; // per-logo fit inside the circle
  draft?: boolean; // placeholder quote: replace with the client's own words
};

// Website clients first, then social media clients
const testimonials: Testimonial[] = [
  {
    quote: "Serenod built our website and runs our social media. The site is fast and easy to update, and our pages now bring in real enquiries every week.",
    business: "Boxy Electrical",
    service: "Website & Social Media",
    logo: "/images/clients/boxy.png",
    draft: true,
  },
  {
    quote: "Our new online store loads in a blink and checkout is effortless. Customers find what they need quickly, and orders went up soon after launch.",
    business: "Biolife",
    service: "Website",
    logo: "/images/clients/biolife.webp",
    logoClass: "p-1.5", // wide logo: use more of the circle
    draft: true,
  },
  {
    quote: "A clean, professional website that makes booking our sports tours simple. The team was quick, clear and easy to work with from start to finish.",
    business: "Fortis Sports Tours",
    service: "Website",
    logo: "/images/clients/fortis.png",
    logoClass: "p-3",
    draft: true,
  },
  {
    quote: "Serenod has transformed the way we showcase our brand on social media. Their creative designs and engaging content have significantly boosted our online presence. Highly recommend!",
    business: "Frosties Creamery",
    service: "Social Media",
    logo: "/images/clients/frosties.webp",
    logoClass: "scale-[1.35]", // its own ring sits just outside our circle
  },
  {
    quote: "Serenod's graphic designing skills are exceptional! They have beautifully highlighted our modern furniture collections, helping us connect with the right audience effortlessly.",
    business: "Home of Kitchens",
    service: "Social Media",
    logo: "/images/clients/hok.png",
  },
  {
    quote: "Thanks to Serenod, our solar panel solutions now stand out on social media. Their professional and eye-catching posts have truly elevated our brand's image.",
    business: "SELTech International",
    service: "Social Media",
    logo: "/images/clients/seltech.png",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-x">

        <div className="section-header">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title">What our clients say</h2>
        </div>

        {/* Phones: swipeable row with a peek of the next card. Desktop: 4 across, then the last 2 centered */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:auto-rows-fr md:grid-cols-2 md:gap-6 md:overflow-visible md:p-0 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.business}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "0px 600px 120px 600px" }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.08 }}
              className={`group h-auto w-[82%] shrink-0 snap-center md:h-full md:w-auto rounded-xl bg-dark-surface/90 border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.6)] px-6 pt-8 pb-7 md:pt-10 md:pb-8 flex flex-col items-center text-center transition-[border-color,box-shadow] duration-300 hover:border-neon/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(121,252,50,0.12)] ${
                i === 4 ? "lg:col-start-2" : ""
              }`}
            >
              <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-full bg-white overflow-hidden ring-4 ring-white/10 group-hover:ring-neon/40 transition-[box-shadow] duration-300 mb-6 md:mb-8">
                <Image
                  src={t.logo}
                  alt={`${t.business} logo`}
                  fill
                  sizes="112px"
                  className={`object-contain ${t.logoClass ?? "p-4"}`}
                />
              </div>

              <blockquote className="text-base text-silver-light leading-relaxed mb-6 md:mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-auto">
                <span className="font-display font-bold text-lg text-white block mb-1.5">
                  {t.business}
                </span>
                <span className="text-eyebrow font-semibold uppercase text-dark-muted">
                  {t.service}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>
    </section>
  );
}
