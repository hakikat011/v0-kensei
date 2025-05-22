"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import gsap from "gsap"

export function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(nameRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
      .fromTo(quoteRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(buttonsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, repeat: -1, yoyo: true },
        "+=0.5",
      )
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-background absolute inset-0 z-[-1]"></div>
      <div className="absolute inset-0 bg-black/50 z-[-1]"></div>

      <div className="container mx-auto px-4 py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Name */}
          <div className="text-left">
            <h1 ref={nameRef} className="text-3xl md:text-5xl font-bold mb-6 tsushima-name">
              HAKIKAT SINGH
            </h1>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="ghost"
                size="lg"
                className="tsushima-button border-2 border-white/70 hover:bg-white/10 text-white"
                onClick={() => scrollToSection("about")}
              >
                The Lore
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="tsushima-button border-2 border-white/70 hover:bg-white/10 text-white"
                onClick={() => scrollToSection("skills")}
              >
                Skills
              </Button>
            </div>
          </div>

          {/* Right side - Quote */}
          <div ref={quoteRef} className="text-right">
            <div className="tsushima-quote-container">
              <p className="tsushima-quote text-lg md:text-xl text-white/90 italic">
                "Truth is not what you want it to be; it is what it is, and you must bend to its power or live a lie."
              </p>
              <p className="tsushima-quote-author text-sm md:text-base text-white/70 mt-2">- Miyamoto Musashi</p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <ChevronDown className="h-10 w-10 text-white animate-bounce" />
      </div>
    </section>
  )
}
