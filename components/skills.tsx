"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Server, Layout, Database, Layers } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="h-6 w-6" />,
    items: ["Next.js", "React.js", "Framer Motion", "Three.js", "MUI", "Mantine"],
  },
  {
    category: "Backend",
    icon: <Server className="h-6 w-6" />,
    items: ["Node.js", "Express", "RESTful APIs"],
  },
  {
    category: "Languages",
    icon: <Code className="h-6 w-6" />,
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    icon: <Layers className="h-6 w-6" />,
    items: ["Frappe", "Laravel Livewire"],
  },
  {
    category: "Database",
    icon: <Database className="h-6 w-6" />,
    items: ["MongoDB", "MySQL", "PostgreSQL"],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-full mr-3 text-primary">{skill.icon}</div>
                <h3 className="text-xl font-semibold">{skill.category}</h3>
              </div>

              <ul className="space-y-2">
                {skill.items.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.2 }}
                      className="w-2 h-2 rounded-full bg-primary mr-2"
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

