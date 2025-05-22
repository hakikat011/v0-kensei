"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate realistic loading progress
    const intervals: NodeJS.Timeout[] = []

    // Initial quick progress
    const quickInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 8 + 2 // 2-10% increments
        const newProgress = prev + increment
        if (newProgress >= 30) {
          clearInterval(quickInterval)
          return 30
        }
        return newProgress
      })
    }, 150)
    intervals.push(quickInterval)

    // Medium progress phase
    setTimeout(() => {
      const mediumInterval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 5 + 1 // 1-6% increments
          const newProgress = prev + increment
          if (newProgress >= 70) {
            clearInterval(mediumInterval)
            return 70
          }
          return newProgress
        })
      }, 300)
      intervals.push(mediumInterval)
    }, 800)

    // Final progress phase
    setTimeout(() => {
      const finalInterval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 3 + 0.5 // 0.5-3.5% increments
          const newProgress = prev + increment
          if (newProgress >= 100) {
            clearInterval(finalInterval)
            setIsComplete(true)
            return 100
          }
          return newProgress
        })
      }, 200)
      intervals.push(finalInterval)
    }, 2000)

    // Cleanup function
    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [])

  useEffect(() => {
    if (isComplete) {
      // Wait a moment after completion, then start fade out
      const fadeTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 500)

      return () => clearTimeout(fadeTimeout)
    }
  }, [isComplete])

  // When no longer visible, don't render anything
  if (!isVisible && isComplete) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 transition-opacity duration-1000 ${
        !isVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.1)_0%,transparent_70%)]"></div>
      </div>

      {/* Main content container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Samurai image with animations */}
        <div className="relative mb-12">
          {/* Glow effect behind the image */}
          <div className="absolute inset-0 samurai-glow scale-110"></div>

          {/* Main samurai image */}
          <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
            <Image
              src="/images/samurai-loading.png"
              alt="Loading Samurai"
              fill
              className="object-contain samurai-image"
              priority
            />
          </div>

          {/* Subtle overlay effects */}
          <div className="absolute inset-0 samurai-overlay"></div>
        </div>

        {/* Vertical loading bar */}
        <div className="relative">
          {/* Loading bar container */}
          <div className="w-1 h-32 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/30 shadow-lg">
            {/* Progress fill */}
            <div
              className="w-full bg-gradient-to-t from-red-600 via-red-500 to-red-400 rounded-full transition-all duration-300 ease-out loading-bar-fill"
              style={{
                height: `${progress}%`,
                boxShadow: "0 0 10px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)",
              }}
            ></div>
          </div>

          {/* Progress percentage */}
          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
            <span className="text-gray-300 text-sm font-mono tabular-nums">{Math.round(progress)}%</span>
          </div>

          {/* Loading bar glow effect */}
          <div className="absolute inset-0 loading-bar-glow"></div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm font-japanese tracking-wider">
            {progress < 30
              ? "Awakening..."
              : progress < 70
                ? "Preparing..."
                : progress < 100
                  ? "Almost ready..."
                  : "Ready"}
          </p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particles"></div>
      </div>
    </div>
  )
}
