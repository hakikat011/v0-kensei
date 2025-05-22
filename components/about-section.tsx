"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, Database, LineChart } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export function AboutSection() {
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    })

    tl.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(photoRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(bioRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.5")

    if (cardsRef.current) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-black/90 overflow-hidden section-texture">
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-16 text-center tsushima-name">
          The <span className="text-gradient">Lore</span>
        </h2>

        {/* Top section: Image (left) and About Me text (right) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
          {/* Photo Section - 2/3 width on large screens */}
          <div
            ref={photoRef}
            className="lg:w-2/3 relative overflow-hidden rounded-lg shadow-xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative aspect-[4/3] w-full">
              {/* Sketchy animated image (default) */}
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sketchy-animated.jpg-Ywytp9nWnueFqziZFYb4DiMiLhd7MN.jpeg"
                alt="Hakikat Singh"
                fill
                className={`object-cover transition-opacity duration-500 ${isHovering ? "opacity-0" : "opacity-100"}`}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Clear profile image (on hover) */}
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hakikat-profile.jpg-UnrGbzQqXuBpOHwFH2II7F7SbtoXBj.jpeg"
                alt="Hakikat Singh"
                fill
                className={`object-cover transition-opacity duration-500 ${isHovering ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 border-2 border-white/10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white tsushima-name">Hakikat Singh</h3>
            </div>
          </div>

          {/* About Me Text - 1/3 width on large screens */}
          <div ref={bioRef} className="lg:w-1/3 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 neo-text">About Me</h3>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4 text-gray-200">
                I am a passionate developer and researcher specializing in financial engineering, quantitative analysis,
                and AI-driven solutions. With a background in both software development and financial mathematics, I
                bridge the gap between technology and finance.
              </p>
              <p className="mb-4 text-gray-200">
                My expertise lies in developing sophisticated algorithms for financial modeling, risk assessment, and
                optimization, with a particular interest in applying machine learning techniques to solve complex
                financial problems.
              </p>
              <p className="mb-4 text-gray-200">
                I'm a big FC Barcelona fan and enjoy following their matches whenever I can. The team's philosophy of
                beautiful, strategic play resonates with my approach to problem-solving in technology.
              </p>
              <p className="text-gray-200">
                I'm dedicated to pushing the boundaries of what's possible at the intersection of technology and
                finance, creating innovative solutions that drive real-world impact in the financial sector.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section: Four skills cards in a grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card className="neo-card border-0 bg-black/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="card-decoration"></div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI & Machine Learning</h3>
                <p className="text-muted-foreground">
                  Developing sophisticated algorithms for financial modeling, risk assessment, and optimization using
                  cutting-edge machine learning techniques.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card border-0 bg-black/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="card-decoration"></div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quantum Computing</h3>
                <p className="text-muted-foreground">
                  Researching and implementing quantum algorithms for solving complex computational problems in finance
                  and optimization.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card border-0 bg-black/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="card-decoration"></div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Stack Development</h3>
                <p className="text-muted-foreground">
                  Building modern, responsive web applications with Next.js, React, and other cutting-edge technologies
                  for financial and data-driven solutions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card border-0 bg-black/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="card-decoration"></div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quantitative Finance</h3>
                <p className="text-muted-foreground">
                  Applying mathematical models and statistical techniques to analyze financial markets, develop trading
                  strategies, and optimize investment portfolios.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
