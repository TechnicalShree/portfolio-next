import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import InteractiveSkills from "@/components/interactive-skills"
import BackgroundAnimation from "@/components/background-animation"
import InteractiveCursor from "@/components/interactive-cursor"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundAnimation />
      <InteractiveCursor />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Hero />
        <About />
        <InteractiveSkills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}

