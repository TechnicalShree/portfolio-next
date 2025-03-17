"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: "tilt" | "glow" | "scale" | "flip" | "none"
}

export default function InteractiveCard({ children, className, hoverEffect = "tilt" }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  // Different hover effects
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "tilt":
        return {
          rotateX: mousePosition.y / 20 - 10,
          rotateY: -(mousePosition.x / 20 - 10),
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }
      case "glow":
        return {
          boxShadow: "0 0 20px 5px rgba(99, 102, 241, 0.3)",
          scale: 1.02,
        }
      case "scale":
        return {
          scale: 1.05,
        }
      case "flip":
        return {
          rotateY: 180,
          transition: { duration: 0.6 },
        }
      case "none":
      default:
        return {}
    }
  }

  return (
    <motion.div
      className={cn("relative perspective-1000 transform-gpu", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ scale: 1 }}
      animate={isHovered ? getHoverAnimation() : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="w-full h-full bg-card border border-border overflow-hidden">
        <CardContent className="p-0">{children}</CardContent>
      </Card>

      {/* Glow effect overlay */}
      {hoverEffect === "glow" && isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 bg-primary opacity-20 rounded-lg blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  )
}

