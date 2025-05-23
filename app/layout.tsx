import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MusicPlayer } from "@/components/music-player"
import { LoadingScreen } from "@/components/loading-screen"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HAKIKAT SINGH",
  description: "Portfolio showcasing expertise in AI, Quantum Computing, and Development",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Preload the Jin Sakai audio file */}
        <link rel="preload" href="/audio/jin.mp3" as="audio" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background japanese-pattern`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LoadingScreen />
          <div className="uwp-background fixed inset-0 z-[-2]"></div>
          <div className="fog fixed inset-0 z-[-1]"></div>
          {children}
          <MusicPlayer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
