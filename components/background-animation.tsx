"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTouching, setIsTouching] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => setIsReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleReducedMotionChange)

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const setCanvasDimensions = () => {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class with interactive behaviors
    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      hue: number
      originalX: number
      originalY: number
      density: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.originalX = this.x
        this.originalY = this.y
        this.baseSize = Math.random() * 3 + 1
        this.size = this.baseSize
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.hue = Math.random() * 60 + 240
        this.color = `hsl(${this.hue}, 70%, 60%)`
        this.density = Math.random() * 30 + 1
      }

      update(mouseX?: number, mouseY?: number, isTouching?: boolean) {
        // Return to original position when not interacting
        if (!isTouching && (mouseX === undefined || mouseY === undefined)) {
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          if (Math.abs(dx) > 0.1) {
            this.x += dx * 0.05
          }

          if (Math.abs(dy) > 0.1) {
            this.y += dy * 0.05
          }

          // Add some gentle movement
          this.x += this.speedX * 0.2
          this.y += this.speedY * 0.2
        }

        // Mouse/touch interaction
        if (mouseX !== undefined && mouseY !== undefined) {
          const dx = mouseX - this.x
          const dy = mouseY - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance

          // Maximum distance for interaction
          const maxDistance = 100
          const force = (maxDistance - distance) / maxDistance

          if (distance < maxDistance && isTouching) {
            // Push particles away from touch/mouse
            this.x -= forceDirectionX * force * this.density
            this.y -= forceDirectionY * force * this.density
            this.size = this.baseSize + force * 3
            this.color = `hsl(${this.hue}, 90%, 70%)`
          } else {
            this.size = this.baseSize
            this.color = `hsl(${this.hue}, 70%, 60%)`
          }
        }

        // Boundary check with bounce effect
        if (this.x > window.innerWidth) {
          this.x = window.innerWidth
          this.speedX = -this.speedX
        } else if (this.x < 0) {
          this.x = 0
          this.speedX = -this.speedX
        }

        if (this.y > window.innerHeight) {
          this.y = window.innerHeight
          this.speedY = -this.speedY
        } else if (this.y < 0) {
          this.y = 0
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - fewer on mobile for performance
    const particles: Particle[] = []
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 30 : 80

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId: number

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight)
      gradient.addColorStop(0, "rgba(22, 31, 37, 0.7)")
      gradient.addColorStop(1, "rgba(30, 41, 59, 0.7)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mousePosition.x, mousePosition.y, isTouching)
        particle.draw()
      })

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)"
      ctx.lineWidth = 0.5

      // Limit connections on mobile for performance
      const connectionDistance = isMobile ? 80 : 120

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw interactive area around mouse/touch
      if (mousePosition.x && mousePosition.y && isTouching) {
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(99, 102, 241, 0.1)"
        ctx.fill()
      }

      // Reduce animation frame rate on mobile for better performance
      if (isMobile) {
        setTimeout(() => {
          animationId = requestAnimationFrame(animate)
        }, 1000 / 30) // 30fps on mobile
      } else {
        animationId = requestAnimationFrame(animate)
      }
    }

    // Only start animation if reduced motion is not preferred
    if (!isReducedMotion) {
      animate()
    } else {
      // Draw static version for reduced motion preference
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight)
      gradient.addColorStop(0, "rgba(22, 31, 37, 0.7)")
      gradient.addColorStop(1, "rgba(30, 41, 59, 0.7)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      particles.forEach((particle) => {
        particle.draw()
      })
    }

    // Mouse and touch event handlers
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseDown = () => setIsTouching(true)
    const handleMouseUp = () => setIsTouching(false)

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      setMousePosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      })
    }

    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true)
      setMousePosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      })
    }

    const handleTouchEnd = () => setIsTouching(false)

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationId)
    }
  }, [mousePosition, isTouching, isReducedMotion])

  return (
    <motion.div
      className="fixed inset-0 -z-10 opacity-70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full touch-none" />
    </motion.div>
  )
}

