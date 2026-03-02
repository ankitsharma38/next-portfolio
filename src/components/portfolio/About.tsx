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

// Position mapping: 0 = center/front, 1 = left/back, 2 = right/back
const IMAGE_POSITIONS = [
  { translateX: "0%",    scale: 1,    opacity: 1,    zIndex: 10, filter: "blur(0px)" },
  { translateX: "-45%",  scale: 0.8,  opacity: 0.4,  zIndex: 1,  filter: "blur(2px)" },
  { translateX: "45%",   scale: 0.8,  opacity: 0.4,  zIndex: 1,  filter: "blur(2px)" },
];

function ImageCarousel() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center" style={{ height: 200, overflow: "visible" }}>
      {mindsetImages.map((img, imgIdx) => {
        const posIdx = (imgIdx - (tick % 3) + 3) % 3;
        const pos = IMAGE_POSITIONS[posIdx];
        return (
          <div
            key={imgIdx}
            style={{
              position: "absolute",
              width: "55%",
              height: 200,
              zIndex: pos.zIndex,
              transform: `translateX(${pos.translateX}) scale(${pos.scale})`,
              opacity: pos.opacity,
              filter: pos.filter,
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transformOrigin: "center center",
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ 
                borderRadius: 16, 
                border: "1px solid rgba(124,58,237,0.3)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover"
              />
              {/* Label bar */}
              <div className="absolute bottom-0 left-0 right-0 py-2 px-3"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">
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

/* ══════════════════════════════════════════════════════════════
   TECH STACK
══════════════════════════════════════════════════════════════ */
const techStack = [
  { name: "Node.js",    icon: "⬡" },
  { name: "Tailwind",   icon: "◈" },
  { name: "Docker",     icon: "🐳" },
  { name: "Git",        icon: "◆" },
  { name: "Next.js",    icon: "▲" },
  { name: "React",      icon: "⚛" },
  { name: "TypeScript", icon: "TS" },
  { name: "Python",     icon: "🐍" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Prisma",     icon: "◉" },
];
const marqueeItems = [...techStack, ...techStack];

/* ══════════════════════════════════════════════════════════════
   SECTION TITLE
══════════════════════════════════════════════════════════════ */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <h3 style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1 }}>
        {children}
      </h3>
      <div style={{ marginTop: 6, width: 40, height: 4, borderRadius: 2, background: "#7c3aed" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ANIMATED CARD WRAPPER
   Phase: hidden → entering (fade+slide) → settled (CSS hover active)
══════════════════════════════════════════════════════════════ */
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
      : { opacity: 1, transform: "translateY(0)" }; // explicit transform to prevent "jump" when settling

  return (
    <div
      ref={ref}
      className={`about-card ${phase === "settled" && !noHover ? "about-card-hoverable" : ""} ${className}`}
      style={{ ...entranceStyle, ...style }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN ABOUT SECTION
══════════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <section
      id="about"
      className="about-section pb-32 pt-16 px-4 max-w-5xl mx-auto"
    >
      {/* Content sits above ::before / ::after pseudo overlays */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>

        {/* ───────── ROW 1 ───────── */}

        {/* Name Card */}
        <Card
          className="relative overflow-hidden flex items-center justify-center bg-[#1C1C1F]"
          style={{ padding: "8px 16px", minHeight: 145 }}
          delay={0}
          noHover
        >
          {/* Central radial glow from screenshot */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 text-center flex flex-col items-center" style={{ gap: 16 }}>
            <div>
              <div
                style={{
                  fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
                  background: "linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.5))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,0.35))",
                }}
              >
                PAWEŁ
              </div>
              <div
                style={{
                  fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
                  background: "linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.5))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,0.35))",
                }}
              >
                SZOSTAK
              </div>
            </div>
            <div className="flex flex-col items-center" style={{ gap: 14 }}>
              <div style={{ height: 1, width: 50, background: "rgba(255,255,255,0.1)" }} />
              <span
                style={{
                  fontSize: 10, color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase", letterSpacing: "0.4em", fontWeight: 500
                }}
              >
                Fullstack Developer
              </span>
            </div>
          </div>
        </Card>

        {/* Education bar — interactive card stack */}
        <Card
          className="md:col-span-2 relative overflow-hidden group"
          style={{ padding: 0, height: 145, background: "#1C1C1F" }}
          delay={120}
          noHover
        >
          {/* hover hint label */}
          <div
            className="absolute top-2.5 left-0 right-0 flex justify-center pointer-events-none z-30
                        transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1"
          >
            <span
              style={{
                fontSize: 8, textTransform: "uppercase", letterSpacing: "0.22em",
                color: "rgba(167,139,250,0.6)", fontWeight: 700,
                background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)",
                padding: "3px 12px", borderRadius: 999,
                border: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              Hover to read more
            </span>
          </div>

          {/* Card Stack Container */}
          <div className="absolute inset-0 flex items-end justify-center px-2 pb-0 z-10" style={{ gap: 8 }}>
            {[
              {
                label: "Science Club",
                text: "Active member of GenAI Science at AGH. Training CV models for autonomous systems.",
                variant: "subcard-left"
              },
              {
                label: "University",
                text: "CS & Intelligent Systems at AGH — Ranked #1 IT program in the country.",
                variant: "subcard-mid"
              },
              {
                label: "Competitions",
                text: "3rd Place at Cassini Hackathon and Econverse Startup Finalist. Expert in logic.",
                variant: "subcard-right"
              },
            ].map((col, i) => (
              <div
                key={i}
                className={`education-subcard ${col.variant} relative bg-[#171719] border border-white/5 rounded-xl p-4 flex-1 cursor-default`}
                style={{ minWidth: "33%" }}
              >
                <h4
                  style={{
                    fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "#fff", fontWeight: 800, marginBottom: 6,
                    textAlign: i === 1 ? "center" : "left"
                  }}
                >
                  {col.label}
                </h4>
                <p
                  style={{
                    fontSize: 9, color: "rgba(255,255,255,0.45)", lineHeight: 1.4,
                    textAlign: i === 1 ? "center" : "left"
                  }}
                >
                  {col.text}
                </p>

                {/* Bottom Glow Line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* ───────── ROW 2 ───────── */}

        {/* Mindset Card */}
        <Card className="flex flex-col" style={{ padding: 24, gap: 12, minHeight: 480 }} delay={280}>
          <SectionTitle>Mindset</SectionTitle>

          <p
  style={{
    fontSize: 17,
    fontWeight: 600,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.6
  }}
>
  <strong style={{ color: "#969696", fontWeight: 700 }}>
    Building more than software.
  </strong>{" "}
  
  <span style={{ fontWeight: 390, color: "rgba(255,255,255,0.45)" }}>
    My passions provide the
  </span>{" "}
  
  <strong style={{ color: "#969696", fontWeight: 700 }}>
    discipline and focus
  </strong>{" "}
  
  <span style={{ fontWeight: 390, color: "rgba(255,255,255,0.45)" }}>
    I need to grow.
  </span>
</p>

          {/* Image carousel — 3 stacked rotating images */}
          <ImageCarousel />

          <p
  style={{
    fontSize: 17,
    fontWeight: 600,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.6,
    marginTop: 4
  }}
>
  <strong style={{ color: "#969696", fontWeight: 700 }}>
    Mastering body and mind
  </strong>{" "}
  
  <span style={{ fontWeight: 390, color: "rgba(255,255,255,0.45)" }}>
    is my path to
  </span>{" "}
  
  <strong style={{ color: "#969696", fontWeight: 700 }}>
    excellence
  </strong>.
</p>
        </Card>

        {/* Centre: Portrait (top) + Location (bottom) */}
        <div className="flex flex-col" style={{ gap: 16 }}>

          {/* Portrait – premium container */}
          <div
            className="portrait-card flex-[3]"
            style={{ minHeight: 345, position: "relative" }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Developer portrait"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top",
              }}
            />
            {/* bottom vignette */}
            <div
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(to top, rgba(7,11,20,0.6), transparent)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Location card */}
          <Card
            className="relative overflow-hidden flex-1"
            style={{ minHeight: 118 }}
            delay={360}
            noHover
          >
            {/* Map background */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=700&q=80"
              alt="Cracow map"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", opacity: 0.2,
              }}
            />

            {/* Animated scan line */}
            <div
              className="animate-scan-line"
              style={{
                position: "absolute", top: 0, bottom: 0, width: 1,
                background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.9), transparent)",
                zIndex: 20, pointerEvents: "none",
              }}
            />

            <div
              className="relative z-10 flex flex-col justify-end h-full"
              style={{ padding: 16 }}
            >
              <h3
                style={{
                  fontSize: 20, fontWeight: 900, color: "#ffffff",
                  textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1,
                }}
              >
                Cracow, Poland
              </h3>
              <p style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                50.0647° N, 19.9450° E
              </p>
              <p style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.30)", marginTop: 1 }}>
                − GMT +1
              </p>
            </div>
          </Card>
        </div>

        {/* Craft Card */}
        <Card className="flex flex-col" style={{ padding: 24, gap: 12, minHeight: 480 }} delay={420}>
          <SectionTitle>Craft</SectionTitle>

          <p style={{ fontSize: 17, fontWeight: 390, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
            Building scalable <strong style={{ color: "#969696", fontWeight: 700 }}>apps, websites, and automations</strong>.
          </p>

          <p style={{ fontSize: 17, fontWeight: 390, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            I understand what advantages modern tech can provide, helping me advise on the
            solutions a business actually needs.
          </p>

          {/* ── Infinite marquee — FULL WIDTH lane ── */}
          <div 
            className="relative overflow-hidden" 
            style={{ 
              width: "calc(100% + 48px)",
              margin: "8px -24px",
              padding: "16px 0",
              background: "rgba(0, 0, 0, 0.2)",
              borderTop: "1px solid rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            {/* Fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: 60, background: "linear-gradient(to right, #121214, transparent)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: 60, background: "linear-gradient(to left, #121214, transparent)" }}
            />

            <div className="flex animate-marquee" style={{ gap: 28, width: "max-content" }}>
              {marqueeItems.map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="shrink-0 flex items-center"
                  style={{ gap: 8, cursor: "default" }}
                >
                  <span style={{ fontSize: 11 }}>{tech.icon}</span>
                  <span
                    style={{
                      fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase", letterSpacing: "0.15em", whiteSpace: "nowrap",
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 17, fontWeight: 390, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
              Active Hackathon competitor &amp; Science Club member. Feel free to invite me to collaborate.
            </p>

            {/* Status badge */}
            <div className="flex items-center" style={{ gap: 8 }}>
              <span
                className="animate-pulse"
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }}
              />
              <span style={{ fontSize: 10, color: "#DBDBDB", fontWeight: 500 }}>
                Open to collaboration &amp; freelance
              </span>
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
}
