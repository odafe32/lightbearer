import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { FC, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Baby, BookOpen, Home, Heart,
  Star, Sparkles, ArrowRight, Check,
} from 'lucide-react'

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

// ─── Types ────────────────────────────────────────────────────────────────────
interface AudienceCard {
  icon:        LucideIcon
  emoji:       string
  title:       string
  description: string
  image:       string
}

interface FadeUpProps {
  children:   ReactNode
  delay?:     number
  className?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const AUDIENCE: AudienceCard[] = [
  {
    icon:        Baby,
    emoji:       '🧸',
    title:       'Parents of Toddlers',
    description: 'Looking for Christian toddler devotionals simple enough for little minds to grasp and love.',
    image:       'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269866/instasave.website_520824826_18065326439129873_4549372370702106853_n_pwuwi7.jpg',
  },
  {
    icon:        BookOpen,
    emoji:       '📖',
    title:       'Bible Study Families',
    description: 'Families wanting simple, joyful Bible study tools that actually work for young children.',
    image:       'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269868/instasave.website_516992069_18064654847129873_827477036871046331_n_phva5q.jpg',
  },
  {
    icon:        Home,
    emoji:       '🏡',
    title:       'Faith Routine Builders',
    description: 'Moms and dads building daily faith habits at home — morning, bedtime, or anytime.',
    image:       'https://res.cloudinary.com/dllrkis3c/image/upload/v1771270083/instasave.website_630108923_18085782290129873_3833615884650442891_n_jcg2rc.jpg',
  },
  {
    icon:        Heart,
    emoji:       '✝️',
    title:       'Scripture-First Families',
    description: 'Christian families seeking Scripture-based resources that plant God\'s Word in young hearts.',
    image:       'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269867/instasave.website_519022191_18065326409129873_4233168854052142248_n_hr7t7r.jpg',
  },
]

const CHECKLIST: string[] = [
  'Parents looking for Christian toddler devotionals',
  'Families wanting simple Bible study tools for kids',
  'Moms and dads building daily faith routines at home',
  'Christian families seeking Scripture-based resources',
]

// ─── Scroll-triggered FadeUp ──────────────────────────────────────────────────
const FadeUp: FC<FadeUpProps> = ({ children, delay = 0, className = '' }) => {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 52 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Scroll-triggered SlideIn ─────────────────────────────────────────────────
const SlideIn: FC<FadeUpProps & { from?: 'left' | 'right' }> = ({
  children, delay = 0, className = '', from = 'left',
}) => {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: from === 'left' ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Audience card ────────────────────────────────────────────────────────────
const AudienceCardItem: FC<{ card: AudienceCard; delay: number; index: number }> = ({
  card, delay, index,
}) => {
  const { icon: Icon, emoji, title, description, image } = card
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative rounded-[1.75rem] overflow-hidden cursor-default flex flex-col h-full"
        style={{
          background: B.white,
          border:     `2px solid ${B.purple}18`,
          boxShadow:  `0 4px 24px ${B.purple}0E`,
        }}
        whileHover={{ y: -8, boxShadow: `0 24px 56px ${B.purple}22` }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Image ── */}
        <div className="relative overflow-hidden" style={{ height: 340 }}>
          <motion.img
            src={image}
            alt={title}
            // className="w-full h-full object-contain block"
                        className="w-full h-full object-cover block"
            initial={{ scale: 1.1 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1.0, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Dark gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${B.purpleDark}DD 0%, transparent 55%)` }}
          />

          {/* Floating emoji — animates in */}
          <motion.div
            className="absolute top-3 right-4 text-2xl select-none"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -8, 0], scale: [1, 1.18, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
              style={{ display: 'inline-block' }}
            >
              {emoji}
            </motion.span>
          </motion.div>

          {/* Icon + title pill on image */}
          <motion.div
            className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: `${B.yellow}F0`, backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: delay + 0.3 }}
          >
            <Icon
              className="w-4 h-4 flex-shrink-0"
              style={{ color: B.purpleDark }}
              strokeWidth={2.2}
            />
            <span
              className="font-heading font-black text-sm whitespace-nowrap"
              style={{ color: B.purpleDark }}
            >
              {title}
            </span>
          </motion.div>
        </div>

        {/* ── Text ── */}
        <div className="px-5 py-4 flex-1 flex flex-col">
          <p className="font-body font-semibold text-base leading-relaxed flex-1" style={{ color: '#5a4e7a' }}>
            {description}
          </p>
          {/* Gold accent line */}
          <motion.div
            className="mt-4 h-1 rounded-full"
            style={{ background: `linear-gradient(90deg, ${B.yellow}, ${B.yellowDark})` }}
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.7, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export const WhoThisIsFor: FC = () => {
  const sectionRef   = useRef<HTMLElement>(null)
  const bannerRef    = useRef<HTMLDivElement>(null)
  const bannerInView = useInView(bannerRef, { once: true, margin: '-60px' })

  // Subtle parallax on the section blobs
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const blobY2 = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28"
      style={{ background: `linear-gradient(180deg, #F5F0FF 0%, ${B.cream} 100%)` }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, ${B.purple} 1.5px, transparent 1.5px)`,
          backgroundSize:  '36px 36px',
        }}
      />

      {/* Parallax ambient blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `${B.yellow}12`, filter: 'blur(70px)', y: blobY1 }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `${B.purpleLight}14`, filter: 'blur(70px)', y: blobY2 }}
      />

      {/* Floating animated stars */}
      {([
        { top: '8%',  left: '4%',  size: 22, delay: 0,   dur: 4.0 },
        { top: '88%', left: '6%',  size: 16, delay: 1.2, dur: 5.2 },
        { top: '10%', left: '92%', size: 18, delay: 0.5, dur: 3.8 },
        { top: '85%', left: '90%', size: 14, delay: 1.8, dur: 4.5 },
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <FadeUp className="text-center mb-16">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Star className="w-4 h-4" style={{ color: B.yellow }} fill={B.yellow} strokeWidth={0} />
            </motion.div>
            <span
              className="text-sm font-heading font-black tracking-[0.28em] uppercase px-5 py-2 rounded-full"
              style={{
                background: `${B.yellow}22`,
                color:       B.purpleDark,
                border:      `1.5px solid ${B.yellow}88`,
              }}
            >
              Who This Is For
            </span>
            <motion.div
              animate={{ rotate: [0, -20, 20, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <Star className="w-4 h-4" style={{ color: B.yellow }} fill={B.yellow} strokeWidth={0} />
            </motion.div>
          </div>

          {/* Headline */}
          <h2
            className="font-heading font-bold leading-tight mb-5"
            style={{ color: B.purpleDark, fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            For  Raising{' '}
            <span className="relative inline-block" style={{ color: B.purpleLight }}>
              Kids &amp; Young Children
              <motion.span
                className="absolute -bottom-1 left-0 right-0 rounded-full"
                style={{ height: 5, background: `linear-gradient(90deg, ${B.yellow}, ${B.yellowDark})` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>{' '}
            in Faith
          </h2>

          <p className="text-xl font-body font-bold max-w-xl mx-auto" style={{ color: B.purpleLight }}>
            Lightbearers is designed for families just like yours 🌟
          </p>
        </FadeUp>

        {/* ── Audience cards ──────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-14">
          {AUDIENCE.map((card, i) => (
            <AudienceCardItem
              key={card.title}
              card={card}
              index={i}
              delay={0.1 + i * 0.12}
            />
          ))}
        </div>

        {/* ── Checklist strip ─────────────────────────────────────────────── */}
        <SlideIn from="left" delay={0.1}>
          <div
            className="rounded-[2rem] px-8 py-8 md:px-12 mb-12"
            style={{
              background: B.white,
              border:     `2px solid ${B.purple}18`,
              boxShadow:  '0 4px 32px rgba(61,45,91,0.07)',
            }}
          >
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
              {CHECKLIST.map((item, i) => {
                const ref    = useRef<HTMLDivElement>(null)
                const inView = useInView(ref, { once: true, margin: '-30px' })
                return (
                  <motion.div
                    key={item}
                    ref={ref}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${B.yellow}30`, border: `1.5px solid ${B.yellowDark}55` }}
                    >
                      <Check
                        className="w-3.5 h-3.5"
                        style={{ color: B.purpleDark }}
                        strokeWidth={2.8}
                      />
                    </div>
                    <span className="font-body font-medium text-base leading-relaxed" style={{ color: '#5a4e7a' }}>
                      {item}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </SlideIn>

        {/* ── Dark closing banner ─────────────────────────────────────────── */}
        <FadeUp delay={0.2}>
          <motion.div
            ref={bannerRef}
            className="relative rounded-[2rem] overflow-hidden px-8 py-14 md:px-16 text-center"
            style={{
              background: `linear-gradient(135deg, ${B.purpleDark} 0%, ${B.purple} 60%, ${B.purpleLight} 100%)`,
              boxShadow:  `0 32px 80px rgba(45,35,65,0.35)`,
            }}
          >
            {/* Dot texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle, ${B.yellow} 1px, transparent 1px)`,
                backgroundSize:  '28px 28px',
              }}
            />

            {/* Corner stars */}
            {([
              { top: '15%', left: '5%',  delay: 0   },
              { top: '70%', left: '4%',  delay: 0.6 },
              { top: '12%', left: '92%', delay: 0.3 },
              { top: '72%', left: '91%', delay: 0.9 },
            ] as Array<{ top: string; left: string; delay: number }>).map((s, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: s.top, left: s.left }}
                animate={{ rotate: [0, 22, -22, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 4.5 + i, repeat: Infinity, delay: s.delay }}
              >
                <Star
                  className="w-6 h-6 md:w-8 md:h-8"
                  style={{ color: B.yellow, opacity: 0.4 }}
                  fill={B.yellow}
                  strokeWidth={0}
                />
              </motion.div>
            ))}

            {/* Sparkle icon */}
            <motion.div
              className="flex justify-center mb-5"
              initial={{ opacity: 0, scale: 0.5, y: 16 }}
              animate={bannerInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${B.yellow}22`, border: `1.5px solid ${B.yellow}44` }}
              >
                <Sparkles className="w-7 h-7" style={{ color: B.yellow }} />
              </div>
            </motion.div>

            {/* Statement lines — staggered scroll reveal */}
            <motion.p
              className="font-heading font-black text-white leading-snug mb-2 max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={bannerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              You don't need long sermons.
            </motion.p>

            <motion.p
              className="font-heading font-black leading-snug mb-6 max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: B.yellow }}
              initial={{ opacity: 0, y: 24 }}
              animate={bannerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38 }}
            >
              You need simple, consistent truth.
            </motion.p>

            <motion.p
              className="font-body font-medium text-white/70 text-lg max-w-md mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={bannerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.52 }}
            >
              That's exactly what Lightbearers was built to give your family — one day at a time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={bannerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.62 }}
            >
              <motion.button
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-heading font-black text-lg"
                style={{ background: B.yellow, color: B.purpleDark, boxShadow: `0 8px 28px ${B.yellow}50` }}
                whileHover={{ scale: 1.06, boxShadow: `0 14px 36px ${B.yellow}65` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const element = document.getElementById('resources')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Resources
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-heading font-black text-lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color:      B.white,
                  border:     '1.5px solid rgba(255,255,255,0.22)',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const element = document.getElementById('about')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Learn About The Founder
              </motion.button>
            </motion.div>
          </motion.div>
        </FadeUp>

      </div>
    </section>
  )
}