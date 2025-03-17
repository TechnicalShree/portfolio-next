"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">
          About Me
        </motion.h2>

        <motion.p variants={itemVariants} className="text-lg mb-6 text-muted-foreground">
          I'm a passionate full-stack developer with expertise in modern web technologies. I specialize in building
          responsive, user-friendly applications using Next.js, React, and Node.js.
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg mb-6 text-muted-foreground">
          With a strong foundation in both frontend and backend development, I create seamless experiences that combine
          beautiful interfaces with robust functionality.
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
          I'm constantly learning and exploring new technologies to stay at the forefront of web development.
        </motion.p>
      </motion.div>
    </section>
  )
}

