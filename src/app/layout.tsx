import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Samthon Aesthetic: Bold, punchy geometric display font for headings & titles
const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: "../../public/fonts/CabinetGrotesk-Bold.woff2",
  weight: "700",
  variable: "--font-cabinet",
  display: "swap",
});

// Nuvica Aesthetic: Ultra-clean, modern geometric sans font for body text, paragraphs, & subtitles
const nuvica = localFont({
  src: [
    {
      path: "../../public/fonts/PlusJakartaSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlusJakartaSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlusJakartaSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-nuvica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SERENOD | Web Development, Business Systems & Social Media",
  description: "Websites, business systems and social media management, all under one roof.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${cabinetGrotesk.variable} ${nuvica.variable}`}>
      <body className="bg-[#0B0B0D] text-white font-sans selection:bg-[#79FC32] selection:text-[#0B0B0D]">
        {children}
      </body>
    </html>
  );
}
