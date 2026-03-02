"use client";

import { useState } from "react";
import { Moon, Sun, Calendar, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Other", href: "#other" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleNavClick = (href: string) => {
    setActiveSection(href.replace("#", ""));
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6">
      <nav className="max-w-350 mx-auto px-6 md:px-8 lg:px-12">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center relative">
          {/* Theme Toggle - Left */}
          <div className="absolute left-0">
            <button
              className="relative w-14 h-14 rounded-full glass-strong flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ boxShadow: "var(--shadow-elevation-low)" }}
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
            >
              <div
                className="absolute transition-all duration-300"
                style={{ opacity: isDark ? 1 : 0, transform: isDark ? "none" : "scale(0) rotate(-180deg)" }}
              >
                <Moon className="w-5 h-5 text-white" />
              </div>
              <div
                className="absolute transition-all duration-300"
                style={{ opacity: isDark ? 0 : 1, transform: isDark ? "scale(0) rotate(180deg)" : "none" }}
              >
                <Sun className="w-5 h-5 text-amber-500" />
              </div>
            </button>
          </div>

          {/* Nav Links - Center */}
          <div
            className="flex items-center gap-1 glass-strong rounded-full shadow-xl shadow-black/10 h-14 px-8"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="nav-link relative text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer flex items-center"
                style={{
                  color: activeSection === item.name.toLowerCase() ? "var(--foreground)" : "var(--muted)",
                }}
              >
                {activeSection === item.name.toLowerCase() && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--accent)", border: "1px solid var(--accent)", opacity: 0.1 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Book a Call - Right */}
          <div className="absolute right-0">
            <button
              className="glass-strong rounded-full shadow-xl shadow-black/10 flex items-center gap-2 text-sm font-semibold transition-transform duration-300 hover:scale-105 h-14 px-6"
              style={{ color: "var(--foreground)" }}
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Call</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center justify-between relative">
          {/* Theme Toggle - Left */}
          <div className="absolute left-0">
            <button
              className="relative w-12 h-12 rounded-full glass-strong flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ boxShadow: "var(--shadow-elevation-low)" }}
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
            >
              <Moon className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Hamburger Menu - Center */}
          <button
            className="glass-strong rounded-full shadow-xl shadow-black/10 p-4 mx-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" style={{ color: "var(--foreground)" }} />
            ) : (
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="block h-0.5 w-5 rounded-full transition-transform duration-300" style={{ background: "var(--foreground)" }} />
                <span className="block h-0.5 w-5 rounded-full transition-opacity duration-300" style={{ background: "var(--foreground)" }} />
                <span className="block h-0.5 w-5 rounded-full transition-transform duration-300" style={{ background: "var(--foreground)" }} />
              </div>
            )}
          </button>

          {/* Book a Call - Right */}
          <div className="absolute right-0">
            <button
              className="glass-strong rounded-full shadow-xl shadow-black/10 flex items-center gap-2 text-sm font-semibold transition-transform duration-300 px-4 py-3"
              style={{ color: "var(--foreground)" }}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book a Call</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4">
            <div className="glass-strong rounded-2xl shadow-xl shadow-black/10 p-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="relative text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer text-center py-3"
                    style={{
                      color: activeSection === item.name.toLowerCase() ? "var(--foreground)" : "var(--muted)",
                      background: activeSection === item.name.toLowerCase() ? "var(--accent)" : "transparent",
                      opacity: activeSection === item.name.toLowerCase() ? 1 : 0.8,
                    }}
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  className="flex items-center justify-center gap-2 text-sm font-semibold rounded-full transition-transform duration-300 mt-2 hover:scale-[1.02] py-3"
                  style={{ color: "var(--foreground)", border: "1px solid var(--card-border)" }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Call</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
