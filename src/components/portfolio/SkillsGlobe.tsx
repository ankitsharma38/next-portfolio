"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, motion } from "framer-motion";
import Image from "next/image";

const skillIcons: Record<string, string> = {
  "React": "/skills/react.png",
  "Node.js": "/skills/node-js.png",
  "Python": "/skills/python-96.png",
  "MongoDB": "/skills/mongo-db-96.png",
  "Docker": "/skills/docker-96.png",
  "Figma": "/skills/figma.png",
  "Git": "/skills/github-64.png",
  "PostgreSQL": "/skills/sql-server.png",
};

const icons = [
  "React", "Node.js", "Python", "MongoDB", "Docker", "Figma", 
  "Git", "PostgreSQL", "Next.js", "TypeScript", "Tailwind", "AWS", 
  "GraphQL", "NestJS", "Redis", "Firebase", "Linux", "Expo", 
  "TensorFlow", "Prisma", "Supabase", "Vercel", "Jest", "Go"
];

const SkillsGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(performance.now());
  const autoRotateSpeed = useRef(0.005);
  const lastScrollY = useRef(0);
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const diff = latest - lastScrollY.current;
      const direction = diff > 0 ? 1 : -1;
      autoRotateSpeed.current = 0.005 * direction;
      lastScrollY.current = latest;
    });
  }, [scrollY]);

  const points = useMemo(() => {
    const radius = 220;
    return icons.map((name, i) => {
      const phi = Math.acos(-1 + (2 * i) / icons.length);
      const theta = Math.sqrt(icons.length * Math.PI) * phi;
      return {
        name,
        baseX: radius * Math.cos(theta) * Math.sin(phi),
        baseY: radius * Math.sin(theta) * Math.sin(phi),
        baseZ: radius * Math.cos(phi),
      };
    });
  }, []);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      if (!isDragging) {
        setCurrentRotation((prev) => ({
          x: prev.x + autoRotateSpeed.current + velocity.current.x,
          y: prev.y + autoRotateSpeed.current * 0.5 + velocity.current.y,
        }));
        
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;
        
        if (Math.abs(autoRotateSpeed.current) > 0.005) {
            autoRotateSpeed.current *= 0.98;
        }
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = currentRotation;
    velocity.current = { x: 0, y: 0 };
    lastTime.current = performance.now();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = now - lastTime.current;
    
    if (dt > 0) {
        velocity.current = {
            y: (e.clientX - lastMousePos.current.x) * 0.01,
            x: -(e.clientY - lastMousePos.current.y) * 0.01,
        };
    }

    setCurrentRotation({
      x: rotationStart.current.x - (e.clientY - dragStart.current.y) * 0.01,
      y: rotationStart.current.y + (e.clientX - dragStart.current.x) * 0.01,
    });
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000 select-none overflow-hidden"
      onMouseDown={handleMouseDown}
      ref={containerRef}
    >
      {/* 3D Wireframe Mesh Backdrop */}
      <motion.div 
        className="absolute w-[500px] h-[500px] opacity-20 pointer-events-none"
        style={{
          rotateX: currentRotation.x * 50,
          rotateY: currentRotation.y * 50,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-violet-500">
          <defs>
            <radialGradient id="ringGrad">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Latitude Lines */}
          {[...Array(8)].map((_, i) => (
            <ellipse 
              key={`lat-${i}`}
              cx="50" cy="50" rx="48" ry={10 + i * 8}
              fill="none" stroke="currentColor" strokeWidth="0.1"
              style={{ opacity: 0.3 }}
            />
          ))}
          {/* Longitude Lines */}
          {[...Array(8)].map((_, i) => (
            <ellipse 
              key={`lon-${i}`}
              cx="50" cy="50" rx={10 + i * 8} ry="48"
              fill="none" stroke="currentColor" strokeWidth="0.1"
              style={{ opacity: 0.3 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Decorative inner glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[80px] pointer-events-none" />

      {points.map((point) => {
        const cosY = Math.cos(currentRotation.y);
        const sinY = Math.sin(currentRotation.y);
        const x1 = point.baseX * cosY + point.baseZ * sinY;
        const z1 = -point.baseX * sinY + point.baseZ * cosY;

        const cosX = Math.cos(currentRotation.x);
        const sinX = Math.sin(currentRotation.x);
        const y2 = point.baseY * cosX - z1 * sinX;
        const z2 = point.baseY * sinX + z1 * cosX;

        const scale = (z2 + 500) / 500;
        const opacity = (z2 + 250) / 500 + 0.1;
        
        // Only show name when the item is in the foreground (front of the globe)
        const isFrontend = z2 > 100;
        const nameOpacity = Math.max(0, (z2 - 100) / 120);

        return (
          <motion.div
            key={point.name}
            className="absolute flex flex-col items-center justify-center"
            style={{
              x: x1,
              y: y2,
              scale: Math.max(0.4, scale),
              opacity: Math.max(0.05, opacity),
              zIndex: Math.round(z2 + 500),
            }}
          >
            <div className={`relative flex flex-col items-center group transition-all duration-500`}>
                {/* Icon Container */}
                <div className={`
                    w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center p-1
                    transition-all duration-500
                    ${isFrontend 
                        ? "scale-110 opacity-100" 
                        : "opacity-40"}
                `}>
                    {skillIcons[point.name] ? (
                        <div className="relative w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                            <Image 
                                src={skillIcons[point.name]} 
                                alt={point.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-white/60">
                            {point.name.charAt(0)}
                        </span>
                    )}
                </div>

                {/* Conditional Name Display - Only if in the front */}
                <motion.span 
                    className="mt-0.5 whitespace-nowrap text-[10px] font-bold tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    style={{ opacity: nameOpacity }}
                >
                    {point.name}
                </motion.span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsGlobe;
