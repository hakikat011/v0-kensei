import dynamic from "next/dynamic"

// Dynamically import components with loading fallbacks
export const LazySkillsSection = dynamic(
  () => import("./skills-section").then((mod) => ({ default: mod.SkillsSection })),
  {
    loading: () => (
      <div className="py-20 md:py-32 flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading skills...</div>
      </div>
    ),
    ssr: true,
  },
)

export const LazyProjectsCatalog = dynamic(
  () => import("./projects-catalog").then((mod) => ({ default: mod.ProjectsCatalog })),
  {
    loading: () => (
      <div className="py-20 md:py-32 flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading projects...</div>
      </div>
    ),
    ssr: true,
  },
)

export const LazyContactSection = dynamic(
  () => import("./contact-section").then((mod) => ({ default: mod.ContactSection })),
  {
    loading: () => (
      <div className="py-20 md:py-32 flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading contact form...</div>
      </div>
    ),
    ssr: true,
  },
)
