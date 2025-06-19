"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import CustomersSection from "@/components/customers-section"
import PricingSection from "@/components/pricing-section"
import MerchandiseSection from "@/components/merchandise-section"
import Footer from "@/components/footer"

export default function MainContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors"
    >
      <Header />
      <HeroSection />
      <ProjectsSection />
      <CustomersSection />
      <PricingSection />
      <MerchandiseSection />
      <Footer />
    </motion.div>
  )
}
