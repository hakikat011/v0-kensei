"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, LineChart, Cpu, ChevronDown, Shuffle, ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  type: string
  date?: string
  category: "research" | "trading" | "quantum"
  icon: React.ReactNode
  image: string
}

const projects: Project[] = [
  {
    id: "hybrid-algorithms",
    title: "Hybrid Classical-Quantum Algorithms for Financial Linear Systems",
    description:
      "Combined CUDA-accelerated preconditioning with quantum HHL, solving sparse systems 50% faster than classical methods. This research explored the intersection of high-performance computing and quantum algorithms to address computational bottlenecks in financial modeling. The hybrid approach leverages classical preprocessing to improve the condition number of matrices before applying quantum algorithms, resulting in significant performance improvements for large-scale financial simulations.",
    technologies: ["Quantum HHL", "CUDA", "Linear Algebra", "Financial Modeling"],
    type: "Thesis",
    date: "October 2024",
    category: "research",
    icon: <BookOpen className="h-5 w-5" />,
    image: "/quantum-computing-blue-circuits.png",
  },
  {
    id: "quantum-monte-carlo",
    title: "Quantum Monte Carlo for Portfolio Optimization",
    description:
      "Applied quantum algorithms to high-dimensional risk modeling, outperforming classical benchmarks in portfolio optimization scenarios. This project implemented quantum-enhanced Monte Carlo methods to simulate market behavior and optimize investment portfolios under various risk constraints. The quantum approach demonstrated superior performance in handling the curse of dimensionality that typically plagues classical Monte Carlo simulations, enabling more accurate risk assessments for complex financial instruments.",
    technologies: ["Quantum Monte Carlo", "Portfolio Theory", "Risk Modeling", "Qiskit"],
    type: "Thesis",
    date: "August 2024",
    category: "research",
    icon: <BookOpen className="h-5 w-5" />,
    image: "/placeholder-gthwr.png",
  },
  {
    id: "dynamic-caching",
    title: "Dynamic Caching for Adaptive Databases",
    description:
      "Reduced query latency by 35% through workload-driven algorithm switching in high-frequency trading database systems. This research developed an adaptive caching system that dynamically selects optimal caching algorithms based on real-time workload patterns. The system continuously monitors query patterns and performance metrics, automatically switching between different caching strategies to maximize hit rates and minimize latency for time-sensitive financial applications.",
    technologies: ["Database Optimization", "Caching Algorithms", "Performance Tuning", "Redis"],
    type: "Thesis",
    date: "November 2023",
    category: "research",
    icon: <BookOpen className="h-5 w-5" />,
    image: "/database-caching-system.png",
  },
  {
    id: "trading-bot",
    title: "Trading Bot System",
    description:
      "An RL-based trading bot achieving 12% MoM returns in volatile markets through adaptive learning and risk management. This system employs deep reinforcement learning to develop trading strategies that adapt to changing market conditions. The bot incorporates multiple data sources, including price action, volume, and sentiment analysis, to make informed trading decisions. A sophisticated risk management module ensures position sizing is optimized to balance potential returns against market volatility.",
    technologies: ["Reinforcement Learning", "Python", "TensorFlow", "Zerodha API"],
    category: "trading",
    icon: <LineChart className="h-5 w-5" />,
    image: "/trading-bot-ai.png",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis for Trading",
    description:
      "NLP-powered sentiment analysis system for trading strategies, integrating with QuantConnect for backtesting and validation. This project developed a sophisticated natural language processing pipeline to analyze financial news, social media, and earnings calls in real-time. The system extracts sentiment signals and correlates them with market movements to generate actionable trading insights. Integration with QuantConnect allows for comprehensive backtesting of sentiment-driven strategies across various market conditions.",
    technologies: ["NLP", "Sentiment Analysis", "QuantConnect", "PyTorch"],
    category: "trading",
    icon: <LineChart className="h-5 w-5" />,
    image: "/sentiment-analysis-visualization.png",
  },
  {
    id: "quantum-circuit",
    title: "Quantum Circuit Optimizer",
    description:
      "Contributed to IBM's Qiskit by refining quantum circuit optimizations specifically for financial applications. This project developed specialized circuit optimization techniques that reduce gate count and circuit depth for quantum algorithms used in financial calculations. The optimizations target the specific patterns of quantum operations common in financial applications such as option pricing and risk assessment. These improvements enable more complex financial models to run on current NISQ-era quantum hardware with higher fidelity.",
    technologies: ["Qiskit", "Quantum Gates", "Circuit Optimization", "Python"],
    category: "quantum",
    icon: <Cpu className="h-5 w-5" />,
    image: "/placeholder.svg?height=400&width=600&query=quantum%20circuit%20optimization%20with%20gates%20and%20qubits",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([...projects])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (typeof window !== "undefined") {
      // Feature detection for IntersectionObserver
      if ("IntersectionObserver" in window) {
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

        if (cardsRef.current) {
          const cards = cardsRef.current.children
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
              },
            },
          )
        }
      } else {
        // Fallback for browsers without IntersectionObserver
        gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.5 })

        if (cardsRef.current) {
          const cards = cardsRef.current.children
          gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.8 })
        }
      }

      // Parallax effect for the background
      gsap.to(".master-quests-bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }
  }, [shuffledProjects])

  // Effect to handle body scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  const toggleCardExpansion = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null)
      setIsModalOpen(false)
    } else {
      setExpandedCard(id)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setExpandedCard(null)
    setIsModalOpen(false)
  }

  const shuffleProjects = () => {
    const newShuffledProjects = [...shuffledProjects]
    for (let i = newShuffledProjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newShuffledProjects[i], newShuffledProjects[j]] = [newShuffledProjects[j], newShuffledProjects[i]]
    }
    setShuffledProjects(newShuffledProjects)
    setExpandedCard(null) // Close any expanded card when shuffling
    setIsModalOpen(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "research":
        return <BookOpen className="h-5 w-5" />
      case "trading":
        return <LineChart className="h-5 w-5" />
      case "quantum":
        return <Cpu className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "research":
        return "Research"
      case "trading":
        return "Trading"
      case "quantum":
        return "Quantum"
      default:
        return category
    }
  }

  const getExpandedProject = () => {
    return shuffledProjects.find((project) => project.id === expandedCard)
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-40 relative overflow-hidden section-texture">
      {/* Background Image with Overlay */}
      <div
        className="master-quests-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/master-quests-bg.jpeg")' }}
      ></div>
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center tsushima-name text-amber-50">
            Master <span className="text-red-500">Quests</span>
          </h2>

          <Button
            onClick={shuffleProjects}
            variant="outline"
            className="gap-2 border-amber-700 text-amber-200 hover:bg-amber-900/20"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle Quests
          </Button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shuffledProjects.map((project) => (
            <Card key={project.id} className="quest-card-modern" onClick={() => toggleCardExpansion(project.id)}>
              <div className="quest-card-image-container">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="quest-card-image object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="quest-card-overlay"></div>
              </div>
              <CardContent className="quest-card-content-modern">
                <div className="quest-card-category-badge">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <span>{getCategoryName(project.category)}</span>
                  </div>
                </div>
                <h3 className="quest-card-title-modern">{project.title}</h3>
                <p className="quest-card-description-modern">{project.description.split(".")[0]}.</p>
                <div className="quest-card-footer">
                  <span className="text-xs text-blue-300">{project.date || "Ongoing"}</span>
                  <ChevronDown className="h-5 w-5 text-blue-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for expanded card */}
      {isModalOpen && expandedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>

          <div className="quest-modal">
            {getExpandedProject() && (
              <>
                <div className="quest-modal-image-container">
                  <Image
                    src={getExpandedProject()?.image || ""}
                    alt={getExpandedProject()?.title || ""}
                    fill
                    className="quest-modal-image object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="quest-modal-overlay"></div>
                </div>

                <div className="quest-modal-content">
                  <button className="quest-modal-close" onClick={closeModal} aria-label="Close project details">
                    <X className="h-6 w-6" />
                  </button>

                  <div className="quest-modal-header">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="quest-modal-icon">{getCategoryIcon(getExpandedProject()?.category || "")}</div>
                      <Badge className="quest-modal-category">
                        {getCategoryName(getExpandedProject()?.category || "")}
                      </Badge>
                      {getExpandedProject()?.date && (
                        <span className="text-sm text-blue-300">{getExpandedProject()?.date}</span>
                      )}
                    </div>

                    <h3 className="quest-modal-title">{getExpandedProject()?.title}</h3>
                  </div>

                  <div className="quest-modal-body">
                    <p className="quest-modal-description">{getExpandedProject()?.description}</p>

                    <div className="quest-modal-technologies">
                      <h4 className="text-sm font-medium mb-2 text-blue-200">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {getExpandedProject()?.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-blue-700 text-blue-200 bg-blue-950/50">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="quest-modal-footer">
                    <Button
                      variant="outline"
                      className="gap-2 border-blue-700 text-blue-200 hover:bg-blue-900/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        // This would normally navigate to a details page
                        console.log(`View details for ${getExpandedProject()?.id}`)
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Full Details
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
