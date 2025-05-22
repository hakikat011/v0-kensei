"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/audio/jin.mp3")
    audioRef.current.loop = true

    // Try to autoplay
    const playPromise = audioRef.current.play()

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Auto-play was prevented
        console.log("Autoplay prevented:", error)
      })
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg border border-primary/20 hover:bg-primary/10"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  )
}
