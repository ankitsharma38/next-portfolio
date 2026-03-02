"use client";

import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   MINDSET IMAGE CAROUSEL
══════════════════════════════════════════════════════════════ */
const mindsetImages = [
  {
    src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80",
    label: "Running",
  },
  {
    src: "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=700&q=80",
    label: "Training",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80",
    label: "Mindfulness",
  },
];

const IMAGE_POSITIONS = [
  { translateX: "0%",   scale: 1,   opacity: 1,   zIndex: 10, filter: "blur(0px)" },
  { translateX: "-45%", scale: 0.8, opacity: 0.4, zIndex: 1,  filter: "blur(2px)" },
  { translateX: "45%",  scale: 0.8, opacity: 0.4, zIndex: 1,  filter: "blur(2px)" },
];

function ImageCarousel() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-[200px] flex justify-center items-center overflow-visible">
      {mindsetImages.map((img, imgIdx) => {
        const posIdx = (imgIdx - (tick % 3) + 3) % 3;
        const pos = IMAGE_POSITIONS[posIdx];
        return (
          <div
            key={imgIdx}
            className="absolute w-55% h-[200px] transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center"
            style={{
              width: "55%",
              zIndex: pos.zIndex,
              transform: `translateX(${pos.translateX}) scale(${pos.scale})`,
              opacity: pos.opacity,
              filter: pos.filter,
            }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-[10px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 py-1.5 px-3 bg-linear-to-t from-black/95 to-transparent">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/90 font-bold">
                  {img.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const techStack = [
  { name: "Node.js",    icon: "⬡", color: "#68a063" },
  { name: "Tailwind",   icon: "◈", color: "#38bdf8" },
  { name: "Docker",     icon: "🐳", color: "#2496ed" },
  { name: "Git",        icon: "◆", color: "#f34f29" },
  { name: "Next.js",    icon: "▲", color: "#ffffff" },
  { name: "React",      icon: "⚛", color: "#61dafb" },
  { name: "TypeScript", icon: "TS", color: "#3178c6" },
  { name: "Python",     icon: "🐍", color: "#3776ab" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Prisma",     icon: "◉", color: "#5a67d8" },
];
const marqueeItems = [...techStack, ...techStack, ...techStack, ...techStack];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <h3 className="text-[32px] font-black text-white leading-none tracking-[-0.04em]">
        {children}
      </h3>
      <div className="mt-[6px] w-10 h-1 rounded-full bg-[#7c3aed]" />
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  noHover?: boolean;
}

function Card({ children, className = "", style = {}, delay = 0, noHover = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"hidden" | "entering" | "settled">("hidden");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            setPhase("entering");
            setTimeout(() => setPhase("settled"), 760);
          }, delay);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const entranceStyle: React.CSSProperties =
    phase === "hidden"
      ? { opacity: 0, transform: "translateY(20px)", transition: "none" }
      : phase === "entering"
      ? {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity 0.65s ease, transform 0.65s ease`,
        }
      : { opacity: 1, transform: "translateY(0)" };

  return (
    <div
      ref={ref}
      className={`
        bg-[#1C1C1F] rounded-[18px] border border-white/10 backdrop-blur-[20px] 
        shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 ease-out
        ${phase === "settled" && !noHover ? "hover:border-blue-500/40 hover:shadow-[0_10px_40px_-5px_rgba(59,130,246,0.25),inset_0_0_0_1px_rgba(255,255,255,0.05)]" : ""} 
        ${className}
      `}
      style={{ ...entranceStyle, ...style }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative pb-16 pt-16 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Inline Styles to replace global CSS */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scan-line {
          0% { left: 0%; }
          100% { left: 100%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-marquee-left {
          animation: marquee-left 50s linear infinite;
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background Dot Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.45]" 
           style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* ROW 1: Name & Education */}
        <Card className="flex items-center justify-center min-h-[145px] p-[8px_16px]" noHover>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <div className="space-y-0">
              <div className="text-[38px] font-black tracking-[-0.04em] leading-none text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                ANKIT
              </div>
              <div className="text-[38px] font-black tracking-[-0.04em] leading-none text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                SHARMA
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <div className="h-px w-[50px] bg-white/10" />
              <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-medium italic">
                Fullstack Developer
              </span>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 min-h-[145px] relative overflow-hidden group p-0" noHover delay={120}>
          <div className="absolute top-2.5 left-0 right-0 flex justify-center pointer-events-none z-30 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">
            <span className="text-[8px] uppercase tracking-[0.22em] text-purple-400/60 font-bold bg-white/5 backdrop-blur-md px-3 py-[3px] rounded-full border border-purple-500/15">
              Hover to read more
            </span>
          </div>

          <div className="absolute inset-0 flex items-end justify-center px-0 pb-0 z-10">
            {[
              { label: "Science Club", text: "Active member of GenAI Science at AGH. Training CV models for autonomous systems.", pos: "left" },
              { label: "University", text: "CS & Intelligent Systems at AGH — Ranked #1 IT program in the country.", pos: "mid" },
              { label: "Competitions", text: "3rd Place at Cassini Hackathon and Econverse Startup Finalist. Expert in logic.", pos: "right" },
            ].map((col, i) => (
              <div
                key={i}
                className={`
                  relative flex-none bg-[#171719] border border-white/20 rounded-lg p-5 cursor-default transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] h-[200px]
                  ${col.pos === 'mid' ? 'translate-y-[110px] z-20 rotate-0 hover:translate-y-[78px] hover:scale-[1.02]' : 'translate-y-[130px] z-10'}
                  ${col.pos === 'left' ? '-rotate-1 hover:translate-y-[85px] hover:-rotate-3' : ''}
                  ${col.pos === 'right' ? 'rotate-1 hover:translate-y-[85px] hover:rotate-3' : ''}
                  hover:z-30 hover:border-purple-500/45 hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]
                `}
                style={{ 
                  width: col.pos === 'mid' ? "40%" : "38%", 
                  marginLeft: i === 0 ? 0 : "-10%" 
                }}
              >
                <h4 className={`text-[13px] uppercase tracking-[0.08em] text-white font-black mb-2 ${col.pos === 'mid' ? 'text-center' : col.pos === 'right' ? 'text-right' : ''}`}>
                  {col.label}
                </h4>
                <p className={`text-[12px] text-white/45 leading-relaxed ${col.pos === 'mid' ? 'text-center' : col.pos === 'right' ? 'text-right' : ''}`}>
                  {col.text}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </Card>

        {/* ROW 2: Mindset, Portrait, Location, Craft */}
        <Card className="flex flex-col p-6 min-h-[480px] gap-3" delay={280}>
          <SectionTitle>Mindset</SectionTitle>
          <p className="text-[17px] font-semibold text-white/45 leading-relaxed">
            <strong className="text-[#969696] font-bold">Building more than software.</strong>{" "}
            <span className="font-normal">My passions provide the</span>{" "}
            <strong className="text-[#969696] font-bold">discipline and focus</strong>{" "}
            <span className="font-normal">I need to grow.</span>
          </p>
          <ImageCarousel />
          <p className="text-[17px] font-semibold text-white/45 leading-relaxed mt-1">
            <strong className="text-[#969696] font-bold">Mastering body and mind</strong>{" "}
            <span className="font-normal">is my path to</span>{" "}
            <strong className="text-[#969696] font-bold">excellence</strong>.
          </p>
        </Card>

        <div className="flex flex-col gap-4">
          <div className="relative flex-3 min-h-[345px] rounded-[18px] overflow-hidden border border-white/30 shadow-[0_0_32px_rgba(124,58,237,0.18),0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:shadow-[0_0_48px_rgba(59,130,246,0.35),0_12px_40px_rgba(0,0,0,0.6)]">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Ankit" className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute bottom-0 inset-x-0 h-[35%] bg-linear-to-t from-[#070b14]/60 to-transparent pointer-events-none" />
          </div>

          <Card className="relative flex-1 min-h-[140px] overflow-hidden p-0" noHover delay={360}>
            <img src="/images/map.webp" alt="Cracow map" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 z-5 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-[2px] bg-purple-500 animate-scan-line z-6 pointer-events-none shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <div className="relative z-10 flex flex-col justify-end h-full p-[18px]">
              <h3 className="text-[28px] font-black text-white uppercase tracking-[-0.01em] leading-none">
                Cracow, Poland
              </h3>
              <p className="text-[11px] font-mono text-white/45 mt-0">
                50.0647° N, 19.9450° E
              </p>
              <p className="text-[14px] font-bold text-purple-500 -mb-2 leading-none tracking-tight">
                - GMT+1
              </p>
            </div>
          </Card>
        </div>

        <Card className="flex flex-col p-6 min-h-[480px] gap-3" delay={420}>
          <SectionTitle>Craft</SectionTitle>
          <p className="text-[17px] font-normal text-white/45 leading-relaxed">
            Building scalable <strong className="text-[#969696] font-bold">apps, websites, and automations</strong>.
          </p>
          <p className="text-[17px] font-normal text-white/40 leading-relaxed">
            I understand what advantages modern tech can provide, helping me advise on solutions a business actually needs.
          </p>

          <div className="relative w-[calc(100%+48px)] -mx-6 my-2 py-3 bg-black/30 border-y border-white/10 overflow-hidden">
            <div className="absolute left-0 inset-y-0 w-20 bg-linear-to-r from-[#121214] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-20 bg-linear-to-l from-[#121214] to-transparent z-10 pointer-events-none" />
            <div className="flex w-max gap-2 animate-marquee-left hover:paused">
              {marqueeItems.map((tech, i) => (
                <div key={`${tech.name}-${i}`} className="flex items-center gap-3 px-1">
                  <span className="text-[12px]" style={{ color: tech.color }}>
                    {tech.icon}
                  </span>
                  <span 
                    className="text-[11px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[17px] font-normal text-white/45 leading-relaxed">
              Active Hackathon competitor & Science Club member. Feel free to invite me to collaborate.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-[#DBDBDB] font-medium uppercase tracking-wider">
                Open to collaboration & freelance
              </span>
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
}
