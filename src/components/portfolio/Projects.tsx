"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Cursor from "./Cursor";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Aura Analytics - AI SaaS",
    description: "A comprehensive AI-powered predictive analytics platform. It features real-time data processing, customizable dashboard widgets, and machine learning model accuracy tracking wrapped in a sleek glassmorphism UI.",
    image: "/projects/ai_saas.png",
    tags: ["Next.js", "Python", "TensorFlow", "TailwindCSS"],
    github: "#",
    demo: "#",
  },
  {
    title: "Astra E-Commerce",
    description: "A premium modern sneaker store with 3D product showcases, hyper-responsive UI, and seamless cart management.",
    image: "/projects/ecommerce.png",
    tags: ["React", "Three.js", "Stripe", "Framer Motion"],
    github: "#",
    demo: "#",
  },
  {
    title: "FinTech Pro Dashboard",
    description: "State-of-the-art fintech dashboard for tracking active investments, spending overview, and real-time crypto movers.",
    image: "/projects/finance.png",
    tags: ["TypeScript", "Next.js", "Prisma", "WebSockets"],
    github: "#",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl col-span-1 flex flex-col h-full shadow-lg transition-transform hover:-translate-y-1"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-black/10 h-44 shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col p-5 flex-grow">
        <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: "var(--foreground)" }}>
          {project.title}
        </h3>
        <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-1 rounded-md font-medium tracking-wide uppercase"
              style={{ 
                backgroundColor: "var(--accent)", 
                color: "white", 
                opacity: 0.9 
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-2">
          {project.demo && (
            <Cursor magnetic>
              <a
                href={project.demo}
                className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-xs font-semibold transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                View Project <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Cursor>
          )}
          
          {project.github && (
            <Cursor magnetic>
              <a
                href={project.github}
                className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-white/5 border"
                style={{
                  color: "var(--foreground)",
                  borderColor: "var(--card-border)",
                }}
              >
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            </Cursor>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative pb-32 pt-24 px-4 max-w-5xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-accent/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          Featured <span className="text-gradient-shimmer">Projects</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          A selection of my recent work, showcasing premium design, interactive animations, and robust functionality.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
