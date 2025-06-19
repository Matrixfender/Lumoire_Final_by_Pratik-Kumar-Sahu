"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for new creators getting started",
    price: 0,
    originalPrice: null,
    period: "month",
    icon: Users,
    color: "mint",
    gradient: "from-mint to-sky",
    popular: false,
    features: [
      "Up to 100 supporters",
      "Basic creator tools",
      "5% platform fee",
      "Monthly payouts",
      "Community support",
      "Basic analytics",
      "Mobile app access",
    ],
    limitations: ["Limited customization", "No priority support"],
  },
  {
    id: "creator",
    name: "Creator",
    description: "For growing creators who want more features",
    price: 12,
    originalPrice: 15,
    period: "month",
    icon: Star,
    color: "sky",
    gradient: "from-sky to-teal",
    popular: true,
    features: [
      "Unlimited supporters",
      "Advanced creator tools",
      "3% platform fee",
      "Weekly payouts",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Exclusive content tools",
      "Live streaming",
      "Merchandise integration",
    ],
    limitations: [],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For established creators maximizing their potential",
    price: 25,
    originalPrice: null,
    period: "month",
    icon: Zap,
    color: "teal",
    gradient: "from-teal to-mint",
    popular: false,
    features: [
      "Everything in Creator",
      "1.5% platform fee",
      "Daily payouts",
      "Dedicated account manager",
      "White-label options",
      "API access",
      "Advanced integrations",
      "Custom contracts",
      "Revenue optimization tools",
      "Multi-language support",
    ],
    limitations: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large creators and organizations",
    price: null,
    originalPrice: null,
    period: "month",
    icon: Crown,
    color: "teal",
    gradient: "from-teal via-sky to-mint",
    popular: false,
    features: [
      "Everything in Pro",
      "Custom platform fee",
      "Instant payouts",
      "24/7 dedicated support",
      "Full white-label solution",
      "Custom development",
      "Enterprise integrations",
      "Advanced security",
      "Custom analytics",
      "Onboarding assistance",
    ],
    limitations: [],
  },
]

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getPrice = (plan: (typeof pricingPlans)[0]) => {
    if (plan.price === null) return "Custom"
    if (plan.price === 0) return "Free"

    const price = isAnnual ? plan.price * 10 : plan.price // 2 months free annually
    return `$${price}`
  }

  const getSavings = (plan: (typeof pricingPlans)[0]) => {
    if (plan.price === null || plan.price === 0) return null
    if (!isAnnual) return null

    const monthlyCost = plan.price * 12
    const annualCost = plan.price * 10
    const savings = monthlyCost - annualCost

    return `Save $${savings}`
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-teal dark:text-white mb-4 transition-colors"
          >
            Choose Your Creator Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 transition-colors"
          >
            Start free and scale as you grow. All plans include our core creator tools and community features.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span
              className={`text-sm font-medium transition-colors ${!isAnnual ? "text-teal dark:text-sky" : "text-gray-500 dark:text-gray-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 dark:focus:ring-sky ${
                isAnnual ? "bg-teal dark:bg-sky" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${isAnnual ? "text-teal dark:text-sky" : "text-gray-500 dark:text-gray-400"}`}
            >
              Annual
            </span>
            {isAnnual && <Badge className="bg-sky/20 text-sky border-sky/30 ml-2">2 months free</Badge>}
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular
                    ? "border-sky dark:border-sky/50 ring-2 ring-sky/20"
                    : "border-mint/30 dark:border-gray-700 hover:border-sky/50 dark:hover:border-sky/30"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-sky text-white px-4 py-1 text-sm font-medium">Most Popular</Badge>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                      {plan.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 transition-colors">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className={`text-4xl font-bold text-${plan.color} dark:text-white transition-colors`}>
                          {getPrice(plan)}
                        </span>
                        {plan.price !== null && plan.price > 0 && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            /{isAnnual ? "year" : plan.period}
                          </span>
                        )}
                      </div>

                      {plan.originalPrice && !isAnnual && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-through mt-1">
                          ${plan.originalPrice}/{plan.period}
                        </div>
                      )}

                      {getSavings(plan) && <div className="text-sm text-sky font-medium mt-1">{getSavings(plan)}</div>}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full mb-6 transition-all duration-300 ${
                        plan.popular
                          ? "bg-sky hover:bg-sky/90 text-white"
                          : plan.price === null
                            ? "bg-teal hover:bg-teal/90 text-white"
                            : "bg-mint hover:bg-mint/90 text-teal hover:text-white"
                      }`}
                    >
                      {plan.price === null
                        ? "Contact Sales"
                        : plan.price === 0
                          ? "Get Started Free"
                          : "Start Free Trial"}
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors">What's included:</h4>

                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-sky flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm transition-colors">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start gap-3">
                              <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-1"></div>
                              </div>
                              <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
                                {limitation}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-mint/20 via-sky/20 to-teal/20 dark:from-mint/10 dark:via-sky/10 dark:to-teal/10 rounded-2xl p-8 transition-colors">
            <h3 className="text-2xl font-bold text-teal dark:text-white mb-4 transition-colors">
              Not sure which plan is right for you?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto transition-colors">
              Start with our free plan and upgrade anytime. All paid plans include a 14-day free trial with full access
              to premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-teal hover:bg-teal/90 text-white">Start Free Trial</Button>
              <Button
                variant="outline"
                className="border-teal text-teal hover:bg-teal hover:text-white dark:border-sky dark:text-sky dark:hover:bg-sky dark:hover:text-white"
              >
                Compare All Features
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
