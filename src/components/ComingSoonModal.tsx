import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import type { FC } from 'react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND = {
  purple:      '#3D2D5B',
  purpleDark:  '#2D2341',
  purpleLight: '#6B5B8E',
  yellow:      '#FFD234',
  yellowLight: '#FFE066',
  yellowDark:  '#FFC629',
}

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ComingSoonModal: FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Header with gradient */}
            <div
              className="relative h-32 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${BRAND.purple} 0%, ${BRAND.purpleLight} 100%)`,
              }}
            >
              {/* Floating sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 1, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" fill="currentColor" />
                </motion.div>
              ))}

              <motion.h2
                className="text-2xl font-bold text-white relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Coming Soon!
              </motion.h2>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
              <motion.p
                className="text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                We're working hard to bring you something amazing! Stay tuned for updates on our latest faith-building resources for kids.
              </motion.p>

              <motion.div
                className="flex items-center justify-center gap-2 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Exciting things ahead!</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
