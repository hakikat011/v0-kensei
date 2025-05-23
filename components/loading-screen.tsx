"use client"

import { useEffect, useState, useRef } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleVideoLoaded = () => {
        setVideoLoaded(true)
      }

      const handleVideoError = () => {
        setVideoError(true)
      }

      const handleCanPlay = () => {
        setVideoLoaded(true)
      }

      video.addEventListener("loadeddata", handleVideoLoaded)
      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("error", handleVideoError)

      // Force load the video
      video.load()

      return () => {
        video.removeEventListener("loadeddata", handleVideoLoaded)
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("error", handleVideoError)
      }
    }
  }, [])

  // When no longer visible, don't render anything
  if (!isVisible && isComplete) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        !isVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fallback background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/samurai-background.jpeg')",
          }}
        ></div>

        {/* Video Background */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          >
            <source src="/videos/silence-of-the-ronin.1920x1080.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/60 z-[10]"></div>
      </div>

      {/* Content container */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Circular loading indicator */}
        <div className="relative mb-8">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" />

            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(225, 29, 72, 0.8)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transform="rotate(-90 50 50)"
              style={{
                transition: "stroke-dashoffset 0.5s ease",
                filter: "drop-shadow(0 0 8px rgba(225, 29, 72, 0.5))",
              }}
            />

            {/* Percentage text */}
            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="16"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {Math.round(progress)}%
            </text>
          </svg>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-gray-300 text-sm font-japanese tracking-wider">
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
    </div>
  )
}
