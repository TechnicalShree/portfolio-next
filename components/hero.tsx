"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { width, height, left, top } = containerRef.current?.getBoundingClientRect() || {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    }

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    setMousePosition({ x, y })
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    aboutSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ opacity }}
    >
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y }}
        className="relative z-10"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Hello, I'm a Developer
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            x: mousePosition.x * -10,
            y: mousePosition.y * -10,
          }}
        >
          I build modern web applications with Next.js, React, and Node.js
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" onClick={scrollToAbout} className="group relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              Explore My Work
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="ml-2"
              >
                <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </motion.div>
            </span>

            <motion.div
              className="absolute inset-0 bg-primary/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>

          <Button size="lg" variant="outline" className="group relative overflow-hidden">
            <span className="relative z-10">Download CV</span>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>

        {/* Interactive typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <TypeWriter texts={["Frontend Developer", "Backend Developer", "Full Stack Developer"]} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </motion.section>
  )
}

// TypeWriter component
function TypeWriter({ texts }: { texts: string[] }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentTextIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(text.substring(0, currentText.length + 1))

          if (currentText === text) {
            setIsDeleting(true)
            setTimeout(() => {}, 1000)
          }
        } else {
          setCurrentText(text.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((currentTextIndex + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 150,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts])

  return (
    <div className="h-8 flex items-center justify-center">
      <span className="text-xl text-muted-foreground">I am a </span>
      <span className="text-xl text-primary font-semibold ml-2">
        {currentText}
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}>
          |
        </motion.span>
      </span>
    </div>
  )
}

