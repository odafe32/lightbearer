import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUp, Instagram, Mail } from 'lucide-react'

const BRAND = {
  purple: '#4A356B',
  purpleDark: '#2D233D',
  yellow: '#FFD700',
  yellowDark: '#E6C200',
  purpleLight: '#7A5D8A'
}

export const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lb-purple hover:bg-lb-purple-dark text-white p-3 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://instagram.com/lightbearers" // Replace with actual Instagram handle
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="bg-lb-yellow hover:bg-lb-yellow-dark text-lb-purple p-3 rounded-full shadow-lg transition-colors duration-200"
        aria-label="Follow us on Instagram"
      >
        <Instagram size={20} strokeWidth={2.5} />
      </motion.a>

      <motion.a
        href="#contact"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white hover:bg-gray-50 text-lb-purple p-3 rounded-full shadow-lg border border-lb-purple transition-colors duration-200"
        aria-label="Contact us"
      >
        <Mail size={20} strokeWidth={2.5} />
      </motion.a>
    </motion.div>
  )
}
