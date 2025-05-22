"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true) // Start muted by default
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()
    audio.src = "/audio/jin.mp3"
    audio.loop = true
    audio.preload = "auto"
    audio.muted = true // Start muted
    audioRef.current = audio

    // Add event listeners
    const handleCanPlay = () => {
      setIsLoaded(true)
      // Start playing (but muted) once loaded
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error)
      })
    }

    audio.addEventListener("canplaythrough", handleCanPlay)
    audio.load()

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audio.removeEventListener("canplaythrough", handleCanPlay)
        audioRef.current = null
      }
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current || !isLoaded) return

    const audio = audioRef.current

    // If currently muted, unmute and ensure playing
    if (isMuted) {
      audio.muted = false
      if (audio.paused) {
        audio.play().catch((error) => {
          console.log("Play prevented:", error)
          // If play fails, keep it muted
          audio.muted = true
          setIsMuted(true)
          return
        })
      }
    } else {
      // If not muted, mute it
      audio.muted = true
    }

    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg border border-primary/20 hover:bg-primary/10"
        onClick={toggleMute}
        aria-label={isMuted ? "Play music" : "Mute music"}
        disabled={!isLoaded}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  )
}
