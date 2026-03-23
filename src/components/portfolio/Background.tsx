"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        backgroundRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        backgroundRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 -z-50 h-full w-full transition-colors duration-500 ease-in-out pointer-events-none"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Base background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--background)" }}
      />

      {/* Dot pattern base - subtle dots */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Mouse-following soft glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--accent), transparent 85%)`,
          opacity: 0.08
        }}
      />

      {/* Mouse-following dot highlight - glowing dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--accent) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)",
          opacity: 0.3
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, transparent 40%, var(--background) 100%)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
