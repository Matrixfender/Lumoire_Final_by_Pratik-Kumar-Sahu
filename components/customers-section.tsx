"use client"

import { motion } from "framer-motion"

const customers = [
  { name: "Google", logo: "G" },
  { name: "Pinterest", logo: "P" },
  { name: "Microsoft", logo: "M" },
  { name: "Apple", logo: "A" },
  { name: "Netflix", logo: "N" },
  { name: "Spotify", logo: "S" },
  { name: "Adobe", logo: "Ad" },
  { name: "Meta", logo: "F" },
  { name: "Twitter", logo: "T" },
  { name: "LinkedIn", logo: "Li" },
  { name: "Dropbox", logo: "D" },
  { name: "Slack", logo: "Sl" },
  { name: "Figma", logo: "Fi" },
  { name: "Notion", logo: "No" },
  { name: "Discord", logo: "Di" },
  { name: "Zoom", logo: "Z" },
]

// Duplicate the array for seamless infinite scroll
const duplicatedCustomers = [...customers, ...customers]

export default function CustomersSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-teal dark:text-white mb-4 transition-colors"
          >
            Our Customers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors"
          >
            Trusted by creators and teams at leading companies worldwide
          </motion.p>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [0, -50 * customers.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: `${duplicatedCustomers.length * 200}px` }}
          >
            {duplicatedCustomers.map((customer, index) => (
              <motion.div
                key={`${customer.name}-${index}`}
                className="flex-shrink-0 w-40 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-mint/30 dark:border-gray-700 flex items-center justify-center group hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal to-sky rounded-lg flex items-center justify-center text-white font-bold text-sm mb-1 mx-auto group-hover:from-sky group-hover:to-teal transition-all duration-300">
                    {customer.logo}
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-teal dark:group-hover:text-sky transition-colors">
                    {customer.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-teal dark:text-sky mb-2 transition-colors">10M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Active Creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal dark:text-sky mb-2 transition-colors">50M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Monthly Supporters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal dark:text-sky mb-2 transition-colors">$2B+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Creator Earnings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal dark:text-sky mb-2 transition-colors">190+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Countries</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
