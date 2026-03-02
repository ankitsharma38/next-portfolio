"use client";

import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Email", icon: Mail, href: "email.dev" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="other" className="pb-16 pt-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mb-12" />

        {/* Contact Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="text-gradient-shimmer">Let's Connect</span>
          </h2>
          <p className="text-[var(--muted)] max-w-md mx-auto mb-6">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Contact Button */}
          <a
            href="mailto:hello.dev"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Say Hello
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="w-12 h-12 rounded-full glass-strong flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-violet-500/30 group"
              style={{ boxShadow: "var(--shadow-elevation-low)" }}
              aria-label={link.name}
            >
              <link.icon className="w-5 h-5 text-[var(--muted)] group-hover:text-violet-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--muted)]">
            <span>© {currentYear} Ankit Sharma</span>
            <span className="text-violet-500">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
