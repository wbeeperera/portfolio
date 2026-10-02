"use client";

import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import FAQs from "@/components/FAQs";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-dark min-h-screen selection:bg-neon selection:text-[#0B0B0D]">
      {/* 0. Preloader & Cursor */}
      <Loader />
      <CustomCursor />

      {/* Header Navigation */}
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Us */}
      <About />

      {/* 3. Our Services */}
      <Services />

      {/* 4. Featured Projects (Portfolio with Tabs) */}
      <Portfolio />

      {/* 5. Our Process */}
      <Process />

      {/* 6 & 7. Why Choose Us & Industries We Serve */}
      <WhyChooseUs />

      {/* 8. Packages */}
      <Packages />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. FAQs */}
      <FAQs />

      {/* 11. Call to Action Banner */}
      <CtaBanner />

      {/* 12. Contact Us */}
      <Contact />

      {/* 13. Footer */}
      <Footer />
    </main>
  );
}
