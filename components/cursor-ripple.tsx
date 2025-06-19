"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
  id: number
  x: number
  y: number
}

export default function CursorRipple() {
  const [ripples, setRipples] = useState<Ripple[]>()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rippleId = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Check if the cursor is over an interactive element
      const target = e.target as HTMLElement
      const isOverInteractiveElement =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        target.closest(".group") ||
        target.closest("[data-interactive]")

      // Only create ripples when not over interactive elements
      if (!isOverInteractiveElement) {
        setMousePosition({ x: e.clientX, y: e.clientY })

        // Create a new ripple
        const newRipple: Ripple = {
          id: rippleId++,
          x: e.clientX,
          y: e.clientY,
        }

        setRipples((prev) => [...(prev || []), newRipple])

        // Remove ripple after animation completes
        setTimeout(() => {
          setRipples((prev) => (prev || []).filter((ripple) => ripple.id !== newRipple.id))
        }, 1000)
      }
    }

    const handleMouseEnter = () => {
      document.addEventListener("mousemove", handleMouseMove)
    }

    const handleMouseLeave = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      setRipples([])
    }

    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {ripples?.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-sky/40 dark:border-mint/50 transition-colors"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
            }}
            initial={{
              width: 20,
              height: 20,
              opacity: 0.8,
            }}
            animate={{
              width: 100,
              height: 100,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor follower dot - only show in background */}
      <motion.div
        className="absolute w-2 h-2 bg-teal/50 dark:bg-sky/70 rounded-full transition-colors"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
        animate={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </div>
  )
}
