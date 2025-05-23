"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  // Initialize audio on component mount
  useEffect(() => {
    if (typeof window === "undefined") return

    // Create and configure audio element
    const audio = new Audio("/audio/jin.mp3")
    audio.loop = true
    audio.volume = 0.3
    audio.muted = true
    audio.preload = "auto"

    // Store reference
    audioRef.current = audio

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const toggleMute = async () => {
    if (!audioRef.current) return

    const audio = audioRef.current

    try {
      if (isMuted) {
        // Unmute and play
        audio.muted = false

        // If it's paused, play it
        if (audio.paused) {
          await audio.play()
          setIsPlaying(true)
        }

        setIsMuted(false)
        // Removed success notification - operates silently
      } else {
        // Mute but don't pause (keeps it ready to unmute instantly)
        audio.muted = true
        setIsMuted(true)
        // Removed mute notification - operates silently
      }
    } catch (error) {
      console.error("Audio playback error:", error)
      toast({
        title: "Audio Error",
        description: "There was a problem playing the audio",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="ghost"
        size="icon"
        className={`h-12 w-12 rounded-full backdrop-blur-sm shadow-lg border transition-all duration-300 ${
          isPlaying && !isMuted
            ? "bg-red-500/20 border-red-500/50 hover:bg-red-500/30 music-pulse"
            : "bg-background/80 border-primary/20 hover:bg-primary/10"
        }`}
        onClick={toggleMute}
        aria-label={isMuted ? "Enable Jin Sakai theme music" : "Disable Jin Sakai theme music"}
      >
        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
      </Button>
    </div>
  )
}
