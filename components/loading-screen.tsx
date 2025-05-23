"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 500) // Slight delay before hiding
          return 100
        }
        return prevProgress + Math.floor(Math.random() * 10) + 1
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/samurai-loading.png"
          alt="Samurai silhouette"
          fill
          className="object-contain opacity-20 scale-75" // Added scale-75 to reduce the size
          priority
        />
      </div>

      <div className="absolute flex flex-col items-center">
        {/* Reduced size of the loading circle */}
        <div className="relative w-28 h-28 mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-500/10"></div>
          </div>

          {/* Circular progress indicator */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a1a" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e11d48"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transform="rotate(-90 50 50)"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-white font-japanese">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Reduced text size */}
        <h1 className="text-2xl font-bold text-white tsushima-name mb-2">HAKIKAT SINGH</h1>
        <p className="text-sm text-gray-400 font-japanese">Loading experience...</p>
      </div>
    </motion.div>
  )
}
