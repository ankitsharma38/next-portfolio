"use client";

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";

const suggestions = ["Work", "About me", "Skills", "Contact"];

export default function Hero() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    console.log("Message:", message);
    setMessage("");
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ scrollMarginTop: "120px", paddingTop: "6rem", paddingBottom: "8rem" }}
    >
      {/* Top gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Avatar and Title */}
        <div className="text-center mb-4">
          {/* Avatar Circle */}
          <div className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center z-0">
              {/* Glow effect */}
              <div
                className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-violet-600/10 blur-[35px] -z-10 animate-pulse-glow"
              />
              {/* Avatar container */}
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/20 flex items-center justify-center overflow-hidden">
                  {/* Avatar placeholder with initials */}
                  <span className="text-4xl sm:text-5xl font-bold text-gradient-shimmer">PS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Hi, I'm{" "}
            <span className="text-gradient-shimmer">Stranger</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-lg sm:text-xl text-center max-w-xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            I help founders turn their ideas into reality
          </p>
        </div>

        {/* AI Chat Interface Card */}
        <div
          className="mt-8 bg-white/2 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden"
          style={{ opacity: 1 }}
        >
          {/* Chat Messages Area */}
          <div
            className="flex flex-col gap-1 overflow-y-auto scrollbar-hide h-72 sm:h-64 p-3"
          >
            <div className="flex-1 flex items-center justify-center">
              <p
                className="text-xs text-center"
                style={{ color: "var(--muted)", opacity: 0.5 }}
              >
                Ask me anything about Stranger...
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Input Area */}
          <div className="p-4">
            <div className="flex flex-col">
              {/* Suggestion Buttons */}
              <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-xs rounded-full border px-3 py-1.5 transition-transform disabled:opacity-50 hover:border-violet-500 hover:text-white active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--card-border)",
                      color: "var(--muted)",
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="relative">
                <div
                  className="flex items-center gap-2 rounded-full border px-4 py-1.5"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--card-border)",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
                  }}
                >
                  <textarea
                    rows={1}
                    placeholder="Ask anything about Stranger..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none resize-none overflow-hidden py-2 leading-tight placeholder:opacity-50"
                    style={{ color: "var(--foreground)", caretColor: "var(--accent)" }}
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-white transition-transform disabled:opacity-0 disabled:scale-90 hover:opacity-90 hover:scale-105"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-1 text-white/30 hover:text-white/50 transition-colors cursor-pointer animate-bounce-subtle"
          >
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
