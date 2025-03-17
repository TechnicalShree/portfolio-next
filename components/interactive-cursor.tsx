"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function InteractiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Only show custom cursor on desktop
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible, isMobile])

  // Don't render on mobile devices
  if (isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: isClicking ? 0.8 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              mass: 0.5,
            }}
          />

          {/* Cursor dot */}
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-50 mix-blend-difference"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: isClicking ? 1.5 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 500,
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}

