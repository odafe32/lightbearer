import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen, Palette, Star, Heart, Home,
  Sun, Moon, Sparkles, ArrowRight, Check,
} from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = {
  purple:      '#3D2D5B',
  purpleDark:  '#2D2341',
  purpleLight: '#6B5B8E',
  yellow:      '#FFD234',
  yellowLight: '#FFE066',
  yellowDark:  '#FFC629',
  cream:       '#FFFDF5',
  white:       '#FFFFFF',
} as const

// ─── Types ────────────────────────────────────────────────────────────────────
interface Perk {
  icon: LucideIcon
  text: string
}

interface Product {
  id:          string
  tag:         string
  tagColor:    string
  emoji:       string
  Icon:        LucideIcon
  accentColor: string
  bgColor:     string
  borderColor: string
  title:       string
  subtitle:    string
  image:       string
  description: string
  perks:       Perk[]
  cta:         string
  size:        'large' | 'small'
}

interface DecoShape {
  type:  'star' | 'circle'
  top:   string
  left:  string
  size:  number
  color: string
  delay: number
  dur:   number
}

// interface TrustBadge {
//   emoji: string
//   text:  string
// }

// ─── Product data ─────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id:          'devotional',
    tag:         'Best Seller',
    tagColor:    B.yellow,
    emoji:       '📖',
    Icon:        BookOpen,
    accentColor: B.purple,
    bgColor:     '#F3F0FF',
    borderColor: '#C4B8E8',
    title:       '31-Day Christian Devotional for Kids',
    subtitle:    'Scripture-centered daily devotions',
    image:       'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269867/instasave.website_520254930_18065326394129873_4120185402406004152_n_wbbgit.jpg',
    description: "A Scripture-centered devotional created for toddlers and young children. Each day includes short Bible teachings, reflection prompts, and simple applications that make God's Word easy to understand.",
    perks: [
      { icon: Moon, text: 'Bedtime Bible routines'      },
      { icon: Sun,  text: 'Morning devotion time'       },
      { icon: Home, text: 'Family discipleship at home' },
    ],
    cta:  'Get the Devotional',
    size: 'large',
  },
  {
    id:          'coloring',
    tag:         'Kids Love It',
    tagColor:    '#FF8C69',
    emoji:       '🎨',
    Icon:        Palette,
    accentColor: '#E05C2A',
    bgColor:     '#FFF4EF',
    borderColor: '#F5C4B0',
    title:       'Bible Coloring Books & Tracing Activities',
    subtitle:    'ABC Bible adventures',
    image:       'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269868/instasave.website_516844467_18064654844129873_1485451059338857542_n_cdurs2.jpg',
    description: "ABC Bible coloring books featuring biblical characters and Scripture-based tracing activities that reinforce early learning while introducing children to God's Word.",
    perks: [
      { icon: Sparkles, text: 'Biblical characters' },
      { icon: Star,     text: 'Scripture tracing'   },
    ],
    cta:  'Explore Books',
    size: 'small',
  },
  {
    id:          'affirmations',
    tag:         'New ✨',
    tagColor:    '#34C759',
    emoji:       '✨',
    Icon:        Heart,
    accentColor: '#1A7F3C',
    bgColor:     '#F0FBF4',
    borderColor: '#A8DFB8',
    title:       'Christian Affirmation Cards for Children',
    subtitle:    'Biblical identity & confidence',
    image:       'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269868/instasave.website_516992069_18064654847129873_827477036871046331_n_phva5q.jpg',
    description: 'Biblical identity statements rooted in Scripture to help children grow confident in who they are in Christ.',
    perks: [
      { icon: Heart,    text: 'Identity in Christ' },
      { icon: Sparkles, text: 'Scripture-rooted'   },
    ],
    cta:  'Shop Cards',
    size: 'small',
  },
]

// ─── Deco shapes ──────────────────────────────────────────────────────────────
const SHAPES: DecoShape[] = [
  { type: 'star',   top: '6%',  left: '3%',  size: 28, color: B.yellow,      delay: 0,   dur: 3.5 },
  { type: 'circle', top: '12%', left: '88%', size: 20, color: '#FF8C69',     delay: 0.8, dur: 4.2 },
  { type: 'star',   top: '80%', left: '5%',  size: 18, color: '#34C759',     delay: 1.5, dur: 5.0 },
  { type: 'star',   top: '85%', left: '92%', size: 22, color: B.yellow,      delay: 0.4, dur: 3.8 },
  { type: 'circle', top: '45%', left: '96%', size: 14, color: B.purpleLight, delay: 1.2, dur: 4.5 },
  { type: 'circle', top: '55%', left: '1%',  size: 16, color: '#FF8C69',     delay: 2.0, dur: 3.2 },
]

// ─── Trust badges ─────────────────────────────────────────────────────────────
// const TRUST_BADGES: TrustBadge[] = [
//   { emoji: '📦', text: 'Digital Download' },
//   { emoji: '👨‍👩‍👧', text: 'Family Approved'  },
//   { emoji: '✝️',  text: 'Bible-Based'      },
//   { emoji: '🎉', text: 'Kids Love Them'   },
// ]

// ─── FadeUp ───────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children:   ReactNode
  delay?:     number
  className?: string
}

const FadeUp: FC<FadeUpProps> = ({ children, delay = 0, className = '' }) => {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Large card ───────────────────────────────────────────────────────────────
interface CardProps {
  product: Product
  delay:   number
}

const LargeCard: FC<CardProps> = ({ product, delay }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const {
    Icon, accentColor, bgColor, borderColor,
    tag, tagColor, title, subtitle,
    image, description, perks, cta, emoji,
  } = product

  return (
    <FadeUp delay={delay} className="lg:col-span-2">
      <motion.div
        className="relative rounded-[2rem] overflow-hidden cursor-pointer"
        style={{ background: bgColor, border: `2.5px solid ${borderColor}`, boxShadow: `0 8px 40px ${accentColor}18` }}
        whileHover={{ y: -6, boxShadow: `0 24px 60px ${accentColor}28` }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={()   => setHovered(false)}
      >
        {/* Tag badge */}
        <div
          className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-bold tracking-wide"
          style={{ background: tagColor, color: B.purpleDark }}
        >
          <Star className="w-3 h-3" fill={B.purpleDark} strokeWidth={0} />
          {tag}
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] min-h-[360px]">
          {/* Image panel */}
          <div className="relative overflow-hidden rounded-[1.75rem_0_0_1.75rem] min-h-[280px] md:min-h-[360px]">
            <motion.img
              src={image} alt={title}
              className="w-full h-full object-cover block"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(to right, transparent 60%, ${bgColor} 100%)` }}
            />
            <motion.div
              className="absolute top-4 right-4 text-4xl select-none"
              animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              {emoji}
            </motion.div>
          </div>

          {/* Text panel */}
          <div className="flex flex-col justify-center px-8 py-8">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${accentColor}18`, border: `1.5px solid ${accentColor}30` }}
              >
                <Icon className="w-5 h-5" style={{ color: accentColor }} strokeWidth={2} />
              </div>
              <span
                className="text-xs font-body font-bold tracking-widest uppercase"
                style={{ color: accentColor }}
              >
                {subtitle}
              </span>
            </div>

            <h3
              className="font-heading font-bold leading-tight mb-4"
              style={{ color: B.purpleDark, fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)' }}
            >
              {title}
            </h3>

            <p className="text-sm font-body leading-relaxed mb-5" style={{ color: '#5a4e7a' }}>
              {description}
            </p>

            <ul className="space-y-2 mb-6">
              {perks.map(({ icon: PerkIcon, text }) => (
                <li key={text} className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accentColor}15` }}
                  >
                    <PerkIcon className="w-3.5 h-3.5" style={{ color: accentColor }} strokeWidth={2.2} />
                  </div>
                  <span className="text-sm font-body font-semibold" style={{ color: B.purple }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <motion.button
              className="self-start flex items-center gap-2 px-6 py-3 rounded-2xl font-heading font-bold text-base text-white"
              style={{ background: accentColor, boxShadow: `0 6px 20px ${accentColor}40` }}
              whileHover={{ scale: 1.05, boxShadow: `0 10px 28px ${accentColor}55` }}
              whileTap={{ scale: 0.97 }}
            >
              {cta}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </FadeUp>
  )
}

// ─── Small card ───────────────────────────────────────────────────────────────
const SmallCard: FC<CardProps> = ({ product, delay }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const {
    Icon, accentColor, bgColor, borderColor,
    tag, tagColor, title, subtitle,
    image, description, perks, cta, emoji,
  } = product

  return (
    <FadeUp delay={delay}>
      <motion.div
        className="relative rounded-[2rem] overflow-hidden cursor-pointer h-full flex flex-col"
        style={{ background: bgColor, border: `2.5px solid ${borderColor}`, boxShadow: `0 8px 32px ${accentColor}15` }}
        whileHover={{ y: -8, boxShadow: `0 24px 56px ${accentColor}28` }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={()   => setHovered(false)}
      >
        {/* Tag badge */}
        <div
          className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-heading font-bold"
          style={{ background: tagColor, color: B.purpleDark }}
        >
          {tag}
        </div>

        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 220 }}>
          <motion.img
            src={image} alt={title}
            className="w-full h-full object-cover block"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${bgColor} 0%, transparent 50%)` }}
          />
          <motion.div
            className="absolute top-3 right-4 text-3xl select-none"
            animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {emoji}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-6 py-5">
          <div className="flex items-center gap-2 mb-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${accentColor}18`, border: `1.5px solid ${accentColor}30` }}
            >
              <Icon className="w-4 h-4" style={{ color: accentColor }} strokeWidth={2} />
            </div>
            <span
              className="text-[11px] font-heading font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              {subtitle}
            </span>
          </div>

          <h3
            className="font-heading font-bold leading-snug mb-3"
            style={{ color: B.purpleDark, fontSize: '1.15rem' }}
          >
            {title}
          </h3>

          <p className="text-sm font-body leading-relaxed mb-4 flex-1" style={{ color: '#5a4e7a' }}>
            {description}
          </p>

          <ul className="space-y-1.5 mb-5">
            {perks.map(({ text }) => (
              <li key={text} className="flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} strokeWidth={2.5} />
                <span className="text-xs font-body font-semibold" style={{ color: B.purple }}>
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <motion.button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-heading font-bold text-sm text-white"
            style={{ background: accentColor, boxShadow: `0 6px 18px ${accentColor}38` }}
            whileHover={{ scale: 1.04, boxShadow: `0 10px 26px ${accentColor}50` }}
            whileTap={{ scale: 0.97 }}
          >
            {cta}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </FadeUp>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export const ResourcesSection: FC = () => {
  const largeProducts = PRODUCTS.filter((p): p is Product => p.size === 'large')
  const smallProducts = PRODUCTS.filter((p): p is Product => p.size === 'small')

  return (
    <section
      className="relative overflow-hidden py-28"
      style={{ background: `linear-gradient(180deg, ${B.cream} 0%, #F5F0FF 100%)` }}
    >
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 60, overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" fill={B.purpleDark} opacity="0.06" />
        </svg>
      </div>

      {/* Floating deco shapes */}
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ y: [0, -14, 0], rotate: s.type === 'star' ? [0, 25, -15, 0] : [0, 0, 0, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          {s.type === 'star' ? (
            <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={s.color} />
            </svg>
          ) : (
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: s.color }} />
          )}
        </motion.div>
      ))}

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: `radial-gradient(circle, ${B.purple} 1.5px, transparent 1.5px)`, backgroundSize: '36px 36px' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <Star className="w-5 h-5" style={{ color: B.yellow }} fill={B.yellow} />
            </motion.div>
            <span
              className="text-xs font-heading font-bold tracking-[0.28em] uppercase px-5 py-2 rounded-full"
              style={{ background: `${B.yellow}22`, color: B.purpleDark, border: `1.5px solid ${B.yellow}88` }}
            >
              Our Resources
            </span>
            <motion.div animate={{ rotate: [0, -20, 20, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
              <Star className="w-5 h-5" style={{ color: B.yellow }} fill={B.yellow} />
            </motion.div>
          </div>

          <h2
            className="font-heading font-bold leading-tight mb-5"
            style={{ color: B.purpleDark, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            Christian Resources{' '}
            <span className="relative inline-block" style={{ color: B.purpleLight }}>
              for Kids
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

          <p className="text-lg font-body font-semibold" style={{ color: B.purpleLight }}>
            Simple, Bible-Based Tools for Growing Faith 🌟
          </p>
        </FadeUp>

        {/* Product grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {largeProducts.map((p, i) => (
            <LargeCard key={p.id} product={p} delay={0.1 + i * 0.1} />
          ))}
          {smallProducts.map((p, i) => (
            <SmallCard key={p.id} product={p} delay={0.25 + i * 0.12} />
          ))}
        </div>

        {/* Trust strip
        <FadeUp delay={0.4}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
            {TRUST_BADGES.map(({ emoji, text }) => (
              <motion.div
                key={text}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl cursor-default"
                style={{ background: B.white, border: `1.5px solid ${B.purpleLight}22`, boxShadow: '0 2px 12px rgba(61,45,91,0.08)' }}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(61,45,91,0.14)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">{emoji}</span>
                <span className="text-sm font-heading font-bold" style={{ color: B.purple }}>{text}</span>
              </motion.div>
            ))}
          </div>
        </FadeUp> */}

      </div>
    </section>
  )
}