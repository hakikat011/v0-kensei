// Import the lazy components
import { LazySkillsSection, LazyProjectsCatalog, LazyContactSection } from "@/components/lazy-sections"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"

// Add id="main-content" to the main element for our skip link to work
export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <LazySkillsSection />
      <LazyProjectsCatalog />
      <LazyContactSection />
      <Footer />
    </main>
  )
}
