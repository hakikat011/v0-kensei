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

    // Try to load the video
    if (videoRef.current) {
      const video = videoRef.current

      // Set up event handlers
      const handleCanPlay = () => {
        setVideoLoaded(true)
        try {
          video.play().catch((e) => {
            console.log("Auto-play prevented:", e)
            // This is expected in many browsers
          })
        } catch (e) {
          console.log("Play error:", e)
        }
      }

      const handleError = (e: Event) => {
        console.error("Video loading error:", e)
        setVideoError(true)
      }

      // Add event listeners
      video.addEventListener("canplaythrough", handleCanPlay)
      video.addEventListener("error", handleError)

      // Clean up event listeners
      return () => {
        intervals.forEach((interval) => clearInterval(interval))
        video.removeEventListener("canplaythrough", handleCanPlay)
        video.removeEventListener("error", handleError)
      }
    }

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        !isVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background - Try video first, fall back to image */}
      <div className="absolute inset-0 overflow-hidden">
        {!videoError && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            src="/videos/silence-of-the-ronin.1920x1080.mp4"
          />
        )}

        {/* Background image (shown while video loads or if video fails) */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: "url('/images/samurai-background.jpeg')",
          }}
        ></div>

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
