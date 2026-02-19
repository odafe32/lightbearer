import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Download, Sparkles, Star, Heart, BookOpen, Check, Mail, Gift, ChevronRight } from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND = {
  purple:      '#3D2D5B',
  purpleDark:  '#2D2341',
  purpleLight: '#6B5B8E',
  yellow:      '#FFD234',
  yellowLight: '#FFE066',
  yellowDark:  '#FFC629',
}

// ─── What they receive ────────────────────────────────────────────────────────
const PERKS = [
  { Icon: Sparkles, text: 'Scripture affirmation cards'                      },
  { Icon: Heart,    text: 'Christian parenting encouragement'                },
  { Icon: BookOpen, text: 'Updates on new devotionals and faith tools'       },
]

// ─── Floating background icons ────────────────────────────────────────────────
const BG_ICONS = [
  { Icon: Star,     top: '8%',  left: '4%',  size: 28, delay: 0,   color: BRAND.yellow     },
  { Icon: Heart,    top: '80%', left: '6%',  size: 22, delay: 0.8, color: BRAND.yellowLight },
  { Icon: Sparkles, top: '15%', left: '90%', size: 24, delay: 0.4, color: BRAND.yellowLight },
  { Icon: Star,     top: '72%', left: '88%', size: 20, delay: 1.2, color: BRAND.yellow     },
  { Icon: BookOpen, top: '45%', left: '2%',  size: 18, delay: 1.6, color: '#ffffff'         },
  { Icon: Gift,     top: '50%', left: '92%', size: 20, delay: 0.6, color: '#ffffff'         },
]

// ─── FadeUp ───────────────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export const FreePrintable = () => {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused,   setFocused]   = useState(false)

  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="devotional"
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:py-36"
      style={{
        background: `linear-gradient(145deg, ${BRAND.purpleDark} 0%, ${BRAND.purple} 50%, ${BRAND.purpleLight} 100%)`,
      }}
    >

      {/* ── Mesh gradient blobs ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: '-20%', left: '-10%',
            background: `radial-gradient(circle, ${BRAND.yellow}18 0%, transparent 65%)`,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: '-15%', right: '-8%',
            background: `radial-gradient(circle, ${BRAND.yellowDark}14 0%, transparent 65%)`,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* ── Dot grid ─────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, ${BRAND.yellow} 1px, transparent 1px)`,
          backgroundSize:  '36px 36px',
        }}
      />

      {/* ── Floating icons ───────────────────────────────────────────────────── */}
      {BG_ICONS.map(({ Icon, top, left, size, delay, color }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ top, left, width: size, height: size }}
          animate={{ y: [0, -14, 0], rotate: [0, 12, -12, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <Icon className="w-full h-full" style={{ color }} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="relative z-[2] max-w-5xl mx-auto px-6 sm:px-10">


        {/* Two-column: text + form */}
        <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-20 items-center">

          {/* ── Left: copy ───────────────────────────────────────────────────── */}
          <div>
            {/* Section label */}
            <FadeUp delay={0.05}>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase px-4 py-2 rounded-full font-body mb-6"
                style={{
                  background: `${BRAND.yellow}22`,
                  color:      BRAND.yellow,
                  border:     `1.5px solid ${BRAND.yellow}55`,
                }}
              >
                <Download className="w-3 h-3" />
                Free Christian Printable for Kids
              </span>
            </FadeUp>

            {/* Headline */}
            <FadeUp delay={0.12}>
              <h2
                className="font-heading font-bold text-white leading-[1.08] mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
              >
                Download a Free{' '}
                <span className="relative inline-block">
                  <span style={{ color: BRAND.yellow }}>Scripture</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: BRAND.yellow }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>{' '}
                Affirmation Printable
              </h2>
            </FadeUp>

            {/* Subtext */}
            <FadeUp delay={0.2}>
              <p className="text-white/70 font-body text-base leading-relaxed mb-8 max-w-md">
                Start building faith habits today with a free Christian printable designed for
                toddlers and young children. Sign up and get instant access.
              </p>
            </FadeUp>

            {/* Perk list */}
            <div className="space-y-3 mb-10">
              {PERKS.map(({ Icon, text }, i) => (
                <FadeUp key={text} delay={0.28 + i * 0.1}>
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon circle */}
                    <motion.div
                      className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${BRAND.yellow}22`, border: `1.5px solid ${BRAND.yellow}44` }}
                      whileHover={{ scale: 1.15, background: `${BRAND.yellow}44` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: BRAND.yellow }} strokeWidth={2} />
                    </motion.div>
                    <span className="text-white/85 font-body text-sm font-medium">{text}</span>
                  </motion.div>
                </FadeUp>
              ))}
            </div>

            {/* Scripture pill */}
            <FadeUp delay={0.6}>
              <div
                className="inline-flex items-start gap-3 px-5 py-4 rounded-2xl"
                style={{
                  background:     'rgba(255,255,255,0.07)',
                  border:         '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Star className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND.yellow }} fill={BRAND.yellow} />
                <div>
                  <p className="text-white/90 font-heading font-semibold text-sm italic leading-snug">
                    "Train up a child in the way he should go…"
                  </p>
                  <p className="text-xs font-body mt-1 font-bold tracking-widest uppercase" style={{ color: BRAND.yellow }}>
                    Proverbs 22:6
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── Right: form card ──────────────────────────────────────────────── */}
          <FadeUp delay={0.3} className="mt-14 lg:mt-0">
            <motion.div
              className="relative rounded-3xl overflow-hidden p-8 md:p-10"
              style={{
                background:     'rgba(255,255,255,0.07)',
                border:         '1.5px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Card glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15)` }}
              />

              {!submitted ? (
                <>
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: BRAND.yellow }}
                    >
                      <Download className="w-6 h-6" style={{ color: BRAND.purple }} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-white font-heading font-bold text-lg leading-tight">
                        Get Your Free Printable
                      </p>
                      <p className="text-white/55 font-body text-xs mt-0.5">Instant download after sign-up</p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-white/70 font-body text-xs font-semibold tracking-wider uppercase mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah"
                        className="w-full px-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all duration-200"
                        style={{
                          background:  'rgba(255,255,255,0.08)',
                          border:      `1.5px solid ${focused ? BRAND.yellow + '88' : 'rgba(255,255,255,0.15)'}`,
                          color:       'white',
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white/70 font-body text-xs font-semibold tracking-wider uppercase mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(255,255,255,0.4)' }} />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          onFocus={() => setFocused(true)}
                          onBlur={() => setFocused(false)}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl font-body text-sm outline-none transition-all duration-200"
                          style={{
                            background:  'rgba(255,255,255,0.08)',
                            border:      `1.5px solid ${focused ? BRAND.yellow + '88' : 'rgba(255,255,255,0.15)'}`,
                            color:       'white',
                          }}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-bold text-base relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.yellow} 0%, ${BRAND.yellowDark} 100%)`,
                        color:      BRAND.purpleDark,
                        boxShadow:  `0 8px 32px ${BRAND.yellow}44`,
                      }}
                      whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${BRAND.yellow}66` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        animate={{ x: ['-150%', '150%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                      />
                      <Download className="w-5 h-5 relative z-10" strokeWidth={2.5} />
                      <span className="relative z-10">Download Free Christian Printable</span>
                      <ChevronRight className="w-4 h-4 relative z-10" strokeWidth={2.5} />
                    </motion.button>

                    <p className="text-center text-white/40 font-body text-xs">
                      No spam. Unsubscribe at any time.
                    </p>
                  </form>
                </>
              ) : (
                /* ── Success state ── */
                <motion.div
                  className="flex flex-col items-center text-center py-6"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                    style={{ background: `${BRAND.yellow}22`, border: `3px solid ${BRAND.yellow}` }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Check className="w-9 h-9" style={{ color: BRAND.yellow }} strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-white font-heading font-bold text-2xl mb-2">You're in! 🎉</h3>
                  <p className="text-white/65 font-body text-sm leading-relaxed max-w-xs">
                    Check your inbox — your free Scripture affirmation printable is on its way!
                  </p>
                  <div
                    className="mt-6 px-5 py-3 rounded-xl font-body text-sm font-semibold"
                    style={{ background: `${BRAND.yellow}22`, color: BRAND.yellowLight, border: `1px solid ${BRAND.yellow}44` }}
                  >
                    While you wait, explore our resources ✨
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Floating social proof */}
            <motion.div
              className="flex items-center justify-center gap-3 mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {['#c084fc', '#f9a8d4', '#86efac', '#fde68a'].map((bg, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold"
                    style={{ background: bg, color: BRAND.purpleDark, zIndex: 4 - i }}
                  >
                    {['S', 'M', 'J', 'A'][i]}
                  </div>
                ))}
              </div>
              <p className="text-white/55 font-body text-xs">
                <strong className="text-white/80">Get Yours</strong> Now
              </p>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}