import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export const Preloader = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 3000
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = (currentStep / steps) * 100
      setProgress(newProgress)
      
      if (currentStep >= steps) {
        setTimeout(() => setLoading(false), 500)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (!loading) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="text-center relative z-10 px-8">
          {/* Logo Image */}
          <motion.div 
            className="relative mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <img 
              src="https://res.cloudinary.com/dllrkis3c/image/upload/v1771270253/favicon_chorhr.png" 
              alt="Lightbearers Logo" 
              className="w-48 h-48 mx-auto object-contain"
            />
          </motion.div>

          {/* Caption */}
          <motion.p
            className="text-xl md:text-2xl font-chewy text-lb-purple-dark mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            LIGHTBEARERS || ✨ Kids shining the Light of Christ
          </motion.p>

          {/* Enhanced progress bar */}
          <div className="w-80 max-w-full mx-auto">
            <div className="relative h-6 bg-lb-purple-dark rounded-full overflow-hidden border border-lb-purple-light">
              {/* Progress fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-lb-yellow via-lb-yellow-light to-lb-yellow rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
              
              {/* Progress percentage - centered on bar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-white text-sm font-body font-bold drop-shadow-sm"
                  animate={{
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}