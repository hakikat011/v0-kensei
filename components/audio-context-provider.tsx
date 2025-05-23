"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"

interface AudioContextType {
  audioContext: AudioContext | null
  isSupported: boolean
  initializeAudio: () => Promise<void>
  playTone: (frequency: number, duration: number) => void
}

const AudioContextContext = createContext<AudioContextType | null>(null)

export function AudioContextProvider({ children }: { children: React.ReactNode }) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if AudioContext is supported
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    setIsSupported(!!AudioContextClass)
  }, [])

  const initializeAudio = useCallback(async () => {
    if (audioContext) return

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioContextClass()

      // Resume context if suspended
      if (ctx.state === "suspended") {
        await ctx.resume()
      }

      setAudioContext(ctx)
    } catch (error) {
      console.error("Failed to initialize AudioContext:", error)
    }
  }, [audioContext])

  const playTone = useCallback(
    (frequency: number, duration: number) => {
      if (!audioContext) return

      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
        oscillator.type = "sine"

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      } catch (error) {
        console.error("Failed to play tone:", error)
      }
    },
    [audioContext],
  )

  const value: AudioContextType = {
    audioContext,
    isSupported,
    initializeAudio,
    playTone,
  }

  return <AudioContextContext.Provider value={value}>{children}</AudioContextContext.Provider>
}

export function useAudioContext() {
  const context = useContext(AudioContextContext)
  if (!context) {
    throw new Error("useAudioContext must be used within AudioContextProvider")
  }
  return context
}
