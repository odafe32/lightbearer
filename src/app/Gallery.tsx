import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import type { FC } from 'react'
import { Camera, Heart, Star, X } from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = {
  purple:      '#3D2D5B',
  purpleDark:  '#2D2341',
  purpleLight: '#6B5B8E',
  yellow:      '#FFD234',
  yellowDark:  '#FFC629',
  cream:       '#FFFDF5',
  white:       '#FFFFFF',
} as const

// ─── Gallery images ───────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  {
    url: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269866/instasave.website_519496574_18065326454129873_4831572815426618900_n_k5ojwk.jpg',
    caption: 'Morning devotions with little ones',
  },
  {
    url: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269867/instasave.website_518230016_18065326412129873_8415656722943813776_n_osunbg.jpg',
    caption: 'Bible study time together',
  },
  {
    url: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269867/instasave.website_520254930_18065326394129873_4120185402406004152_n_wbbgit.jpg',
    caption: 'Building faith routines at home',
  },
  {
    url: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269868/instasave.website_516827876_18064654841129873_686155902043447603_n_zwrsmk.jpg',
    caption: 'Planting God\'s Word in young hearts',
  },
  {
    url: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269868/instasave.website_516844467_18064654844129873_1485451059338857542_n_cdurs2.jpg',
    caption: 'Joyful learning moments',
  },
  {
    url: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269868/instasave.website_516992069_18064654847129873_827477036871046331_n_phva5q.jpg',
    caption: 'Family worship time',
  },
]

// ─── Gallery Item ─────────────────────────────────────────────────────────────
const GalleryItem: FC<{ image: typeof GALLERY_IMAGES[0]; index: number; onClick: () => void }> = ({
  image, index, onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden group"
        style={{
          background: B.white,
          border: `2px solid ${B.purple}18`,
          boxShadow: `0 4px 24px ${B.purple}0E`,
          aspectRatio: '4/3',
        }}
        whileHover={{ y: -8, boxShadow: `0 24px 56px ${B.purple}22` }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={image.url}
          alt={image.caption}
          className="w-full h-full object-cover"
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: `${B.purpleDark}E6` }}
        >
          <div className="text-center px-6">
            <Camera className="w-8 h-8 mx-auto mb-3" style={{ color: B.yellow }} />
            <p className="font-heading font-black text-lg text-white">
              {image.caption}
            </p>
          </div>
        </div>

        {/* Heart icon */}
        <motion.div
          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          style={{ background: `${B.yellow}F0`, backdropFilter: 'blur(10px)' }}
          whileHover={{ scale: 1.15 }}
        >
          <Heart className="w-5 h-5" style={{ color: B.purpleDark }} fill={B.purpleDark} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────
const Lightbox: FC<{ image: typeof GALLERY_IMAGES[0] | null; onClose: () => void }> = ({
  image, onClose,
}) => {
  if (!image) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: `${B.purpleDark}F5` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.button
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-10"
        style={{ background: B.yellow, color: B.purpleDark }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
      >
        <X className="w-6 h-6" strokeWidth={2.5} />
      </motion.button>

      <motion.div
        className="w-full h-full"
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.caption}
          className="w-full h-full object-contain"
          style={{ boxShadow: `0 32px 80px ${B.purpleDark}80` }}
        />
        <motion.p
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 font-heading font-black text-xl text-white"
          style={{ color: B.yellow }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {image.caption}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Gallery Component ───────────────────────────────────────────────────
export const Gallery: FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const blobY2 = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-28"
        style={{ background: `linear-gradient(180deg, ${B.cream} 0%, #F5F0FF 100%)` }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, ${B.purple} 1.5px, transparent 1.5px)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Parallax blobs */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `${B.yellow}12`, filter: 'blur(70px)', y: blobY1 }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: `${B.purpleLight}14`, filter: 'blur(70px)', y: blobY2 }}
        />

        {/* Floating stars */}
        {([
          { top: '12%', left: '8%', size: 20, delay: 0, dur: 4.2 },
          { top: '85%', left: '10%', size: 16, delay: 1.0, dur: 5.0 },
          { top: '15%', left: '88%', size: 18, delay: 0.6, dur: 3.9 },
          { top: '80%', left: '86%', size: 14, delay: 1.5, dur: 4.7 },
        ] as Array<{ top: string; left: string; size: number; delay: number; dur: number }>).map((s, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{ top: s.top, left: s.left }}
            animate={{ y: [0, -12, 0], rotate: [0, 25, -15, 0], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          >
            <Star
              style={{ width: s.size, height: s.size, color: B.yellow }}
              fill={B.yellow}
              strokeWidth={0}
            />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Camera className="w-5 h-5" style={{ color: B.yellow }} />
              </motion.div>
              <span
                className="text-sm font-heading font-black tracking-[0.28em] uppercase px-5 py-2 rounded-full"
                style={{
                  background: `${B.yellow}22`,
                  color: B.purpleDark,
                  border: `1.5px solid ${B.yellow}88`,
                }}
              >
                Gallery
              </span>
              <motion.div
                animate={{ rotate: [0, -20, 20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                <Camera className="w-5 h-5" style={{ color: B.yellow }} />
              </motion.div>
            </div>

            {/* Headline */}
            <h2
              className="font-heading font-black leading-tight mb-5"
              style={{ color: B.purpleDark, fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Moments of{' '}
              <span className="relative inline-block" style={{ color: B.purpleLight }}>
                Faith &amp; Joy
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 rounded-full"
                  style={{ height: 5, background: `linear-gradient(90deg, ${B.yellow}, ${B.yellowDark})` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </h2>

            <p className="text-xl font-body font-bold max-w-2xl mx-auto" style={{ color: B.purpleLight }}>
              See how families are building faith routines with Lightbearers ✨
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((image, i) => (
              <GalleryItem
                key={i}
                image={image}
                index={i}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </>
  )
}
