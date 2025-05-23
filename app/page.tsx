"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { LazySkillsSection, LazyProjectsCatalog, LazyContactSection } from "@/components/lazy-sections"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Preload critical images
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        "/images/uwp-background.jpeg",
        "/images/hero-bg.jpeg",
        "/images/samurai-red-sun.png",
        "/images/hakikat-profile.jpeg",
        "/images/samurai-loading.png",
      ]

      const preloadPromises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = url
          img.onload = resolve
          img.onerror = resolve // Continue even if an image fails to load
        })
      })

      await Promise.all(preloadPromises)

      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        // Only set loading to false if it's still true (component still mounted)
        setIsLoading((current) => {
          if (current) return false
          return false
        })
      }, 1000)
    }

    preloadImages()
  }, [])

  const handleLoadingComplete = () => {
    // Add a small delay to ensure the loading animation completes
    setTimeout(() => {
      setIsLoading(false)
      // Scroll to top when loading completes
      window.scrollTo(0, 0)
    }, 100)
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      <main
        id="main-content"
        className={`min-h-screen transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <Header />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <LazySkillsSection />
        <LazyProjectsCatalog />
        <LazyContactSection />
        <Footer />
      </main>
    </>
  )
}
