"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

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
    title: "Cube Solver",
    description: "An AI-powered Rubik's cube solver using computer vision and advanced algorithms to find optimal solutions.",
    image: "/projects/cube_solver.png",
    tags: ["Python", "OpenCV", "TensorFlow", "React"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
    image: "/projects/ecommerce.png",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    github: "#",
    demo: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team features.",
    image: "/projects/tasks.png",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "#",
  },
  {
    title: "AI Chat Assistant",
    description: "An intelligent chatbot powered by GPT models with context awareness and custom training capabilities.",
    image: "/projects/chat.png",
    tags: ["Python", "FastAPI", "OpenAI", "Redis"],
    github: "#",
    demo: "#",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`project-card group ${project.featured ? "md:col-span-2" : ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out",
        backgroundColor: 'var(--card)',
        borderColor: 'var(--card-border)',
      }}
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden ${project.featured ? "h-64 md:h-80" : "h-48"}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold" style={{ color: 'var(--foreground)', opacity: 0.1 }}>{project.title.charAt(0)}</div>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 transition-colors" style={{ color: 'var(--foreground)' }}>
          {project.title}
        </h3>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-accent/10 border text-accent"
              style={{ borderColor: 'var(--accent)', opacity: 0.8 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-accent"
              style={{ color: 'var(--muted)' }}
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-accent"
              style={{ color: 'var(--muted)' }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pb-32 pt-16 px-4 max-w-5xl mx-auto">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        <span className="text-gradient-shimmer">Projects</span>
      </h2>
      <p className="text-center text-[var(--muted)] mb-12 max-w-2xl mx-auto">
        Here are some of my recent projects that showcase my skills and passion for building innovative solutions.
      </p>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
