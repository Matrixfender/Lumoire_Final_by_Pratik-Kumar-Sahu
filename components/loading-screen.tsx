"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval)
          return 100
        }
        return prev + 1
      })
    }, 25)

    return () => {
      clearInterval(progressInterval)
      clearInterval(counterInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black dark:bg-teal flex items-center justify-center transition-colors"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-md px-8">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-800 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
          <motion.div
            className="h-full bg-gradient-to-r from-mint via-sky to-teal rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Counter */}
        <motion.div
          className="absolute bottom-20 left-8 text-white text-6xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {String(counter).padStart(3, "0")}
        </motion.div>
      </div>
    </motion.div>
  )
}
