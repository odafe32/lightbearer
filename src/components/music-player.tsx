import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(!localStorage.getItem('musicStopped'))
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const timer = setTimeout(() => {
        audioRef.current?.play().catch(() => {
          // Auto-play may be blocked by browser
        })
      }, 3000) // 3 second delay
      return () => clearTimeout(timer)
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const toggleMusic = () => {
    const newState = !isPlaying
    setIsPlaying(newState)
    if (!newState) {
      localStorage.setItem('musicStopped', 'true')
    } else {
      localStorage.removeItem('musicStopped')
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto" style={{ display: 'none' }}>
        <source src="https://archive.org/download/Unknown-Artist-102-Instrumental-Hymns/3-8%20-%20Savior%2C%20Like%20A%20Shepherd%20Lead%20Us.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={toggleMusic}
            size="lg"
            className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-br from-lb-purple to-lb-purple-dark hover:from-lb-purple-dark hover:to-lb-purple text-white border-2 border-lb-yellow/30 relative overflow-hidden"
          >
            {/* Animated background pulse */}
            <motion.div
              className="absolute inset-0 bg-lb-yellow/20 rounded-full"
              animate={{
                scale: isPlaying ? [1, 1.2, 1] : 1,
                opacity: isPlaying ? [0.3, 0.6, 0.3] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Icon */}
            <motion.div
              animate={{
                rotate: isPlaying ? [0, 360] : 0,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="relative z-10"
            >
              {isPlaying ? (
                <Volume2 className="w-6 h-6" />
              ) : (
                <VolumeX className="w-6 h-6" />
              )}
            </motion.div>

            {/* Ripple effect when playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-lb-yellow"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </Button>

          {/* Tooltip */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <div className="bg-white/95 backdrop-blur-sm text-lb-purple px-4 py-2 rounded-lg shadow-lg border border-lb-purple/20 flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  <span className="text-sm font-body font-medium">
                    {isPlaying ? 'Music Playing' : 'Music Paused'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Visual indicator dots */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-lb-yellow rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  )
}
