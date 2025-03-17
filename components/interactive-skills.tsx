"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Code, Server, Layout, Database, Layers } from "lucide-react"
import { useInView } from "framer-motion"
import InteractiveCard from "./interactive-card"

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="h-6 w-6" />,
    items: ["Next.js", "React.js", "Framer Motion", "Three.js", "MUI", "Mantine"],
    color: "#6366f1",
  },
  {
    category: "Backend",
    icon: <Server className="h-6 w-6" />,
    items: ["Node.js", "Express", "RESTful APIs"],
    color: "#8b5cf6",
  },
  {
    category: "Languages",
    icon: <Code className="h-6 w-6" />,
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
    color: "#ec4899",
  },
  {
    category: "Frameworks",
    icon: <Layers className="h-6 w-6" />,
    items: ["Frappe", "Laravel Livewire"],
    color: "#14b8a6",
  },
  {
    category: "Database",
    icon: <Database className="h-6 w-6" />,
    items: ["MongoDB", "MySQL", "PostgreSQL"],
    color: "#f59e0b",
  },
]

export default function InteractiveSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Skill bubble animation for the interactive visualization
  const SkillBubble = ({ skill, index }) => {
    const controls = useAnimation()
    const bubbleRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
      // Random position within container
      const randomX = Math.random() * 80 - 40
      const randomY = Math.random() * 80 - 40
      setPosition({ x: randomX, y: randomY })

      // Start floating animation
      controls.start({
        x: [randomX, randomX + 10, randomX - 5, randomX],
        y: [randomY, randomY - 10, randomY + 5, randomY],
        transition: {
          duration: 5 + Math.random() * 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        },
      })
    }, [controls])

    return (
      <motion.div
        ref={bubbleRef}
        animate={controls}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.2, zIndex: 10 }}
        whileTap={{ scale: 0.9 }}
        className="absolute rounded-full flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: skill.color,
          width: `${Math.max(30, skill.items.length * 10)}px`,
          height: `${Math.max(30, skill.items.length * 10)}px`,
          left: `calc(50% + ${position.x}px)`,
          top: `calc(50% + ${position.y}px)`,
        }}
        onClick={() => setActiveSkill(index)}
      >
        <div className="text-white text-xs font-bold">{skill.category}</div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          My Skills
        </motion.h2>

        {/* Interactive skill visualization */}
        <motion.div
          className="relative h-60 mb-12 overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {skills.map((skill, index) => (
            <SkillBubble key={index} skill={skill} index={index} />
          ))}

          {/* Center point with connections */}
          <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />

          {/* Skill detail popup */}
          <AnimatePresence>
            {activeSkill !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setActiveSkill(null)}
              >
                <motion.div
                  className="bg-card p-6 rounded-lg max-w-md"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="p-2 rounded-full mr-3"
                      style={{ backgroundColor: `${skills[activeSkill].color}20`, color: skills[activeSkill].color }}
                    >
                      {skills[activeSkill].icon}
                    </div>
                    <h3 className="text-xl font-semibold">{skills[activeSkill].category}</h3>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {skills[activeSkill].items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1, duration: 0.2 }}
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: skills[activeSkill].color }}
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    className="text-sm text-primary hover:underline"
                    onClick={() => setActiveSkill(null)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Regular skill cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants} custom={index}>
              <InteractiveCard hoverEffect={isMobile ? "none" : index % 2 === 0 ? "tilt" : "glow"} className="h-full">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className="p-2 rounded-full mr-3"
                      style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{skill.category}</h3>
                  </div>

                  <ul className="space-y-2">
                    {skill.items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1, duration: 0.2 }}
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

