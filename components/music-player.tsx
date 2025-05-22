"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()
    audio.src = "/audio/jin.mp3"
    audio.loop = true
    audio.preload = "auto"
    audio.volume = 0.7 // Set a comfortable default volume
    audioRef.current = audio

    // Add event listeners
    const handleCanPlay = () => {
      setIsLoaded(true)
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

  const toggleAudio = () => {
    if (!audioRef.current || !isLoaded) return

    const audio = audioRef.current

    if (!isPlaying) {
      // Try to play
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Play prevented:", error)
          setIsPlaying(false)
        })
    } else {
      // Pause
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 rounded-full backdrop-blur-sm shadow-lg border transition-all duration-300 ${
                isPlaying
                  ? "bg-red-500/20 border-red-500/50 hover:bg-red-500/30 music-pulse"
                  : "bg-background/80 border-primary/20 hover:bg-primary/10"
              }`}
              onClick={toggleAudio}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              disabled={!isLoaded}
            >
              {isPlaying ? <Volume2 className="h-6 w-6" /> : <Music className="h-6 w-6" />}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isPlaying ? "Pause background music" : "Play background music"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
