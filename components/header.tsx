"use client"

import { useState } from "react"
import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import AuthModal from "@/components/auth-modal"

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section")
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <>
      <header className="border-b border-lightgray dark:border-gray-800 bg-white dark:bg-teal sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-teal dark:text-mint">Lumoire</div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Find creators"
                  className="pl-10 bg-mint/30 dark:bg-gray-800 border-lightgray dark:border-gray-700 rounded-full dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <button
                onClick={scrollToProjects}
                className="text-gray-700 dark:text-gray-300 hover:text-teal dark:hover:text-sky transition-colors cursor-pointer"
              >
                Explore
              </button>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-teal dark:hover:text-sky transition-colors"
              >
                Start a page
              </a>
              <Button className="rounded-full" variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button className="rounded-full" variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
              <ThemeToggle />
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="rounded-full bg-teal hover:bg-teal/90 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-700 border border-teal dark:border-white ml-2 transition-colors"
              >
                Log in
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
