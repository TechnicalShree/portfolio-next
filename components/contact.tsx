"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react"
import InteractiveCard from "./interactive-card"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

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

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "#", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, url: "#", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, url: "#", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, url: "mailto:example@example.com", label: "Email" },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-0">
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <InteractiveCard hoverEffect={isMobile ? "none" : "glow"}>
              <div className="p-6">
                <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-4">
                  Contact Me
                </motion.h3>

                <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
                  I'm currently available for freelance work and full-time positions. If you have a project that needs
                  some creative work, feel free to contact me.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </motion.a>
                  ))}
                </motion.div>

                {/* Interactive map or location */}
                <motion.div
                  variants={itemVariants}
                  className="w-full h-40 bg-muted rounded-lg overflow-hidden relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive Map Placeholder</p>
                  </div>
                </motion.div>
              </div>
            </InteractiveCard>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <InteractiveCard hoverEffect={isMobile ? "none" : "tilt"}>
              <div className="p-6">
                {!isSubmitted ? (
                  <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-card"
                      />
                      <motion.div
                        className="h-0.5 bg-primary mt-0.5"
                        initial={{ width: "0%" }}
                        animate={{ width: formData.name ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-card"
                      />
                      <motion.div
                        className="h-0.5 bg-primary mt-0.5"
                        initial={{ width: "0%" }}
                        animate={{ width: formData.email ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="bg-card"
                      />
                      <motion.div
                        className="h-0.5 bg-primary mt-0.5"
                        initial={{ width: "0%" }}
                        animate={{ width: formData.message ? `${Math.min(100, formData.message.length / 2)}%` : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <Button type="submit" className="w-full group" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                          className="mr-2"
                        >
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </motion.div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary/10 p-8 rounded-lg text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your message has been sent successfully. I'll get back to you as soon as possible.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({ name: "", email: "", message: "" })
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </div>
            </InteractiveCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Add missing useEffect import

