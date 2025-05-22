"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormMessage({
        type: "success",
        text: "Your message has been sent. I'll respond as soon as possible.",
      })
      setFormState({ name: "", email: "", message: "" })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormMessage(null)
      }, 5000)
    }, 1500)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Create a timeline for the section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "center center",
        scrub: 0.5,
      },
    })

    // Animate the heading with a fade and slight movement
    tl.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })

    // Animate form elements with staggered appearance
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll("input, textarea, button")
      tl.fromTo(formElements, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, "-=0.5")
    }

    // Animate social links with a staggered fade-in
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll("a")
      tl.fromTo(links, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, "-=0.3")
    }

    // Create particles
    const createParticles = () => {
      const particlesContainer = document.querySelector(".particles-container")
      if (!particlesContainer) return

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"

        // Random position, size and animation delay
        const size = Math.random() * 3 + 1
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const delay = Math.random() * 5

        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`
        particle.style.animationDelay = `${delay}s`

        particlesContainer.appendChild(particle)
      }
    }

    createParticles()

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/samurai-kneeling.jpeg"
          alt="Kneeling samurai warrior"
          fill
          className="object-cover opacity-70"
          style={{ transform: "scaleX(-1)" }} // Mirror the image horizontally
          priority
        />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-10"></div>

      {/* Add a subtle highlight effect to make the samurai more visible */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 z-15"></div>
      <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-red-500/5 blur-3xl rounded-full z-5"></div>
      <div className="absolute left-1/3 top-1/2 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-5"></div>

      {/* Particles container */}
      <div className="particles-container absolute inset-0 z-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-30">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">Contact</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left side - Empty space that shows the samurai */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="h-full flex items-center justify-center">
              <div className="w-24 h-0.5 bg-gradient-to-r from-red-500/20 to-transparent absolute right-0"></div>
            </div>
          </div>

          {/* Right side - Contact form and links */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact form */}
            <Card className="border-0 bg-black/40 backdrop-blur-md">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-red-500" />
                  Send a Message
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Your name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="bg-black/50 border-gray-800 focus:border-red-500/50"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Your email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-black/50 border-gray-800 focus:border-red-500/50"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Your message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Your message"
                      rows={5}
                      className="bg-black/50 border-gray-800 focus:border-red-500/50 resize-none"
                      required
                      aria-required="true"
                    />
                  </div>

                  {formMessage && (
                    <div
                      className={`text-sm p-2 rounded ${
                        formMessage.type === "success" ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
                      }`}
                    >
                      {formMessage.text}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-black/80 text-white border border-gray-800 hover:border-red-500/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    aria-live="polite"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center" role="status">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Social links */}
            <div ref={linksRef} className="space-y-3">
              <Card className="border-0 bg-black/40 backdrop-blur-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
                  <div className="space-y-3">
                    <Link
                      href="https://github.com/hakikat011"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-md group hover:bg-black/50"
                    >
                      <div className="bg-black/50 p-2 rounded-full group-hover:bg-red-900/20 transition-colors">
                        <Github className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors">GitHub</span>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/hakikat-singh-7a4b64228/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-md group hover:bg-black/50"
                    >
                      <div className="bg-black/50 p-2 rounded-full group-hover:bg-red-900/20 transition-colors">
                        <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
                    </Link>
                    <Link
                      href="https://discord.com/users/skywalker_011"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-md group hover:bg-black/50"
                    >
                      <div className="bg-black/50 p-2 rounded-full group-hover:bg-red-900/20 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors"
                        >
                          <circle cx="9" cy="12" r="1"></circle>
                          <circle cx="15" cy="12" r="1"></circle>
                          <path d="M7.5 7.2C8.4 6.5 9.7 6 11 6h2c1.3 0 2.6.5 3.5 1.2"></path>
                          <path d="M7.5 16.8C8.4 17.5 9.7 18 11 18h2c1.3 0 2.6-.5 3.5-1.2"></path>
                          <path d="M15.5 17.8c1.2-.7 2-2 2-3.3V9.5c0-1.3-.8-2.6-2-3.3"></path>
                          <path d="M8.5 6.2c-1.2.7-2 2-2 3.3v5c0 1.3.8 2.6 2 3.3"></path>
                        </svg>
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        Discord (skywalker_011)
                      </span>
                    </Link>
                    <Link
                      href="mailto:hakikatsingh011@gmail.com"
                      className="flex items-center gap-3 p-2 rounded-md group hover:bg-black/50"
                    >
                      <div className="bg-black/50 p-2 rounded-full group-hover:bg-red-900/20 transition-colors">
                        <Mail className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        hakikatsingh011@gmail.com
                      </span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for particles */}
      <style jsx>{`
        .particle {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: particleFloat 15s linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
