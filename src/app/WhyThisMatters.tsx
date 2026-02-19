import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { BookOpen, BookHeart, Sparkles, Home, Quote, Star, X, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND = {
  purple:      '#3D2D5B',
  purpleDark:  '#2D2341',
  purpleLight: '#6B5B8E',
  yellow:      '#FFD234',
  yellowLight: '#FFE066',
  yellowDark:  '#FFC629',
}

// ─── Images ───────────────────────────────────────────────────────────────────
const IMAGES = [
  {
    id:    'main',
    src:   'https://res.cloudinary.com/dllrkis3c/image/upload/v1771535844/instasave.website_514603861_18064096889129873_2668405953124291892_n_xgdo5c.jpg',
    label: 'Christ-centered resources for families',
  },
  {
    id:    'second',
    src:   'https://res.cloudinary.com/dllrkis3c/image/upload/v1771270046/instasave.website_634217859_18086610635129873_6199173910076388246_n_ob0wnx.jpg',
    label: 'Devotional cards for kids',
  },
  {
    id:    'third',
    src:   'https://res.cloudinary.com/dllrkis3c/image/upload/v1771270083/instasave.website_630108923_18085782290129873_3833615884650442891_n_jcg2rc.jpg',
    label: 'Faith resources for toddlers',
  },
]

// ─── Pillars ──────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    Icon:   BookOpen,
    title:  'Prayers for Kids',
    body:   'Simple, heartfelt prayers that help kids connect with God every day.',
    accent: BRAND.yellow,
    iconBg: `${BRAND.yellow}22`,
  },
  {
    Icon:   BookHeart,
    title:  'Simple Christian Devotionals',
    body:   'Short, joyful devotionals designed for toddlers and young hearts to understand.',
    accent: BRAND.purple,
    iconBg: `${BRAND.purple}14`,
  },
  {
    Icon:   Sparkles,
    title:  'Scripture Affirmations',
    body:   'Bible-based affirmation cards that speak truth and identity over your child.',
    accent: BRAND.yellowDark,
    iconBg: `${BRAND.yellowDark}1A`,
  },
  {
    Icon:   Home,
    title:  'Faith Habits for Real Family Life',
    body:   'Practical habits that work in real life — no perfect household required.',
    accent: BRAND.purpleLight,
    iconBg: `${BRAND.purpleLight}18`,
  },
]

// ─── Bounce animation variants ────────────────────────────────────────────────
const bounceVariants: Variants = {
  animate: (delay: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1], // easeInOut as cubic-bezier
      delay,
    },
  }),
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
const FadeUp = ({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({
  images, activeId, onClose, onNav,
}: {
  images: typeof IMAGES
  activeId: string | null
  onClose: () => void
  onNav: (dir: 1 | -1) => void
}) => {
  const active = images.find(img => img.id === activeId)

  return (
    <AnimatePresence>
      {activeId && active && (
        // Backdrop
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(18,10,36,0.93)', backdropFilter: 'blur(14px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
        >
          {/* Prev arrow */}
          <motion.button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
            onClick={e => { e.stopPropagation(); onNav(-1) }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.12, background: `${BRAND.yellow}33` }}
            whileTap={{ scale: 0.92 }}
            transition={{ delay: 0.15 }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          {/* Image card */}
          <motion.div
            key={activeId}
            className="relative mx-16 md:mx-24"
            style={{ maxWidth: 700, width: '100%' }}
            initial={{ opacity: 0, scale: 0.82, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Image — fully shown, no crop */}
            <div
              className="rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              style={{ border: `2px solid rgba(255,255,255,0.08)` }}
            >
              <img
                src={active.src}
                alt={active.label}
                style={{
                  display:   'block',
                  width:     '100%',
                  height:    'auto',       // ← natural height, nothing cropped
                  maxHeight: '80vh',
                  objectFit: 'contain',    // ← full image always visible
                  background: BRAND.purpleDark,
                }}
              />
            </div>

            {/* Label */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
            >
              <BookOpen className="w-4 h-4" style={{ color: BRAND.yellow }} />
              <span className="text-white/80 font-body text-sm font-semibold">{active.label}</span>
            </motion.div>

            {/* Close button */}
            <motion.button
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: BRAND.yellow }}
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: 0.18, type: 'spring', stiffness: 320 }}
            >
              <X className="w-5 h-5" style={{ color: BRAND.purple }} />
            </motion.button>
          </motion.div>

          {/* Next arrow */}
          <motion.button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
            onClick={e => { e.stopPropagation(); onNav(1) }}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.12, background: `${BRAND.yellow}33` }}
            whileTap={{ scale: 0.92 }}
            transition={{ delay: 0.15 }}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>

          {/* Dot indicators */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
          >
            {images.map(img => (
              <motion.div
                key={img.id}
                className="rounded-full"
                animate={{
                  width:      img.id === activeId ? 24 : 8,
                  height:     8,
                  background: img.id === activeId ? BRAND.yellow : 'rgba(255,255,255,0.35)',
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Bouncing clickable image ─────────────────────────────────────────────────
const BouncingImg = ({
  image,
  bounceDelay,
  className,
  wrapperClassName,
  wrapperStyle,
  onClick,
  children,
}: {
  image: typeof IMAGES[0]
  bounceDelay: number
  className?: string
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  onClick: (id: string) => void
  children?: React.ReactNode
}) => (
  <motion.div
    className={wrapperClassName}
    style={wrapperStyle}
    variants={bounceVariants}
    animate="animate"
    custom={bounceDelay}
  >
    <motion.div
      className={`relative overflow-hidden cursor-zoom-in ${className ?? ''}`}
      onClick={() => onClick(image.id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <img
        src={image.src}
        alt={image.label}
        className="w-full h-full object-cover block"
      />
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{ background: `${BRAND.purple}55` }}
      >
        <span
          className="text-white text-xs font-body font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}
        >
          View
        </span>
      </motion.div>
      {children}
    </motion.div>
  </motion.div>
)

// ─── Main section ─────────────────────────────────────────────────────────────
export const WhyThisMatters = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const quoteRef    = useRef(null)
  const quoteInView = useInView(quoteRef, { once: true, margin: '-80px' })

  const openImage  = (id: string) => setActiveId(id)
  const closeImage = () => setActiveId(null)
  const navigate   = (dir: 1 | -1) => {
    const idx  = IMAGES.findIndex(img => img.id === activeId)
    const next = (idx + dir + IMAGES.length) % IMAGES.length
    setActiveId(IMAGES[next].id)
  }

  return (
    <>
      <Lightbox images={IMAGES} activeId={activeId} onClose={closeImage} onNav={navigate} />

      <section className="relative bg-white overflow-hidden">

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[1]">
          <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C360,96 1080,0 1440,64 L1440,0 Z" fill={BRAND.purple} />
          </svg>
        </div>

        {/* Soft blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: BRAND.yellow }} />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: BRAND.purple }} />
        </div>

        <div className="relative z-[2] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-28">

          {/* Label */}
          <FadeUp className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full font-body"
              style={{ background: `${BRAND.yellow}22`, color: BRAND.purpleDark, border: `1.5px solid ${BRAND.yellow}` }}
            >
              <Star className="w-3 h-3 fill-current" style={{ color: BRAND.yellow }} />
              Why This Matters
              <Star className="w-3 h-3 fill-current" style={{ color: BRAND.yellow }} />
            </span>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.1} className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight" style={{ color: BRAND.purpleDark }}>
              Teaching Children the Bible{' '}
              <span className="relative inline-block" style={{ color: BRAND.purple }}>
                Starts at Home
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full"
                  style={{ background: BRAND.yellow }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2} className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xl text-gray-500 leading-relaxed font-body font-semibold">
              In today's world, children are constantly forming beliefs about identity, truth, and
              belonging. Teaching kids the Word of God from an early age builds{' '}
              <strong style={{ color: BRAND.purple }}>confidence, character,</strong> and{' '}
              <strong style={{ color: BRAND.purple }}>spiritual strength.</strong>
            </p>
          </FadeUp>

          {/* Two-col grid */}
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center mb-24">

            {/* Left — bouncing image collage */}
            <FadeUp delay={0.15} className="relative" >

              {/* Main tall image — bounce slow */}
              <BouncingImg
                image={IMAGES[0]}
                bounceDelay={0}
                wrapperClassName="relative rounded-3xl shadow-2xl overflow-hidden"
                wrapperStyle={{ aspectRatio: '4/5' }}
                className="rounded-3xl w-full h-full"
                onClick={openImage}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${BRAND.purpleDark}88 0%, transparent 55%)` }}
                />
                <div
                  className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-2xl pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: BRAND.yellow }} />
                  <span className="text-white text-base font-body font-semibold">
                    Christ-centered resources for families
                  </span>
                </div>
              </BouncingImg>

              {/* Top-right thumbnail — bounce offset */}
              <BouncingImg
                image={IMAGES[1]}
                bounceDelay={0.6}
                wrapperClassName="absolute -top-8 -right-6 w-36 md:w-44 rounded-2xl shadow-xl border-4 border-white overflow-hidden"
                wrapperStyle={{ rotate: '6deg' }}
                className="w-full aspect-square"
                onClick={openImage}
              />

              {/* Bottom-left thumbnail — bounce offset */}
              <BouncingImg
                image={IMAGES[2]}
                bounceDelay={1.1}
                wrapperClassName="absolute -bottom-8 -left-6 w-32 md:w-40 rounded-2xl shadow-xl border-4 border-white overflow-hidden"
                wrapperStyle={{ rotate: '-5deg' }}
                className="w-full aspect-square"
                onClick={openImage}
              />

              {/* Blobs */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 rounded-full pointer-events-none" style={{ background: `${BRAND.yellow}25` }} />
              <div className="absolute -z-10 -top-8 -left-8 w-56 h-56 rounded-full pointer-events-none" style={{ background: `${BRAND.purpleLight}18` }} />
            </FadeUp>

            {/* Right — pillars */}
            <div className="space-y-4">
              <FadeUp delay={0.2}>
                <p className="text-lg text-gray-600 leading-loose font-body font-semibold mb-6">
                  At Lightbearers, we help parents introduce consistent, joyful faith practices
                  that grow with their children — from the very first years of life.
                </p>
              </FadeUp>

              {PILLARS.map(({ Icon, title, body, accent, iconBg }, i) => (
                <FadeUp key={title} delay={0.25 + i * 0.1}>
                  <motion.div
                    className="flex items-start gap-4 p-5 rounded-2xl cursor-default"
                    style={{ background: '#FAFAFA', border: '1.5px solid #EEEEEE' }}
                    whileHover={{ background: `${accent}0D`, borderColor: `${accent}55`, x: 8, boxShadow: `0 4px 24px ${accent}18` }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ background: iconBg }}>
                      <Icon className="w-6 h-6" style={{ color: accent }} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-[15px] mb-1" style={{ color: BRAND.purpleDark }}>{title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-body">{body}</p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Quote banner */}
          <FadeUp delay={0.1}>
            <motion.div
              ref={quoteRef}
              className="relative rounded-3xl overflow-hidden px-8 py-14 md:px-16 text-center"
              style={{ background: `linear-gradient(135deg, ${BRAND.purpleDark} 0%, ${BRAND.purple} 60%, ${BRAND.purpleLight} 100%)` }}
            >
              {[
                { top: '14%', left: '4%',  delay: 0   },
                { top: '70%', left: '3%',  delay: 0.4 },
                { top: '12%', left: '93%', delay: 0.2 },
                { top: '68%', left: '92%', delay: 0.6 },
              ].map((s, i) => (
                <motion.div key={i} className="absolute pointer-events-none" style={{ top: s.top, left: s.left }}
                  animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.25, 1] }}
                  transition={{ duration: 5 + i, repeat: Infinity, delay: s.delay }}
                >
                  <Star className="w-6 h-6 md:w-8 md:h-8" style={{ color: BRAND.yellow, opacity: 0.45 }} fill={BRAND.yellow} />
                </motion.div>
              ))}

              <motion.div className="flex justify-center mb-4"
                initial={{ opacity: 0, y: 16 }} animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${BRAND.yellow}22`, border: `1.5px solid ${BRAND.yellow}44` }}
                >
                  <Quote className="w-7 h-7" style={{ color: BRAND.yellow }} fill={BRAND.yellow} />
                </div>
              </motion.div>

              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white leading-snug mb-4 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }} animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Arise, shine; for your light has come, and the glory of the Lord has risen upon you.
              </motion.p>

              <motion.p
                className="text-base font-body font-bold tracking-widest uppercase mb-10"
                style={{ color: BRAND.yellow }}
                initial={{ opacity: 0 }} animate={quoteInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                — Isaiah 60:1
              </motion.p>

              {/* Clickable + bouncing strip */}
              <motion.div
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 20 }} animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                {IMAGES.map((img, i) => (
                  <motion.div
                    key={img.id}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 cursor-zoom-in"
                    style={{ borderColor: `${BRAND.yellow}55` }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                    whileHover={{ scale: 1.12, borderColor: BRAND.yellow }}
                    onClick={() => openImage(img.id)}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </FadeUp>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-[1]">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,64 C480,0 960,64 1440,20 L1440,64 Z" fill="#FAFAFA" />
          </svg>
        </div>
      </section>
    </>
  )
}