"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface MerchandiseItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[] // Add this line
  category: string
  description: string
  colors?: string[]
  inStock: boolean
}

const merchandiseItems: MerchandiseItem[] = [
  {
    id: 1,
    name: "Lumoire Water Bottle",
    price: 24.99,
    originalPrice: 29.99,
    image: "/images/lumoire-water-bottle.jpg",
    category: "Drinkware",
    description: "Insulated stainless steel water bottle with Lumoire logo",
    colors: ["Black", "White", "Mint", "Sky"],
    inStock: true,
  },
  {
    id: 2,
    name: "Creator's T-Shirt",
    price: 19.99,
    image: "/images/tshirt-white.jpg",
    images: ["/images/tshirt-white.jpg", "/images/tshirt-black.jpg"],
    category: "Apparel",
    description: "Premium cotton t-shirt for content creators",
    colors: ["Black", "White", "Gray", "Teal"],
    inStock: true,
  },
  {
    id: 3,
    name: "Camera Gear Kit",
    price: 149.99,
    originalPrice: 179.99,
    image: "/images/camera-gear-kit.jpg",
    category: "Equipment",
    description: "Essential camera accessories for creators",
    inStock: true,
  },
  {
    id: 4,
    name: "Creator's Handbook",
    price: 34.99,
    image: "/images/creators-handbook.jpg",
    category: "Books",
    description: "Complete guide to building your creative business",
    inStock: true,
  },
  {
    id: 5,
    name: "Lumoire Tote Bag",
    price: 16.99,
    image: "/images/lumoire-tote-bag.png",
    category: "Accessories",
    description: "Eco-friendly canvas tote bag with Lumoire branding",
    colors: ["Natural", "Black", "Mint"],
    inStock: true,
  },
  {
    id: 6,
    name: "Creator's Mug",
    price: 12.99,
    originalPrice: 15.99,
    image: "/images/creators-mug.png",
    category: "Drinkware",
    description: "Ceramic mug perfect for your creative workspace",
    colors: ["White", "Black", "Teal"],
    inStock: true,
  },
  {
    id: 7,
    name: "Lumoire Hoodie",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
    description: "Comfortable hoodie for creators on the go",
    colors: ["Black", "Gray", "Mint"],
    inStock: false,
  },
  {
    id: 8,
    name: "Notebook Set",
    price: 22.99,
    image: "/images/notebook-set.png",
    category: "Stationery",
    description: "Premium notebooks for brainstorming and planning",
    inStock: true,
  },
]

export default function MerchandiseSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const itemsPerView = 4
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {}

    merchandiseItems.forEach((item) => {
      if (item.images && item.images.length > 1) {
        intervals[item.id] = setInterval(() => {
          setCurrentImageIndices((prev) => ({
            ...prev,
            [item.id]: ((prev[item.id] || 0) + 1) % item.images!.length,
          }))
        }, 2000) // Change image every 2 seconds
      }
    })

    return () => {
      Object.values(intervals).forEach(clearInterval)
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, merchandiseItems.length - itemsPerView + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, merchandiseItems.length - itemsPerView + 1)) %
        Math.max(1, merchandiseItems.length - itemsPerView + 1),
    )
  }

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] && newCart[itemId] > 1) {
        newCart[itemId] -= 1
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const removeItemCompletely = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      delete newCart[itemId]
      return newCart
    })
  }

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalCartValue = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = merchandiseItems.find((item) => item.id === Number.parseInt(itemId))
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const currentImage = (item: MerchandiseItem) => {
    return item.images && item.images.length > 0 ? item.images[currentImageIndices[item.id] || 0] : item.image
  }

  return (
    <section className="py-20 bg-mint/20 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-teal dark:text-white mb-4 transition-colors"
          >
            Lumoire Merchandise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors"
          >
            Show your support with official Lumoire merchandise designed for creators
          </motion.p>
        </div>

        {/* Cart Summary */}
        {getTotalCartItems() > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-sky/20 dark:bg-sky/30 text-teal dark:text-sky px-6 py-3 rounded-full flex items-center gap-4 transition-colors">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="font-medium">{getTotalCartItems()} items</span>
              </div>
              <div className="text-sm opacity-75">•</div>
              <div className="font-bold">${getTotalCartValue().toFixed(2)}</div>
            </div>
          </motion.div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-mint/30 dark:hover:bg-gray-700 transition-colors border border-mint/50 dark:border-gray-700"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-teal dark:text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-mint/30 dark:hover:bg-gray-700 transition-colors border border-mint/50 dark:border-gray-700"
            disabled={currentIndex >= merchandiseItems.length - itemsPerView}
          >
            <ChevronRight className="w-6 h-6 text-teal dark:text-white" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden mx-12">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `${-currentIndex * (100 / itemsPerView)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{ width: `${(merchandiseItems.length / itemsPerView) * 100}%` }}
            >
              {merchandiseItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{ width: `${100 / merchandiseItems.length}%` }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-mint/50 dark:border-gray-700 h-80 relative transition-colors">
                    {/* Product Image - Always Visible */}
                    <div className="relative h-full bg-mint/10 dark:bg-gray-700 transition-colors">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndices[item.id] || 0}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={currentImage(item) || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {item.images && item.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                          {item.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                index === (currentImageIndices[item.id] || 0) ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Sale Badge - Always Visible */}
                      {item.originalPrice && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-teal text-white">
                            Save ${(item.originalPrice - item.price).toFixed(2)}
                          </Badge>
                        </div>
                      )}

                      {/* Cart Quantity Badge */}
                      {cart[item.id] && (
                        <div className="absolute top-4 right-4 z-10">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-sky text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                          >
                            {cart[item.id]}
                          </motion.div>
                        </div>
                      )}

                      {/* Out of Stock Overlay - Always Visible */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                          <Badge variant="secondary" className="bg-white text-gray-900">
                            Out of Stock
                          </Badge>
                        </div>
                      )}

                      {/* Hover Overlay with Product Details */}
                      <motion.div
                        className="absolute inset-0 bg-teal/90 dark:bg-black/90 flex flex-col justify-end p-6 text-white transition-colors"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-3">
                          {/* Category Badge */}
                          <div>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                              {item.category}
                            </Badge>
                          </div>

                          {/* Product Name */}
                          <h3 className="text-xl font-semibold">{item.name}</h3>

                          {/* Description */}
                          <p className="text-gray-200 text-sm line-clamp-2">{item.description}</p>

                          {/* Colors */}
                          {item.colors && (
                            <div className="flex gap-2">
                              {item.colors.slice(0, 3).map((color) => (
                                <div
                                  key={color}
                                  className={`w-4 h-4 rounded-full border-2 border-white/50 ${
                                    color === "Black"
                                      ? "bg-black"
                                      : color === "White"
                                        ? "bg-white"
                                        : color === "Mint"
                                          ? "bg-mint"
                                          : color === "Sky"
                                            ? "bg-sky"
                                            : color === "Teal"
                                              ? "bg-teal"
                                              : color === "Gray"
                                                ? "bg-gray-400"
                                                : "bg-amber-100"
                                  }`}
                                  title={color}
                                />
                              ))}
                              {item.colors.length > 3 && (
                                <span className="text-xs text-gray-300 ml-1">+{item.colors.length - 3}</span>
                              )}
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-300 line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          {/* Cart Controls */}
                          {cart[item.id] ? (
                            <div className="flex items-center gap-2 mt-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center bg-white/20 rounded-lg">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeFromCart(item.id)
                                  }}
                                  size="sm"
                                  variant="ghost"
                                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="px-3 py-1 text-white font-medium min-w-[2rem] text-center">
                                  {cart[item.id]}
                                </span>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addToCart(item.id)
                                  }}
                                  size="sm"
                                  variant="ghost"
                                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              {/* Remove All Button */}
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeItemCompletely(item.id)
                                }}
                                size="sm"
                                variant="ghost"
                                className="text-red-300 hover:text-red-200 hover:bg-red-500/20 h-8 w-8 p-0"
                                title="Remove all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                addToCart(item.id)
                              }}
                              disabled={!item.inStock}
                              className="w-full bg-sky hover:bg-sky/90 disabled:bg-gray-500 mt-2 text-white"
                            >
                              <span className="flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                {item.inStock ? "Add to Cart" : "Out of Stock"}
                              </span>
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.max(1, merchandiseItems.length - itemsPerView + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-teal" : "bg-lightgray dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
