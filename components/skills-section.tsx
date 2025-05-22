"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Database, Cpu, LineChart, Braces, Zap } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
// Import the debounce function at the top of the file
import { debounce } from "@/lib/utils"

type Skill = {
  name: string
  level: number // 0-100
}

type SkillCategory = {
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Backend & Systems",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "Python", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Databases", level: 80 },
    ],
  },
  {
    name: "CI/CD & Automation",
    icon: <Zap className="h-5 w-5" />,
    skills: [
      { name: "GitHub Actions", level: 85 },
      { name: "Vercel", level: 90 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    name: "AI/ML Engineering",
    icon: <Cpu className="h-5 w-5" />,
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "NLP", level: 90 },
      { name: "Reinforcement Learning", level: 85 },
    ],
  },
  {
    name: "Quantitative Development",
    icon: <LineChart className="h-5 w-5" />,
    skills: [
      { name: "Algorithmic Trading", level: 90 },
      { name: "Risk Management", level: 85 },
      { name: "Data Ingestion", level: 80 },
      { name: "LEAN Framework", level: 82 },
    ],
  },
  {
    name: "Simulations",
    icon: <Braces className="h-5 w-5" />,
    skills: [
      { name: "CUDA", level: 85 },
      { name: "Quantum Monte Carlo", level: 80 },
      { name: "Hybrid HHL Solvers", level: 75 },
    ],
  },
  {
    name: "Full-Stack Development",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Supabase", level: 80 },
    ],
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(skillCategories[0].name)

  // Add this helper function at the top of the component (before the return statement)
  const sanitizeClassName = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/-+/g, "-")
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Debounced scroll handler for better performance
    const handleScroll = debounce(() => {
      // Your scroll handling code
      if (activeTab) {
        const tabId = sanitizeClassName(activeTab)
        const visibleSkillBars = document.querySelectorAll(`.tab-${tabId} .skill-progress`)
        visibleSkillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width")
          const rect = bar.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0

          if (isVisible && width) {
            gsap.to(bar, {
              width: width,
              duration: 1.5,
              ease: "power2.out",
            })
          }
        })
      }
    }, 20)

    window.addEventListener("scroll", handleScroll)

    // Parallax effect for the section background
    gsap.to(".skills-bg-image", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      },
    )

    // Reset and animate skill bars when tab changes
    const animateSkillBars = () => {
      // Reset all skill bars first
      const allSkillBars = document.querySelectorAll(".skill-progress")
      allSkillBars.forEach((bar) => {
        gsap.set(bar, { width: "0%" })
      })

      // Animate the visible skill bars
      const visibleSkillBars = document.querySelectorAll(`.tab-${sanitizeClassName(activeTab)} .skill-progress`)
      visibleSkillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: width,
            duration: 1.5,
            ease: "power2.out",
          },
        )
      })
    }

    // Initial animation
    animateSkillBars()

    // Create a ScrollTrigger for each tab content
    skillCategories.forEach((category) => {
      const tabId = sanitizeClassName(category.name)

      ScrollTrigger.create({
        trigger: `.tab-${tabId}`,
        start: "top 90%",
        onEnter: () => {
          const visibleSkillBars = document.querySelectorAll(`.tab-${tabId} .skill-progress`)
          visibleSkillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width")
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: width,
                duration: 1.5,
                ease: "power2.out",
              },
            )
          })
        },
        onLeaveBack: () => {
          const visibleSkillBars = document.querySelectorAll(`.tab-${tabId} .skill-progress`)
          visibleSkillBars.forEach((bar) => {
            gsap.set(bar, { width: "0%" })
          })
        },
      })
    })

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [activeTab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 neo-skills-section relative overflow-hidden section-texture"
    >
      {/* Background with samurai silhouette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="skills-bg-image absolute inset-0 w-full h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%207.10.08%20PM-hoHgLgal7aEmenuA7AVlQKfs7CSbwm.jpeg"
            alt="Samurai background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/80 z-1"></div>
      </div>

      {/* Red accent glow */}
      <div className="absolute inset-0 z-2 bg-gradient-radial from-red-900/10 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-16 text-center neo-text">
          Technical <span className="neo-red-gradient-text">Skills</span>
        </h2>

        <Tabs defaultValue={skillCategories[0].name} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 neo-tabs-list">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name} className="flex items-center gap-2 neo-tab">
                {category.icon}
                <span className="hidden md:inline neo-tab-text">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name}
              className={`tab-${sanitizeClassName(category.name)}`}
            >
              <Card className="neo-skill-card">
                <CardContent className="pt-6">
                  <div className="neo-card-decoration"></div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 neo-skill-category-title">
                    {category.icon}
                    {category.name}
                  </h3>

                  <div className="neo-skills-grid" ref={skillsRef}>
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="neo-skill-item">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium neo-skill-name">{skill.name}</span>
                          <span className="neo-skill-percentage">{skill.level}%</span>
                        </div>
                        <div className="neo-skill-bar">
                          <div className="skill-progress" data-width={`${skill.level}%`} style={{ width: "0%" }}>
                            <div className="neo-skill-glow"></div>
                          </div>
                          <div className="neo-skill-grid-lines">
                            {[...Array(10)].map((_, i) => (
                              <div key={i} className="neo-skill-grid-line" style={{ left: `${i * 10}%` }}></div>
                            ))}
                          </div>
                        </div>
                        <div className="neo-skill-scale">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
