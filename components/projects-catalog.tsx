"use client"

import React from "react"

import type { ReactNode } from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  LineChart,
  Cpu,
  Server,
  Waves,
  ExternalLink,
  Search,
  Filter,
  X,
  ChevronRight,
  Github,
  Lock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type Project = {
  id: string
  name: string
  description: string
  category: "research" | "quantitative" | "simulations" | "quantum" | "system"
  source: "User-provided" | "From web search results"
  sourceUrl?: string
  sourceDomain?: string
  paperTitle?: string
  icon: ReactNode
  image: string
  detailImage?: string
  longDescription?: string
  technologies?: string[]
  restricted?: boolean
  performanceStats?: {
    sharpeRatio?: string
    winRate?: string
    annualReturn?: string
    maxDrawdown?: string
    sortinoRatio?: string
    alphaGeneration?: string
    beta?: string
    riskAdjustedScore?: string
  }
}

const projects: Project[] = [
  // Research and Publication
  {
    id: "hybrid-algorithms",
    name: "Hybrid Classical-Quantum Algorithms for Financial Linear Systems",
    description:
      "Combined CUDA-accelerated preconditioning with quantum HHL, solving sparse systems 50% faster than classical methods.",
    longDescription:
      "This research explored the intersection of high-performance computing and quantum algorithms to address computational bottlenecks in financial modeling. The hybrid approach leverages classical preprocessing to improve the condition number of matrices before applying quantum algorithms, resulting in significant performance improvements for large-scale financial simulations.",
    technologies: ["Quantum HHL", "CUDA", "Linear Algebra", "Financial Modeling", "Sparse Matrix Optimization"],
    category: "research",
    source: "User-provided",
    sourceUrl:
      "https://www.researchgate.net/publication/384595852_Optimised_Hybrid_Classical-Quantum_Algorithm_for_Accelerated_Solution_of_Sparse_Linear_Systems_Optimised_Hybrid_Classical-Quantum_Algorithm_for_Accelerated_Solution_of_Sparse_Linear_Systems_A_Detailed",
    sourceDomain: "ResearchGate",
    paperTitle: "Optimised Hybrid Classical-Quantum Algorithm for Accelerated Solution of Sparse Linear Systems",
    icon: <BookOpen className="h-5 w-5" />,
    image: "/images/robotic-hand-red.jpeg",
    detailImage: "/images/robotic-hand-red.jpeg",
  },
  {
    id: "quantum-monte-carlo",
    name: "Quantum Monte Carlo for Portfolio Optimization",
    description:
      "Applied quantum algorithms to high-dimensional risk modeling, outperforming classical benchmarks in portfolio optimization scenarios.",
    longDescription:
      "This project implemented quantum-enhanced Monte Carlo methods to simulate market behavior and optimize investment portfolios under various risk constraints. The quantum approach demonstrated superior performance in handling the curse of dimensionality that typically plagues classical Monte Carlo simulations, enabling more accurate risk assessments for complex financial instruments.",
    technologies: ["Quantum Monte Carlo", "Portfolio Theory", "Risk Modeling", "Qiskit", "Financial Derivatives"],
    category: "research",
    source: "User-provided",
    sourceUrl:
      "https://www.researchgate.net/publication/382852758_Quantum_Computing_for_Financial_Simulations_1_Title_Leveraging_Quantum_Computing_for_Financial_Simulations_Integrating_Quantum_Monte_Carlo_Amplitude_Estimation_and_QAOA",
    sourceDomain: "ResearchGate",
    paperTitle:
      "Leveraging Quantum Computing for Financial Simulations: Integrating Quantum Monte Carlo, Amplitude Estimation, and QAOA",
    icon: <BookOpen className="h-5 w-5" />,
    image: "/images/robotic-hand-yellow.jpeg",
    detailImage: "/images/robotic-hand-yellow.jpeg",
  },
  {
    id: "dynamic-caching",
    name: "Dynamic Caching for Adaptive Databases",
    description:
      "Reduced query latency by 35% through workload-driven algorithm switching in high-frequency trading database systems.",
    longDescription:
      "This research developed an adaptive caching system that dynamically selects optimal caching algorithms based on real-time workload patterns. The system continuously monitors query patterns and performance metrics, automatically switching between different caching strategies to maximize hit rates and minimize latency for time-sensitive financial applications.",
    technologies: [
      "Database Optimization",
      "Caching Algorithms",
      "Performance Tuning",
      "Redis",
      "High-Frequency Trading",
    ],
    category: "research",
    source: "User-provided",
    sourceUrl:
      "https://www.researchgate.net/publication/375606174_Title_Adaptive_Search_Optimization_Dynamic_Algorithm_Selection_and_Caching_for_Enhanced_Database_Performance",
    sourceDomain: "ResearchGate",
    paperTitle:
      "Adaptive Search Optimization: Dynamic Algorithm Selection and Caching for Enhanced Database Performance",
    icon: <BookOpen className="h-5 w-5" />,
    image: "/images/robotic-hand-black.jpeg",
    detailImage: "/images/robotic-hand-black.jpeg",
  },

  // Quantitative Software
  {
    id: "quickscope",
    name: "Quickscope",
    description: "Uses Twitter and Yahoo Finance to generate trading signals.",
    longDescription:
      "Quickscope is a real-time trading signal generator that combines sentiment analysis from Twitter with technical indicators from Yahoo Finance. The system employs natural language processing to gauge market sentiment and correlates this with price action data to identify potential trading opportunities across various timeframes.",
    technologies: ["NLP", "Sentiment Analysis", "Technical Analysis", "Twitter API", "Yahoo Finance API"],
    category: "quantitative",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/AI-TradeBOT",
    sourceDomain: "GitHub",
    icon: <LineChart className="h-5 w-5" />,
    image: "/images/robotic-hand-red-blue.jpeg",
    detailImage: "/images/robotic-hand-red-blue.jpeg",
  },
  {
    id: "alphaforge",
    name: "Alphaforge",
    description:
      "A minimal but functional MCP-LEAN bridge with Gemini integration, designed for QuantConnect interaction.",
    longDescription:
      "Alphaforge creates a seamless bridge between Model Control Protocol (MCP) and the LEAN engine, with added Gemini AI integration. This allows quantitative researchers to develop and test trading strategies in QuantConnect's environment while leveraging advanced AI capabilities for strategy enhancement and optimization.",
    technologies: ["QuantConnect", "LEAN Engine", "MCP", "Gemini AI", "Algorithmic Trading"],
    category: "quantitative",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/AlphaForge",
    sourceDomain: "GitHub",
    icon: <LineChart className="h-5 w-5" />,
    image: "/images/robotic-hand-navy.jpeg",
    detailImage: "/images/robotic-hand-navy.jpeg",
  },
  {
    id: "sherlock",
    name: "Sherlock",
    description:
      "A comprehensive algorithmic trading framework for Indian markets using QuantConnect's LEAN engine with Zerodha integration.",
    longDescription:
      "Sherlock is a specialized algorithmic trading framework designed specifically for Indian markets. It integrates QuantConnect's LEAN engine with Zerodha's API to provide a complete solution for strategy development, backtesting, and live trading. The system includes custom modules for handling India-specific market nuances, regulations, and trading hours.",
    technologies: ["QuantConnect", "LEAN Engine", "Zerodha API", "Indian Markets", "Algorithmic Trading"],
    category: "quantitative",
    source: "User-provided",
    icon: <LineChart className="h-5 w-5" />,
    image: "/images/robotic-hand-navy-gold.jpeg",
    detailImage: "/images/robotic-hand-navy-gold.jpeg",
    restricted: true,
    performanceStats: {
      sharpeRatio: "2.48",
      winRate: "88.3%",
      annualReturn: "64.7%",
      maxDrawdown: "-12.3%",
      sortinoRatio: "3.12",
      alphaGeneration: "19.8%",
      beta: "0.18",
      riskAdjustedScore: "8.9/10",
    },
  },
  {
    id: "mozartedge",
    name: "MozartEdge",
    description:
      "An automated trading system that implements multiple strategies including mean reversion, volatility arbitrage, pairs trading, and implied vs realized volatility trading.",
    longDescription:
      "MozartEdge is a sophisticated multi-strategy trading system that orchestrates various trading approaches in harmony. It implements mean reversion, volatility arbitrage, pairs trading, and volatility spread trading strategies with enhanced features for profit-taking and market analysis. The system dynamically allocates capital across strategies based on market conditions and performance metrics.",
    technologies: ["Mean Reversion", "Volatility Arbitrage", "Pairs Trading", "Options Trading", "Risk Management"],
    category: "quantitative",
    source: "User-provided",
    icon: <LineChart className="h-5 w-5" />,
    image: "/images/robotic-hand-yellow-black.jpeg",
    detailImage: "/images/robotic-hand-yellow-black.jpeg",
    restricted: true,
    performanceStats: {
      sharpeRatio: "2.21",
      winRate: "94.5%",
      annualReturn: "29.6%",
      maxDrawdown: "-6.8%",
      sortinoRatio: "2.75",
      alphaGeneration: "14.2%",
      beta: "0.11",
      riskAdjustedScore: "8.6/10",
    },
  },
  {
    id: "horcrux",
    name: "Horcrux",
    description:
      "An AI-based news and market scrapper that daily automatically selects tools, configurations, and instruments, and trades with the LLM and MCP trained in the system.",
    longDescription:
      "Horcrux is an advanced AI-driven trading system that autonomously scrapes news and market data to inform its trading decisions. The system employs large language models (LLMs) and Model Control Protocol (MCP) to analyze information, select appropriate trading instruments, and execute trades. It continuously learns and adapts its strategies based on market feedback and performance.",
    technologies: ["AI", "LLM", "MCP", "News Scraping", "Market Analysis", "Autonomous Trading"],
    category: "quantitative",
    source: "User-provided",
    icon: <LineChart className="h-5 w-5" />,
    image: "/images/robotic-hand-yellow-mech.jpeg",
    detailImage: "/images/robotic-hand-yellow-mech.jpeg",
  },

  // Simulations
  {
    id: "zengesture",
    name: "ZenGesture",
    description:
      "A web-based application that integrates hand pose recognition with Three.js for interactive 3D experiences. Uses TensorFlow.js's Handpose model for real-time hand gesture detection.",
    longDescription:
      "ZenGesture creates immersive interactive experiences by combining TensorFlow.js's Handpose model with Three.js for 3D visualization. The application tracks hand movements in real-time through a webcam, allowing users to manipulate 3D objects, navigate virtual environments, or create digital art using natural hand gestures without requiring any special hardware.",
    technologies: ["TensorFlow.js", "Three.js", "WebGL", "Computer Vision", "Hand Tracking"],
    category: "simulations",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/ZenGesture",
    sourceDomain: "GitHub",
    icon: <Waves className="h-5 w-5" />,
    image: "/images/robotic-hand-red-white-tech.jpeg",
    detailImage: "/images/robotic-hand-red-white-tech.jpeg",
  },
  {
    id: "fluidsimulations-cuda",
    name: "FluidSimulations-CUDA",
    description:
      "A Houdini extension designed to enhance the accuracy and efficiency of fluid simulations through GPU acceleration (CUDA), volumetric data management (OpenVDB), and adaptive mesh refinement.",
    longDescription:
      "FluidSimulations-CUDA is a high-performance extension for Houdini that leverages CUDA for GPU acceleration of complex fluid dynamics calculations. The system implements advanced techniques such as adaptive mesh refinement and efficient volumetric data management through OpenVDB to achieve realistic fluid simulations at significantly higher speeds than traditional CPU-based approaches.",
    technologies: ["CUDA", "Houdini", "OpenVDB", "Fluid Dynamics", "Adaptive Mesh Refinement"],
    category: "simulations",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/FluidSimulations-CUDA",
    sourceDomain: "GitHub",
    icon: <Waves className="h-5 w-5" />,
    image: "/images/robotic-hand-red-white-diagram.jpeg",
    detailImage: "/images/robotic-hand-red-white-diagram.jpeg",
  },
  {
    id: "aquashift",
    name: "AquaShift",
    description:
      "A real-time water simulation pipeline that integrates 3D geospatial data to simulate dynamic water bodies and incorporates real-time data from sources like NASA Aqua/MODIS and NOAA.",
    longDescription:
      "AquaShift creates highly accurate water simulations by combining 3D geospatial data with real-time environmental information from NASA Aqua/MODIS satellites and NOAA weather systems. The pipeline generates dynamic water bodies that respond realistically to changing environmental conditions, making it valuable for climate research, disaster preparedness, and environmental impact studies.",
    technologies: [
      "Geospatial Data",
      "NASA Aqua/MODIS",
      "NOAA Data Integration",
      "Real-time Simulation",
      "Environmental Modeling",
    ],
    category: "simulations",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/AquaShift",
    sourceDomain: "GitHub",
    icon: <Waves className="h-5 w-5" />,
    image: "/images/robotic-hand-white-purple.jpeg",
    detailImage: "/images/robotic-hand-white-purple.jpeg",
  },

  // Quantum Tools
  {
    id: "askqubits",
    name: "AskQubits",
    description: "MVP integrating financial data scraping, AI analysis, and quantum computations.",
    longDescription:
      "AskQubits is a minimum viable product that demonstrates the potential of combining financial data scraping, AI-powered analysis, and quantum computing algorithms. The system collects financial data from various sources, processes it using AI to identify patterns and opportunities, and then applies quantum algorithms to optimize complex financial calculations that would be intractable for classical computers.",
    technologies: ["Quantum Computing", "Financial Data Scraping", "AI Analysis", "Qiskit", "Python"],
    category: "quantum",
    source: "User-provided",
    icon: <Cpu className="h-5 w-5" />,
    image: "/images/robotic-hand-red-white-schematic.jpeg",
    detailImage: "/images/robotic-hand-red-white-schematic.jpeg",
    restricted: true,
  },
  {
    id: "elysiumq",
    name: "ElysiumQ",
    description:
      "Implements a hybrid system combining classical and quantum computing techniques to solve large-scale linear systems of equations, potentially linking to HHL algorithm research.",
    longDescription:
      "ElysiumQ is a sophisticated hybrid computing system that leverages both classical and quantum resources to solve large-scale linear systems of equations. Building on research related to the HHL (Harrow-Hassidim-Lloyd) algorithm, the system determines which parts of a problem are best suited for quantum processing and which should remain on classical hardware, creating an optimal workflow that maximizes the advantages of both computing paradigms.",
    technologies: [
      "Hybrid Quantum-Classical Computing",
      "HHL Algorithm",
      "Linear Systems",
      "Quantum Circuit Optimization",
      "Matrix Decomposition",
    ],
    category: "quantum",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/ElysiumQ",
    sourceDomain: "GitHub",
    icon: <Cpu className="h-5 w-5" />,
    image: "/images/robotic-hand-white-navy.jpeg",
    detailImage: "/images/robotic-hand-white-navy.jpeg",
  },

  // System
  {
    id: "neural-net-car",
    name: "Neural Net Car",
    description:
      "A self-driving car model using neural networks, trainable entirely within a web browser environment, offering an accessible platform for research and development in autonomous driving.",
    longDescription:
      "Neural Net Car provides an accessible platform for experimenting with autonomous driving algorithms through a browser-based simulation environment. Users can train neural networks to navigate various driving scenarios, adjust parameters in real-time, and visualize the learning process. The system is designed to be educational while still implementing sophisticated machine learning techniques that mirror real-world autonomous driving challenges.",
    technologies: [
      "Neural Networks",
      "Browser-based Simulation",
      "TensorFlow.js",
      "Reinforcement Learning",
      "Computer Vision",
    ],
    category: "system",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/neural-net-car",
    sourceDomain: "GitHub",
    icon: <Server className="h-5 w-5" />,
    image: "/images/robotic-hand-red-white-cloth.jpeg",
    detailImage: "/images/robotic-hand-red-white-cloth.jpeg",
  },
  {
    id: "shanks",
    name: "Shanks",
    description: "Automates open-source contributions with ease.",
    longDescription:
      "Shanks is a productivity tool designed to streamline the process of contributing to open-source projects. It automates repetitive tasks such as fork creation, branch management, code formatting, and pull request submission. The system also includes features for identifying suitable projects based on user skills and interests, making open-source contribution more accessible to developers at all experience levels.",
    technologies: ["Git Automation", "GitHub API", "CI/CD Integration", "Code Analysis", "Pull Request Management"],
    category: "system",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/SHANKS",
    sourceDomain: "GitHub",
    icon: <Server className="h-5 w-5" />,
    image: "/images/robotic-hand-red-white-fingers.jpeg",
    detailImage: "/images/robotic-hand-red-white-fingers.jpeg",
  },
  {
    id: "cicd-pipeline",
    name: "CICD-Pipeline",
    description:
      "A scratch build-up of a functional CI/CD pipeline using GitHub Actions for integration and deployment.",
    longDescription:
      "CICD-Pipeline is a comprehensive continuous integration and deployment solution built from scratch using GitHub Actions. The system includes modules for automated testing, code quality analysis, security scanning, build optimization, and deployment to various environments. It's designed to be highly configurable while maintaining simplicity for teams of all sizes.",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Infrastructure as Code", "Test Automation"],
    category: "system",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/CICD-pipeline",
    sourceDomain: "GitHub",
    icon: <Server className="h-5 w-5" />,
    image: "/images/robotic-hand-red-white-close.jpeg",
    detailImage: "/images/robotic-hand-red-white-close.jpeg",
  },
  {
    id: "grpc-beta",
    name: "gRPC beta",
    description:
      "A beta yet functional gRPC server designed using Node.js for system requirements to work on protocol designs.",
    longDescription:
      "gRPC beta is a functional server implementation using Node.js that serves as a testbed for protocol design and optimization. The system implements the gRPC framework for efficient remote procedure calls, with a focus on performance benchmarking, error handling, and compatibility testing. It includes tools for generating client libraries in multiple languages and comprehensive documentation for API consumers.",
    technologies: ["gRPC", "Node.js", "Protocol Buffers", "API Design", "Microservices"],
    category: "system",
    source: "User-provided",
    sourceUrl: "https://github.com/hakikat011/gRPC-server-beta",
    sourceDomain: "GitHub",
    icon: <Server className="h-5 w-5" />,
    image: "/images/robotic-hand-red-white-tech.jpeg",
    detailImage: "/images/robotic-hand-red-white-tech.jpeg",
  },
]

const categoryLabels = {
  research: "Research and Publication",
  quantitative: "Quantitative Software",
  simulations: "Simulations",
  quantum: "Quantum Tools",
  system: "System",
}

const categoryIcons = {
  research: <BookOpen className="h-5 w-5" />,
  quantitative: <LineChart className="h-5 w-5" />,
  simulations: <Waves className="h-5 w-5" />,
  quantum: <Cpu className="h-5 w-5" />,
  system: <Server className="h-5 w-5" />,
}

export function ProjectsCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

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

    gsap.fromTo(
      tabsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

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

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Clear after animation
  }

  const handleCardHover = (projectId: string | null) => {
    setHoveredCardId(projectId)
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || project.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getProjectsByCategory = (category: string) => {
    return filteredProjects.filter((project) => (category === "all" ? true : project.category === category))
  }

  return (
    <section id="projects-catalog" ref={sectionRef} className="py-20 md:py-32 neo-dark-bg relative">
      {/* Subtle animated fog effect */}
      <div className="absolute inset-0 bg-black/10 z-5 animate-pulse-slow"></div>

      {/* Overlay that dims when a card is hovered */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 bg-black/0 pointer-events-none z-10 transition-all duration-300 ${
          hoveredCardId ? "bg-black/60" : ""
        }`}
      ></div>

      <div className="container mx-auto px-4 relative z-20">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-8 text-center neo-text">
          Project <span className="neo-gradient-text">Catalog</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            <div className="neo-search-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 rounded-md neo-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Filter by category:</span>
          </div>
        </div>

        <div ref={tabsRef} className="neo-tabs-container">
          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="neo-tabs">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8 neo-tabs-list">
              <TabsTrigger value="all" className="flex items-center gap-2 neo-tab">
                <span className="hidden md:inline">All Projects</span>
                <span className="md:hidden">All</span>
              </TabsTrigger>
              <TabsTrigger value="research" className="flex items-center gap-2 neo-tab">
                {categoryIcons.research}
                <span className="hidden md:inline">Research</span>
              </TabsTrigger>
              <TabsTrigger value="quantitative" className="flex items-center gap-2 neo-tab">
                {categoryIcons.quantitative}
                <span className="hidden md:inline">Quantitative</span>
                <span className="md:hidden">Quant</span>
              </TabsTrigger>
              <TabsTrigger value="simulations" className="flex items-center gap-2 neo-tab">
                {categoryIcons.simulations}
                <span className="hidden md:inline">Simulations</span>
                <span className="md:hidden">Sim</span>
              </TabsTrigger>
              <TabsTrigger value="quantum" className="flex items-center gap-2 neo-tab">
                {categoryIcons.quantum}
                <span className="hidden md:inline">Quantum</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2 neo-tab">
                {categoryIcons.system}
                <span className="hidden md:inline">System</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {Object.keys(categoryLabels).map((category) => {
                const categoryProjects = getProjectsByCategory(category)
                if (categoryProjects.length === 0) return null

                return (
                  <div key={category} className="space-y-4 mb-12 neo-category-container">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold flex items-center gap-2 neo-category-title">
                        <div className="neo-category-icon">{categoryIcons[category as keyof typeof categoryIcons]}</div>
                        {categoryLabels[category as keyof typeof categoryLabels]}
                        <span className="text-sm font-normal text-gray-400 ml-2">
                          ({categoryProjects.length} projects)
                        </span>
                      </h3>
                      <div className="neo-scroll-indicator">
                        <span className="text-xs text-gray-400 mr-2">Scroll</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="relative neo-scroll-container">
                      <div className="overflow-x-auto pb-4 hide-scrollbar">
                        <div className="flex space-x-6 min-w-max">
                          {categoryProjects.map((project) => (
                            <div key={project.id} className="w-[320px] flex-shrink-0">
                              <ProjectCard
                                project={project}
                                onClick={() => openProjectModal(project)}
                                onHover={handleCardHover}
                                isHovered={hoveredCardId === project.id}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-8 neo-fade-left pointer-events-none"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-8 neo-fade-right pointer-events-none"></div>
                    </div>
                  </div>
                )
              })}
            </TabsContent>

            {Object.keys(categoryLabels).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="relative neo-scroll-container">
                  <div className="overflow-x-auto pb-4 hide-scrollbar">
                    <div className="flex space-x-6 min-w-max">
                      {getProjectsByCategory(category).map((project) => (
                        <div key={project.id} className="w-[320px] flex-shrink-0">
                          <ProjectCard
                            project={project}
                            onClick={() => openProjectModal(project)}
                            onHover={handleCardHover}
                            isHovered={hoveredCardId === project.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-8 neo-fade-left pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 neo-fade-right pointer-events-none"></div>
                </div>
                {getProjectsByCategory(category).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-300">No projects found matching your search criteria.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeProjectModal}></div>

          <div ref={modalRef} className="neo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="neo-modal-image-container">
              <Image
                src={selectedProject.detailImage || selectedProject.image}
                alt={selectedProject.name}
                fill
                className="neo-modal-image object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="neo-modal-overlay"></div>
            </div>

            <div className="neo-modal-content">
              <button className="neo-modal-close" onClick={closeProjectModal} aria-label="Close project details">
                <X className="h-6 w-6" />
              </button>

              <div className="neo-modal-header">
                <div className="flex items-center gap-3 mb-2">
                  <div className="neo-modal-icon">{categoryIcons[selectedProject.category]}</div>
                  <Badge className="neo-modal-category">{categoryLabels[selectedProject.category]}</Badge>
                  {selectedProject.restricted && (
                    <Badge variant="outline" className="bg-amber-950/50 text-amber-300 border-amber-700/50">
                      <Lock className="h-3 w-3 mr-1" />
                      <span>Restricted Access</span>
                    </Badge>
                  )}
                </div>

                <h3 className="neo-modal-title">{selectedProject.name}</h3>
              </div>

              <div className="neo-modal-body">
                <p className="neo-modal-description">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {selectedProject.performanceStats && (
                  <div className="mt-6 p-4 rounded-lg bg-blue-950/30 border border-blue-900/30">
                    <h4 className="text-sm font-medium mb-3 text-cyan-300">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Sharpe Ratio:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.sharpeRatio}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Win Rate:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.winRate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Annual Return:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.annualReturn}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Max Drawdown:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.maxDrawdown}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Sortino Ratio:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.sortinoRatio}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Alpha Generation:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.alphaGeneration}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Beta:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.beta}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-400">Risk-Adjusted Score:</span>
                        <span className="text-sm font-medium text-cyan-100">
                          {selectedProject.performanceStats.riskAdjustedScore}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div className="neo-modal-technologies">
                    <h4 className="text-sm font-medium mb-2 text-cyan-300">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="neo-tech-badge">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.paperTitle && (
                  <div className="neo-modal-paper mt-4">
                    <h4 className="text-sm font-medium mb-2 text-cyan-300">Research Paper</h4>
                    <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-900/30">
                      <p className="text-sm text-cyan-200 mb-2 font-medium">{selectedProject.paperTitle}</p>
                      <Link
                        href={selectedProject.sourceUrl || "#"}
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm gap-1.5 mt-1 neo-paper-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BookOpen className="h-4 w-4" />
                        View on {selectedProject.sourceDomain}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                )}

                {!selectedProject.paperTitle && !selectedProject.restricted && (
                  <div className="neo-modal-source mt-4">
                    <h4 className="text-sm font-medium mb-2 text-cyan-300">Source</h4>
                    <p className="text-sm text-cyan-200/80">
                      {selectedProject.source}
                      {selectedProject.sourceUrl && selectedProject.sourceDomain === "GitHub" && (
                        <Link
                          href={selectedProject.sourceUrl}
                          className="ml-2 inline-flex items-center text-cyan-400 hover:text-cyan-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-1" />
                          View on GitHub
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      )}
                      {selectedProject.sourceUrl &&
                        selectedProject.sourceDomain !== "GitHub" &&
                        !selectedProject.paperTitle && (
                          <Link
                            href={selectedProject.sourceUrl}
                            className="ml-2 inline-flex items-center text-cyan-400 hover:text-cyan-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            [{selectedProject.sourceDomain || new URL(selectedProject.sourceUrl).hostname}]
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Link>
                        )}
                    </p>
                  </div>
                )}

                {selectedProject.restricted && (
                  <div className="neo-modal-source mt-4">
                    <h4 className="text-sm font-medium mb-2 text-cyan-300">Access</h4>
                    <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/30">
                      <p className="text-sm text-amber-200 flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        This project's code is restricted. Please connect directly to request access.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="neo-modal-footer">
                <Button variant="outline" className="neo-button" onClick={closeProjectModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const ProjectCard = React.memo(function ProjectCard({
  project,
  onClick,
  onHover,
  isHovered,
}: {
  project: Project
  onClick: () => void
  onHover: (id: string | null) => void
  isHovered: boolean
}) {
  return (
    <Card
      className={`neo-card ${isHovered ? "neo-card-hovered" : ""} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
      onClick={onClick}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
          e.preventDefault()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.name}`}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="320px"
        />
        <div className="absolute inset-0 neo-card-image-overlay"></div>
        <Badge variant="outline" className="neo-card-badge">
          {project.icon}
          <span className="ml-1">{categoryLabels[project.category as keyof typeof categoryLabels]}</span>
        </Badge>
        {project.paperTitle && (
          <Badge variant="outline" className="absolute top-0.75rem right-0.75rem z-10 neo-paper-badge">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>Research Paper</span>
          </Badge>
        )}
        {project.restricted && (
          <Badge
            variant="outline"
            className="absolute top-0.75rem right-0.75rem z-10 bg-amber-950/50 text-amber-300 border-amber-700/50"
          >
            <Lock className="h-3 w-3 mr-1" />
            <span>Connect to view</span>
          </Badge>
        )}
      </div>

      <CardContent className="flex-grow flex flex-col p-5 neo-card-content">
        <CardTitle className="text-xl mb-2 line-clamp-2 neo-card-title">{project.name}</CardTitle>

        {project.performanceStats ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3 text-xs">
            <div className="flex justify-between">
              <span className="text-cyan-400">Sharpe:</span>
              <span className="text-cyan-100">{project.performanceStats.sharpeRatio}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400">Win Rate:</span>
              <span className="text-cyan-100">{project.performanceStats.winRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400">CAGR:</span>
              <span className="text-cyan-100">{project.performanceStats.annualReturn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400">Max DD:</span>
              <span className="text-cyan-100">{project.performanceStats.maxDrawdown}</span>
            </div>
          </div>
        ) : (
          <CardDescription className="text-base text-cyan-100/80 flex-grow line-clamp-3 neo-card-description">
            {project.description}
          </CardDescription>
        )}

        <div className="flex justify-between items-center mt-auto pt-4 neo-card-footer">
          <div className="text-xs text-cyan-400">
            {project.paperTitle ? (
              <span className="flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                Research Paper
              </span>
            ) : project.restricted ? (
              <span className="flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                Restricted Access
              </span>
            ) : project.sourceUrl && project.sourceDomain === "GitHub" ? (
              <Link
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-cyan-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3 w-3 mr-1" />
                View on GitHub
              </Link>
            ) : (
              <>Source: {project.source}</>
            )}
          </div>
          <Button variant="ghost" size="sm" className="neo-card-button">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})
