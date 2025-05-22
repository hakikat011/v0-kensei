"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-md" : "py-4",
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tsushima-name brush-text">
            HAKIKAT SINGH
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#about" className="tsushima-nav-link hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#experience" className="tsushima-nav-link hover:text-primary transition-colors">
              Experience
            </Link>
            <Link href="#skills" className="tsushima-nav-link hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="tsushima-nav-link hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="tsushima-nav-link hover:text-primary transition-colors">
              Contact
            </Link>
            <ModeToggle />
          </nav>

          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md py-4">
            <nav className="container flex flex-col space-y-4">
              <Link
                href="#about"
                className="tsushima-nav-link hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#experience"
                className="tsushima-nav-link hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </Link>
              <Link
                href="#skills"
                className="tsushima-nav-link hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="tsushima-nav-link hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="tsushima-nav-link hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
