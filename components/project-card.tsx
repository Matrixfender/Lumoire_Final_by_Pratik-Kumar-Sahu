"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Heart, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  creator: string
  category: string
  supporters: number
  monthlyEarnings: number
  image: string
  description: string
  tags: string[]
  initialLikes?: number
  gameImages?: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(project.initialLikes || Math.floor(Math.random() * 500) + 50)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-scroll for game images
  useEffect(() => {
    if (project.gameImages && project.gameImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.gameImages!.length)
      }, 1500) // Change image every 1.5 seconds

      return () => clearInterval(interval)
    }
  }, [project.gameImages])

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click events

    if (isAnimating) return // Prevent rapid clicking

    setIsAnimating(true)

    if (isLiked) {
      setIsLiked(false)
      setLikeCount((prev) => prev - 1)
    } else {
      setIsLiked(true)
      setLikeCount((prev) => prev + 1)
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300)
  }

  const currentImage =
    project.gameImages && project.gameImages.length > 0 ? project.gameImages[currentImageIndex] : project.image

  const isIndieGameProject = project.title === "Indie Game Development"
  const isCookingProject = project.title === "Cooking Adventures"
  const isDigitalArtProject = project.title === "Digital Art Masterclass"
  const isFitnessProject = project.title === "Fitness & Wellness"

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer border border-mint/50 dark:border-gray-700 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      initial={
        isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
          ? { opacity: 0, y: 50 }
          : { opacity: 1, y: 0 }
      }
      animate={
        isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0 }
      }
      transition={
        isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
          ? { duration: 0.6, delay: 0 }
          : { duration: 0.3 }
      }
    >
      <motion.div
        className="relative h-48 overflow-hidden"
        initial={
          isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
            ? { opacity: 0, y: 30 }
            : { opacity: 1, y: 0 }
        }
        animate={
          isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0 }
        }
        transition={
          isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
            ? { duration: 0.6, delay: 0.1 }
            : { duration: 0 }
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src={currentImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </motion.div>
        </AnimatePresence>

        {/* Image indicators for carousel */}
        {project.gameImages && project.gameImages.length > 1 && (
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10"
            initial={
              isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
                ? { opacity: 0, y: 20 }
                : { opacity: 1, y: 0 }
            }
            animate={
              isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: 0 }
            }
            transition={
              isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
                ? { duration: 0.6, delay: 0.2 }
                : { duration: 0 }
            }
          >
            {project.gameImages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </motion.div>
        )}

        <motion.div
          className="absolute top-4 right-4"
          initial={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 0, y: 20 }
              : { opacity: 1, y: 0 }
          }
          animate={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { duration: 0.6, delay: 0.3 }
              : { duration: 0 }
          }
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeClick}
              className={`relative bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 transition-all duration-300 ${
                isLiked ? "shadow-lg" : ""
              }`}
            >
              <motion.div animate={isAnimating ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${
                    isLiked ? "text-red-500 fill-red-500" : "text-teal hover:text-red-400"
                  }`}
                />
              </motion.div>

              {/* Like count tooltip */}
              <AnimatePresence>
                {(isHovered || isLiked) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10"
                  >
                    {likeCount} likes
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-4"
          initial={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 0, y: 20 }
              : { opacity: 1, y: 0 }
          }
          animate={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { duration: 0.6, delay: 0.4 }
              : { duration: 0 }
          }
        >
          <Badge
            variant="secondary"
            className="bg-mint/90 dark:bg-gray-800/90 text-teal dark:text-white transition-colors"
          >
            {project.category}
          </Badge>
        </motion.div>
      </motion.div>

      <motion.div
        className="p-6"
        initial={
          isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
            ? { opacity: 0, y: 30 }
            : { opacity: 1, y: 0 }
        }
        animate={
          isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0 }
        }
        transition={
          isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
            ? { duration: 0.6, delay: 0.5 }
            : { duration: 0 }
        }
      >
        <motion.div
          className="flex items-start justify-between mb-2"
          initial={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 0, y: 20 }
              : { opacity: 1, y: 0 }
          }
          animate={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { duration: 0.6, delay: 0.6 }
              : { duration: 0 }
          }
        >
          <h3 className="text-xl font-semibold text-teal dark:text-white transition-colors flex-1">{project.title}</h3>
          {isLiked && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="ml-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
          )}
        </motion.div>

        <motion.p
          className="text-gray-600 dark:text-gray-400 mb-4 transition-colors"
          initial={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 0, y: 20 }
              : { opacity: 1, y: 0 }
          }
          animate={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { duration: 0.6, delay: 0.7 }
              : { duration: 0 }
          }
        >
          by {project.creator}
        </motion.p>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 transition-colors">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-sky/50 text-sky dark:border-sky/70 dark:text-sky transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors"
          initial={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 0, y: 20 }
              : { opacity: 1, y: 0 }
          }
          animate={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { duration: 0.6, delay: 0.8 }
              : { duration: 0 }
          }
        >
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-sky" />
            <span>{(project.supporters ?? 0).toLocaleString()} supporters</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-teal" />
            <span>${(project.monthlyEarnings ?? 0).toLocaleString()}/mo</span>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-between"
          initial={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 0, y: 20 }
              : { opacity: 1, y: 0 }
          }
          animate={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={
            isIndieGameProject || isCookingProject || isDigitalArtProject || isFitnessProject
              ? { duration: 0.6, delay: 0.9 }
              : { duration: 0 }
          }
        >
          <Button className="flex-1 bg-teal hover:bg-teal/90 text-white mr-3">Become a supporter</Button>

          {/* Like summary */}
          <motion.div
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
            animate={isLiked ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-3 h-3 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
            <span className={isLiked ? "text-red-500 font-medium" : ""}>{likeCount}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
