"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Briefcase, Code } from "lucide-react"

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

    if (timelineRef.current) {
      const items = timelineRef.current.children
      gsap.fromTo(
        items,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="experience-section py-20 md:py-32 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-16 text-center tsushima-name text-amber-50">
          <span className="text-red-500">Chronicles</span>
        </h2>

        <div ref={timelineRef} className="experience-grid">
          {/* Experience Item 1 */}
          <div className="experience-item">
            <div className="experience-content">
              <div className="experience-icon">
                <Briefcase className="h-6 w-6 text-red-500" />
              </div>
              <div className="experience-date">
                <span className="text-amber-400">2024 - Present</span>
              </div>
              <h3 className="experience-title">Lead Developer</h3>
              <h4 className="experience-company">IMBUEIT (US Tech Startup)</h4>
              <p className="experience-description">
                Built a social crowdfunding platform (LinkedIn meets Kickstarter) using Next.js and Supabase. Led a team
                of 3 interns to automate CI/CD workflows, slashing deployment time by 40%. Designed a clean UI with
                TailwindCSS, improving user retention by 15%.
              </p>
              <div className="experience-skills">
                <Badge variant="outline" className="experience-badge">
                  Next.js
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Supabase
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  TailwindCSS
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  CI/CD
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Team Leadership
                </Badge>
              </div>
            </div>
          </div>

          {/* Experience Item 2 */}
          <div className="experience-item">
            <div className="experience-content">
              <div className="experience-icon">
                <Code className="h-6 w-6 text-red-500" />
              </div>
              <div className="experience-date">
                <span className="text-amber-400">2023 - Present</span>
              </div>
              <h3 className="experience-title">AI & Quant Researcher</h3>
              <h4 className="experience-company">Independent</h4>
              <p className="experience-description">
                Designed an RL-based trading bot achieving 12% MoM returns in volatile markets. Built a system
                integrating NLP sentiment analysis with QuantConnect backtesting. Created an NLP framework to validate
                AI models pre-deployment.
              </p>
              <div className="experience-skills">
                <Badge variant="outline" className="experience-badge">
                  Reinforcement Learning
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  NLP
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  QuantConnect
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Algorithmic Trading
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Sentiment Analysis
                </Badge>
              </div>
            </div>
          </div>

          {/* Experience Item 3 */}
          <div className="experience-item">
            <div className="experience-content">
              <div className="experience-icon">
                <Calendar className="h-6 w-6 text-red-500" />
              </div>
              <div className="experience-date">
                <span className="text-amber-400">2023 - 2024</span>
              </div>
              <h3 className="experience-title">Open-Source Contributor</h3>
              <h4 className="experience-company">Various Projects</h4>
              <p className="experience-description">
                Developed CUDA-enhanced fluid simulations for real-time risk modeling. Contributed to IBM's Qiskit,
                refining quantum circuit optimizations for finance.
              </p>
              <div className="experience-skills">
                <Badge variant="outline" className="experience-badge">
                  CUDA
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Fluid Simulations
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Qiskit
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Quantum Computing
                </Badge>
                <Badge variant="outline" className="experience-badge">
                  Risk Modeling
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
