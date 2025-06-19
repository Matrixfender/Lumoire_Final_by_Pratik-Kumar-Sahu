"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Music, Camera, Palette, Code, Mic, BookOpen, Gamepad2 } from "lucide-react"
import AuthModal from "@/components/auth-modal"

const creatorExamples = [
  {
    id: 1,
    title: "Creative Studio",
    category: "Digital Art & Design",
    earnings: 2847,
    supporters: 127,
    progress: 75,
    icon: Palette,
    gradient: "from-mint to-sky",
    color: "text-teal",
  },
  {
    id: 2,
    title: "Music Producer",
    category: "Audio & Music",
    earnings: 4230,
    supporters: 89,
    progress: 60,
    icon: Music,
    gradient: "from-sky to-teal",
    color: "text-sky",
  },
  {
    id: 3,
    title: "Tech Reviewer",
    category: "Technology & Reviews",
    earnings: 3650,
    supporters: 203,
    progress: 85,
    icon: Camera,
    gradient: "from-teal to-mint",
    color: "text-teal",
  },
  {
    id: 4,
    title: "Indie Developer",
    category: "Game Development",
    earnings: 1920,
    supporters: 156,
    progress: 45,
    icon: Code,
    gradient: "from-mint via-sky to-teal",
    color: "text-sky",
  },
  {
    id: 5,
    title: "Podcast Host",
    category: "Audio & Entertainment",
    earnings: 2180,
    supporters: 94,
    progress: 55,
    icon: Mic,
    gradient: "from-sky to-mint",
    color: "text-teal",
  },
  {
    id: 6,
    title: "Writer & Author",
    category: "Literature & Stories",
    earnings: 1560,
    supporters: 78,
    progress: 40,
    icon: BookOpen,
    gradient: "from-teal to-sky",
    color: "text-sky",
  },
  {
    id: 7,
    title: "Gaming Streamer",
    category: "Gaming & Entertainment",
    earnings: 5420,
    supporters: 312,
    progress: 90,
    icon: Gamepad2,
    gradient: "from-mint to-teal",
    color: "text-teal",
  },
]

export default function HeroSection() {
  const [currentExample, setCurrentExample] = useState(0)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % creatorExamples.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section")
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const current = creatorExamples[currentExample]
  const IconComponent = current.icon

  return (
    <section className="bg-gradient-to-br from-mint/50 to-sky/30 dark:from-teal/30 dark:to-sky/20 dark:bg-gray-900 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
              The subscription platform for <span className="text-teal dark:text-sky">creators</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors">
              Lumoire powers creators to do what they love and get paid by the people who love what they do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-teal hover:bg-teal/90 text-white rounded-full" onClick={scrollToProjects}>
                Find creators to support
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-teal text-teal hover:bg-teal hover:text-white dark:border-mint dark:text-mint dark:hover:bg-mint dark:hover:text-teal transition-colors rounded-full"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <Play className="w-4 h-4" />
                Start my page
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-mint/50 dark:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${current.gradient} rounded-full flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className={`font-semibold ${current.color} dark:text-white transition-colors text-lg`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {current.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-500 dark:text-gray-400 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {current.category}
                    </motion.p>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-gray-600 dark:text-gray-400 transition-colors">Monthly earnings</span>
                    <span className={`font-semibold ${current.color} dark:text-white transition-colors`}>
                      ${current.earnings.toLocaleString()}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-gray-600 dark:text-gray-400 transition-colors">Supporters</span>
                    <span className={`font-semibold ${current.color} dark:text-white transition-colors`}>
                      {current.supporters}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-full bg-lightgray dark:bg-gray-700 rounded-full h-2 transition-colors overflow-hidden">
                      <motion.div
                        className={`bg-gradient-to-r ${current.gradient} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${current.progress}%` }}
                        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                      />
                    </div>
                    <motion.div
                      className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span>Goal Progress</span>
                      <span>{current.progress}%</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicator dots */}
            <div className="flex justify-center mt-6 gap-2">
              {creatorExamples.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentExample(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentExample ? "bg-teal w-6" : "bg-lightgray dark:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Auto-play progress indicator */}
            <div className="mt-4 w-full bg-lightgray dark:bg-gray-700 rounded-full h-1 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-teal to-sky h-1 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultMode="signup" />
    </section>
  )
}
