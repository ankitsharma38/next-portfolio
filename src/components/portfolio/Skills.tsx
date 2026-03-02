"use client";

import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 95, category: "Frontend" },
      { name: "Next.js", level: 90, category: "Frontend" },
      { name: "TypeScript", level: 88, category: "Frontend" },
      { name: "Tailwind CSS", level: 92, category: "Frontend" },
      { name: "Vue.js", level: 75, category: "Frontend" },
    ],
  },
  {
    name: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 88, category: "Backend" },
      { name: "Python", level: 85, category: "Backend" },
      { name: "PostgreSQL", level: 82, category: "Backend" },
      { name: "MongoDB", level: 78, category: "Backend" },
      { name: "GraphQL", level: 75, category: "Backend" },
    ],
  },
  {
    name: "Tools & Others",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 90, category: "Tools" },
      { name: "Docker", level: 80, category: "Tools" },
      { name: "AWS", level: 72, category: "Tools" },
      { name: "Linux", level: 85, category: "Tools" },
      { name: "Figma", level: 70, category: "Tools" },
    ],
  },
];

interface SkillBarProps {
  skill: Skill;
  delay: number;
}

function SkillBar({ skill, delay }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-[var(--foreground)]">{skill.name}</span>
        <span className="text-xs text-[var(--muted)]">{skill.level}%</span>
      </div>
      <div className="h-2 bg-[var(--card)] rounded-full overflow-hidden border border-[var(--card-border)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCard({ category, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
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
      className="bg-gradient-to-br from-[var(--card)] to-[var(--card-border)] border border-[var(--card-border)] backdrop-blur-md rounded-2xl p-6 card-hover"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease-out",
      }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-lg font-bold text-[var(--foreground)]">{category.name}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-1">
        {category.skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} delay={i * 100 + index * 200} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="pb-32 pt-16 px-4 max-w-5xl mx-auto">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        <span className="text-gradient-shimmer">Skills</span>
      </h2>
      <p className="text-center text-[var(--muted)] mb-12 max-w-2xl mx-auto">
        Technologies and tools I work with to bring ideas to life.
      </p>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.name} category={category} index={index} />
        ))}
      </div>

      {/* Additional Skills Tags */}
      <div className="mt-12 text-center">
        <h4 className="text-sm font-semibold text-[var(--muted)] mb-4 uppercase tracking-wider">
          Also experienced with
        </h4>
        <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
          {[
            "Redis", "WebSockets", "REST APIs", "CI/CD", "Jest", "Cypress",
            "Prisma", "Firebase", "Vercel", "Supabase", "OpenAI", "TensorFlow"
          ].map((skill) => (
            <span
              key={skill}
              className="skill-badge cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
