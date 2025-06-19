"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"

const projects = [
  {
    id: 1,
    title: "Digital Art Masterclass",
    creator: "Sarah Chen",
    category: "Art & Design",
    supporters: 1247,
    monthlyEarnings: 3420,
    image: "/images/digital-art1.png",
    description:
      "Learn professional digital art techniques from concept to completion. Weekly tutorials and live sessions.",
    tags: ["Digital Art", "Tutorials", "Live Sessions"],
    initialLikes: 342,
    gameImages: ["/images/digital-art1.png", "/images/digital-art2.png", "/images/digital-art3.png"],
  },
  {
    id: 2,
    title: "Indie Game Development",
    creator: "Alex Rodriguez",
    category: "Gaming",
    supporters: 892,
    monthlyEarnings: 2150,
    image: "/images/game1.png",
    description: "Behind-the-scenes content of indie game development. Early access to games and development insights.",
    tags: ["Game Dev", "Indie", "Early Access"],
    initialLikes: 189,
    gameImages: ["/images/game1.png", "/images/game2.png", "/images/game3.png"],
  },
  {
    id: 3,
    title: "Cooking Adventures",
    creator: "Maria Gonzalez",
    category: "Food & Cooking",
    supporters: 2341,
    monthlyEarnings: 4680,
    image: "/images/cooking1.png",
    description: "Authentic recipes from around the world. Monthly recipe books and cooking video tutorials.",
    tags: ["Recipes", "International", "Video Tutorials"],
    initialLikes: 567,
    gameImages: ["/images/cooking1.png", "/images/cooking2.png"],
  },
  {
    id: 4,
    title: "Tech Reviews & News",
    creator: "David Kim",
    category: "Technology",
    supporters: 1876,
    monthlyEarnings: 3920,
    image: "/images/tech1.png",
    description: "In-depth tech reviews and industry analysis. Early access to reviews and exclusive content.",
    tags: ["Tech Reviews", "Analysis", "Exclusive"],
    initialLikes: 423,
    gameImages: ["/images/tech1.png", "/images/tech2.png"],
  },
  {
    id: 5,
    title: "Fitness & Wellness",
    creator: "Emma Thompson",
    category: "Health & Fitness",
    supporters: 1543,
    monthlyEarnings: 2890,
    image: "/images/fitness1.png",
    description: "Personalized workout plans and nutrition guides. Weekly live workout sessions and Q&A.",
    tags: ["Fitness", "Nutrition", "Live Sessions"],
    initialLikes: 298,
    gameImages: ["/images/fitness1.png", "/images/fitness2.png", "/images/fitness3.png"],
  },
  {
    id: 6,
    title: "Music Production",
    creator: "Jake Wilson",
    category: "Music",
    supporters: 967,
    monthlyEarnings: 1840,
    image: "/images/music1.png",
    description: "Learn music production from scratch. Access to sample packs, project files, and one-on-one feedback.",
    tags: ["Music Production", "Samples", "Feedback"],
    initialLikes: 156,
    gameImages: ["/images/music1.png", "/images/music2.png"],
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects-section" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Discover amazing creators
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
            Support the creators you love and get exclusive content, behind-the-scenes access, and more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
