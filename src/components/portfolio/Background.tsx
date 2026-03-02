"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        backgroundRef.current.style.setProperty("--mouse-x", `${x}%`);
        backgroundRef.current.style.setProperty("--mouse-y", `${y}%`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 h-full w-full transition-colors duration-500 ease-in-out pointer-events-none">
      {/* Base background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgb(10, 10, 15)" }}
      />



      {/* Dot pattern base */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgb(255, 255, 255) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.05,
        }}
      />



      {/* Mouse-following dot highlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: "radial-gradient(rgb(255, 255, 255) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.4,
          maskImage: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), black, transparent)",
          WebkitMaskImage: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), black, transparent)",
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, transparent 40%, rgb(10, 10, 15) 100%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
