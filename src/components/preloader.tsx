import { motion, AnimatePresence } from 'framer-motion'
import { Star, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Preloader = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  
  const messages = [
    'Spreading Light...',
    'Gathering Little Stars...',
    'Sprinkling Joy...',
    'Almost There!',
  ]

  useEffect(() => {
    const duration = 3000
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = (currentStep / steps) * 100
      setProgress(newProgress)
      
      // Change message based on progress
      const newMessageIndex = Math.min(
        Math.floor((newProgress / 100) * messages.length),
        messages.length - 1
      )
      setMessageIndex(newMessageIndex)
      
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
        className="fixed inset-0 bg-gradient-to-br from-lb-purple via-lb-purple-dark to-lb-purple-dark flex items-center justify-center z-50 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Animated gradient orbs in background */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-lb-yellow/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-lb-purple-light/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating sparkles - more optimized */}
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 3 + 1
          const duration = Math.random() * 3 + 2
          const delay = Math.random() * 2
          
          return (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            />
          )
        })}

        {/* Main content container */}
        <div className="text-center relative z-10 px-8">
          {/* Logo Animation - Large centered star burst */}
          <motion.div 
            className="relative mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 -m-8"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-40 h-40 mx-auto rounded-full bg-lb-yellow/30 blur-xl" />
            </motion.div>

            {/* Center star icon */}
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="relative w-24 h-24 mx-auto">
                {/* Main star */}
                <Star className="w-full h-full text-lb-yellow fill-lb-yellow drop-shadow-2xl" strokeWidth={1.5} />
                
                {/* Orbiting mini stars */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60) * (Math.PI / 180)
                  const radius = 50
                  
                  return (
                    <motion.div
                      key={`orbit-${i}`}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [
                          Math.cos(angle) * radius,
                          Math.cos(angle + Math.PI * 2) * radius,
                        ],
                        y: [
                          Math.sin(angle) * radius,
                          Math.sin(angle + Math.PI * 2) * radius,
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                      }}
                    >
                      <Star className="w-4 h-4 text-white fill-white" />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Light rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-lb-yellow/60 to-transparent rounded-full origin-bottom"
                style={{
                  height: '60px',
                  transform: `rotate(${i * 45}deg) translateX(-50%)`,
                }}
                animate={{
                  scaleY: [0.5, 1, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-heading text-white mb-2 drop-shadow-lg">
              Light Bearers
            </h1>
            <motion.div
              className="flex items-center justify-center gap-2 text-lb-yellow"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-5 h-5" />
              <p className="text-lg font-body font-medium">Bringing Faith to Life</p>
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* Animated message with smooth transition */}
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-heading text-white/90 mb-10 min-h-[32px]"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Enhanced progress bar */}
          <div className="w-80 max-w-full mx-auto">
            <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              {/* Progress fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-lb-yellow via-lb-yellow-light to-lb-yellow rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: [-80, 320],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-lb-yellow/30 blur-md"
                style={{ width: `${progress}%` }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </div>
            
            {/* Progress percentage */}
            <motion.p 
              className="text-white/70 text-sm font-body mt-3 font-medium"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>

          {/* Bouncing decorative elements */}
          <div className="flex justify-center items-center gap-6 mt-12">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`bounce-${i}`}
                className="w-3 h-3 rounded-full bg-lb-yellow shadow-lg shadow-lb-yellow/50"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}