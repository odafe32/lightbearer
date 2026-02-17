import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Heart, BookOpen, Star, Sparkles, GraduationCap, Users, ArrowRight } from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND = {
  purple:      '#3D2D5B',
  purpleDark:  '#2D2341',
  purpleLight: '#6B5B8E',
  yellow:      '#FFD234',
  yellowLight: '#FFE066',
  yellowDark:  '#FFC629',
}

const HANNAH_IMAGE = 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771270251/author_cxsug3.jpg'

const HIGHLIGHTS = [
  { Icon: GraduationCap, label: 'Christian Educator',  color: BRAND.yellow     },
  { Icon: Heart,         label: 'Mentor & Mother',      color: BRAND.yellowDark },
  { Icon: Users,         label: 'Spiritual Formation',  color: BRAND.purple     },
  { Icon: Sparkles,      label: 'Faith & Purpose',      color: BRAND.purpleLight},
]

// ─── FadeUp ───────────────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── SlideIn ──────────────────────────────────────────────────────────────────
const SlideIn = ({ children, from = 'left', delay = 0, className = '' }: {
  children: React.ReactNode; from?: 'left' | 'right'; delay?: number; className?: string
}) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: from === 'left' ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export const AboutAuthor = () => {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)
  const imgInView  = useInView(imgRef, { once: true, margin: '-80px' })

  // Subtle parallax on the image
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">

      {/* ── Full-bleed dark left panel (desktop) ──────────────────────────── */}
      <div
        className="absolute inset-y-0 left-0 w-[48%] hidden lg:block pointer-events-none"
        style={{ background: `linear-gradient(160deg, ${BRAND.purpleDark} 0%, ${BRAND.purple} 100%)` }}
      />

      {/* Noise texture over dark panel */}
      <div
        className="absolute inset-y-0 left-0 w-[48%] hidden lg:block pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Dot pattern on dark panel */}
      <div
        className="absolute inset-y-0 left-0 w-[48%] hidden lg:block pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, ${BRAND.yellow} 1px, transparent 1px)`,
          backgroundSize:  '28px 28px',
        }}
      />



      {/* ── Decorative large text behind content ──────────────────────────── */}
      <div
        className="absolute top-8 left-4 hidden lg:block select-none pointer-events-none font-heading font-bold leading-none"
        style={{
          fontSize: 220,
          color: 'rgba(255,255,255,0.025)',
          letterSpacing: '-0.05em',
        }}
      >
        HANNAH
      </div>

      {/* ── Animated stars on dark side ─────────────────────────────────────── */}
      {[
        { top: '10%', left: '5%',  size: 20, delay: 0   },
        { top: '78%', left: '3%',  size: 14, delay: 1.0 },
        { top: '45%', left: '32%', size: 10, delay: 1.8 },
        { top: '20%', left: '28%', size: 8,  delay: 0.5 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none hidden lg:block"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ rotate: [0, 25, -25, 0], scale: [1, 1.4, 1], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          <Star className="w-full h-full" style={{ color: BRAND.yellow }} fill={BRAND.yellow} />
        </motion.div>
      ))}

      {/* ── Main grid ───────────────────────────────────────────────────────── */}
      <div className="relative z-[2] max-w-7xl mx-auto lg:grid lg:grid-cols-[0.9fr_1.1fr] min-h-[640px]">

        {/* ── LEFT: Photo panel ───────────────────────────────────────────── */}
        <div ref={imgRef} className="relative flex items-center justify-center py-20 lg:py-28 px-6 lg:px-0 lg:pl-14">

          {/* Glow halo */}
          <motion.div
            className="absolute rounded-[2.5rem] pointer-events-none"
            style={{
              inset: -20,
              background: `radial-gradient(ellipse at center, ${BRAND.yellow}30 0%, transparent 70%)`,
              filter: 'blur(24px)',
            }}
            initial={{ opacity: 0 }}
            animate={imgInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          />

          {/* ── STEP 1: Entrance wrapper — fades + scales in ONCE ─────────── */}
          <motion.div
            className="relative"
            style={{ width: 480, maxWidth: '100%' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={imgInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── STEP 2: Bounce wrapper — lives INSIDE entrance, runs forever ── */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            >
              {/* Yellow corner accent — has its own entrance, then bounces in sync */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl pointer-events-none z-10"
                style={{ background: BRAND.yellow }}
                initial={{ opacity: 0, scale: 0, rotate: -15 }}
                animate={imgInView ? { opacity: 1, scale: 1, rotate: -8 } : {}}
                transition={{ duration: 0.65, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <BookOpen
                  className="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ color: BRAND.purple }}
                  strokeWidth={2.5}
                />
              </motion.div>

              {/* Photo itself with scroll parallax */}
              <motion.div
                className="rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(45,35,65,0.5)]"
                style={{ y: imgY, border: `3px solid rgba(255,255,255,0.12)` }}
              >
                <img
                  src={HANNAH_IMAGE}
                  alt="Hannah Amusan — Founder of Light Bearers"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '3/4', display: 'block' }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${BRAND.purpleDark}dd 0%, transparent 50%)` }}
                />
              </motion.div>

              {/* Name plate over photo */}
              <motion.div
                className="absolute bottom-6 left-5 right-5"
                initial={{ opacity: 0, y: 14 }}
                animate={imgInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.6 }}
              >
                <p className="text-white font-heading font-bold text-2xl leading-tight drop-shadow-lg">
                  Hannah Amusan
                </p>
                <p className="font-body text-sm font-semibold tracking-wide mt-0.5" style={{ color: BRAND.yellow }}>
                  Founder, Light Bearers
                </p>
              </motion.div>

              {/* Floating pill — top right */}
              <motion.div
                className="absolute -top-3 -right-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-2xl"
                style={{ background: BRAND.yellow, color: BRAND.purpleDark }}
                initial={{ opacity: 0, scale: 0.5, rotate: -12, x: 10 }}
                animate={imgInView ? { opacity: 1, scale: 1, rotate: 5, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <GraduationCap className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                <span className="font-body font-bold text-xs whitespace-nowrap">Christian Educator</span>
              </motion.div>

              {/* Floating pill — bottom left */}
              <motion.div
                className="absolute -bottom-5 -left-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-2xl"
                style={{ background: 'white', color: BRAND.purple, border: `2px solid ${BRAND.yellow}55` }}
                initial={{ opacity: 0, scale: 0.5, rotate: 10, x: -10 }}
                animate={imgInView ? { opacity: 1, scale: 1, rotate: -4, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Heart className="w-4 h-4 flex-shrink-0" style={{ color: BRAND.yellow }} fill={BRAND.yellow} strokeWidth={0} />
                <span className="font-body font-bold text-xs whitespace-nowrap">Mentor & Mother</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT: Text panel ────────────────────────────────────────────── */}
        <div className="flex items-center py-20 lg:py-28 px-6 sm:px-10 lg:pl-20 lg:pr-16 xl:pr-24">
          <div className="w-full">

            {/* Label pill */}
            <FadeUp delay={0.05}>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full font-body mb-7"
                style={{
                  background: `${BRAND.yellow}20`,
                  color:       BRAND.purpleDark,
                  border:     `1.5px solid ${BRAND.yellow}`,
                }}
              >
                <Star className="w-3 h-3" fill={BRAND.yellow} style={{ color: BRAND.yellow }} />
                Meet the Founder
              </span>
            </FadeUp>

            {/* Headline */}
            <SlideIn from="right" delay={0.1}>
              <h2
                className="font-heading font-bold leading-[1.05] mb-6"
                style={{ color: BRAND.purpleDark, fontSize: 'clamp(2.4rem, 4vw, 3.4rem)' }}
              >
                A Heart for{' '}
                <span className="relative inline-block" style={{ color: BRAND.purple }}>
                  the Next
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full"
                    style={{ background: BRAND.yellow }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
                <br />Generation
              </h2>
            </SlideIn>

            {/* Bio */}
            <FadeUp delay={0.2}>
              <p className="text-[15px] text-gray-600 leading-[1.9] font-body mb-4">
                <strong style={{ color: BRAND.purple }}>Hannah Amusan</strong> is a Christian educator, mentor, and mother with a passion for raising children who are rooted in faith and purpose.
              </p>
            </FadeUp>

            <FadeUp delay={0.28}>
              <p className="text-[15px] text-gray-600 leading-[1.9] font-body mb-4">
                With years of teaching experience and a heart for spiritual formation, she founded{' '}
                <strong style={{ color: BRAND.purple }}>Light Bearers</strong> to equip children with godly values, confidence, and practical life foundations — helping them shine as light in their generation.
              </p>
            </FadeUp>

            <FadeUp delay={0.34}>
              <p className="text-[15px] text-gray-600 leading-[1.9] font-body mb-8">
                Her resources are built on the belief that faith formation starts at home and that every parent has the tools to raise a generation that knows who they are in Christ.
              </p>
            </FadeUp>

            {/* Pills */}
            <FadeUp delay={0.42}>
              <div className="flex flex-wrap gap-2.5 mb-10">
                {HIGHLIGHTS.map(({ Icon, label, color }) => (
                  <motion.div
                    key={label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-semibold cursor-default"
                    style={{
                      background: `${color}15`,
                      color:       color === BRAND.yellow || color === BRAND.yellowDark ? BRAND.purpleDark : color,
                      border:     `1.5px solid ${color}44`,
                    }}
                    whileHover={{ scale: 1.07, y: -3, boxShadow: `0 8px 24px ${color}28` }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} style={{ color }} />
                    {label}
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* Pull quote */}
            <FadeUp delay={0.5}>
              <div
                className="relative rounded-2xl p-6 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.purpleDark}08, ${BRAND.purple}12)`,
                  border:     `1.5px solid ${BRAND.purple}18`,
                }}
              >
                <div
                  className="absolute -top-3 -left-1 font-heading font-bold leading-none select-none pointer-events-none"
                  style={{ fontSize: 96, color: `${BRAND.yellow}22` }}
                >
                  "
                </div>
                <p
                  className="relative z-10 text-base font-heading font-semibold italic leading-relaxed"
                  style={{ color: BRAND.purple }}
                >
                  Every child is a light-bearer — my mission is to help parents fan that flame.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-px flex-1" style={{ background: `${BRAND.yellow}55` }} />
                  <p className="text-xs font-body font-bold tracking-widest uppercase" style={{ color: BRAND.purpleLight }}>
                    Hannah Amusan
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* CTA link */}
            <FadeUp delay={0.58}>
              <motion.a
                href="#about"
                className="inline-flex items-center gap-2 mt-8 font-body font-bold text-sm tracking-wide underline"
                style={{ color: BRAND.purple }}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.22 }}
              >
                Read more about Hannah
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}