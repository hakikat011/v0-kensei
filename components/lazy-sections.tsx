import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Custom loading component
const LoadingFallback = ({ text }: { text: string }) => (
  <div className="py-20 md:py-32 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <div className="text-primary">{text}</div>
    </div>
  </div>
)

// Dynamically import components with loading fallbacks
export const LazySkillsSection = dynamic(
  () => import("./skills-section").then((mod) => ({ default: mod.SkillsSection })),
  {
    loading: () => <LoadingFallback text="Loading skills..." />,
    ssr: true,
  },
)

export const LazyProjectsCatalog = dynamic(
  () => import("./projects-catalog").then((mod) => ({ default: mod.ProjectsCatalog })),
  {
    loading: () => <LoadingFallback text="Loading projects..." />,
    ssr: true,
  },
)

export const LazyContactSection = dynamic(
  () => import("./contact-section").then((mod) => ({ default: mod.ContactSection })),
  {
    loading: () => <LoadingFallback text="Loading contact form..." />,
    ssr: true,
  },
)
