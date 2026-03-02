import Background from "@/components/portfolio/Background";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Animated Background */}
      <Background />

      {/* Fixed Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Footer */}
      <Footer />
    </main>
  );
}
