"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import InteractiveCard from "./interactive-card"

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "TypeScript", "Firebase", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website with 3D elements and animations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Three.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Chat Application",
    description: "An AI-powered chat application with natural language processing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "OpenAI API", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Music Streaming Service",
    description: "A music streaming platform with personalized recommendations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Express", "MongoDB", "Web Audio API"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          My Projects
        </motion.h2>

        {/* Mobile Carousel View */}
        {isMobile && (
          <div className="px-4 mb-8">
            <div className="relative">
              <InteractiveCard hoverEffect="none" className="mb-4">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={projects[activeIndex].image || "/placeholder.svg"}
                    alt={projects[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{projects[activeIndex].title}</h3>
                  <p className="text-muted-foreground mb-4">{projects[activeIndex].description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[activeIndex].tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={projects[activeIndex].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a
                        href={projects[activeIndex].liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </InteractiveCard>

              <div className="flex justify-between mt-4">
                <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-1">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-2 h-2 rounded-full ${idx === activeIndex ? "bg-primary" : "bg-primary/30"}`}
                      onClick={() => setActiveIndex(idx)}
                    />
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Grid View */}
        {!isMobile && (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -10 }}>
                <InteractiveCard hoverEffect={index % 3 === 0 ? "tilt" : index % 3 === 1 ? "glow" : "scale"}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

