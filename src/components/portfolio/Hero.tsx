"use client";

import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ scrollMarginTop: "120px", paddingTop: "6rem", paddingBottom: "8rem" }}
    >
      {/* Top gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Avatar and Title */}
        <div className="text-center mb-4">
          {/* Avatar Circle */}
          <div className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center z-0">
              {/* Glow effect */}
              <div
                className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-accent/10 blur-[35px] -z-10 animate-pulse-glow"
              />
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Hi, I'm{" "}
            <span className="text-gradient-shimmer">Stranger</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-lg sm:text-xl text-center max-w-xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            I help founders turn their ideas into reality
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 flex justify-center gap-6">
          <button 
            onClick={scrollToAbout}
            className="px-8 py-3 rounded-full font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{ backgroundColor: 'var(--accent)', color: 'white', boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}
          >
            Explore My Work
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-20">
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-1 transition-colors cursor-pointer animate-bounce-subtle"
            style={{ color: "var(--muted)", opacity: 0.4 }}
          >
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
