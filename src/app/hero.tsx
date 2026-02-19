import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { BookOpen, Sparkles, Star, Heart, Cloud } from 'lucide-react'
import { useEffect, useRef } from 'react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND = {
  purple:      '#3D2D5B',
  purpleDark:  '#2D2341',
  purpleLight: '#6B5B8E',
  yellow:      '#FFD234',
  yellowLight: '#FFE066',
  yellowDark:  '#FFC629',
}

// ─── Image icons ──────────────────────────────────────────────────────────────
const IMAGE_ICONS = [
  {
    src: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771269866/instasave.website_520462481_18065326457129873_4047356168796730753_n_xa4siz.jpg',
    alt: 'Heart',
    className: 'w-16 h-16 md:w-20 md:h-20 rounded-full',
  },
  {
    src: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771270046/instasave.website_635554706_18086610644129873_4472465918574496983_n_mxfn0s.jpg',
    alt: 'Book',
    className: 'w-16 h-16 md:w-22 md:h-22 rounded-2xl',
  },
  {
    src: 'https://res.cloudinary.com/dllrkis3c/image/upload/v1771270084/instasave.website_629569671_18085782284129873_3893295361794057775_n_im6lbg.jpg',
    alt: 'Resource',
    className: 'w-16 h-16 md:w-20 md:h-20 rounded-2xl',
  },
]

// ─── Explicit positions — one image per quadrant, lucide icons fill gaps ──────
// Images: top-left, top-right, bottom-left, bottom-right (one per corner)
const IMAGE_POSITIONS = [
  { left: '10%',  top: '17%'  },  // top-left
  { left: '90%', top: '20%'   },  // top-right
  { left: '78%', top: '68%'  },  // bottom-right
  // 4th image if added:
  // { left: '4%',  top: '70%'  },
]

// Lucide icons fill the remaining edge space across ALL sides
const LUCIDE_POSITIONS = [
  // Left edge
  { left: '2%',  top: '38%'  },
  { left: '3%',  top: '62%'  },
  { left: '5%',  top: '82%'  },
  // Right edge
  { left: '88%', top: '32%'  },
  { left: '90%', top: '55%'  },
  { left: '86%', top: '82%'  },
  // Top strip (between left and right images)
  { left: '30%', top: '3%'   },
  { left: '55%', top: '2%'   },
  // Bottom strip
  { left: '22%', top: '88%'  },
  { left: '48%', top: '90%'  },
  { left: '68%', top: '88%'  },
]

const LUCIDE_DEFS = [
  { Icon: Star,     color: BRAND.yellow,     fill: true,  size: 'w-7 h-7 md:w-9 md:h-9'   },
  { Icon: Heart,    color: BRAND.yellowLight, fill: true,  size: 'w-6 h-6 md:w-7 md:h-7'   },
  { Icon: Cloud,    color: '#ffffff',         fill: false, size: 'w-8 h-8 md:w-11 md:h-11' },
  { Icon: BookOpen, color: BRAND.yellow,      fill: false, size: 'w-6 h-6 md:w-8 md:h-8'   },
  { Icon: Sparkles, color: BRAND.yellowLight, fill: false, size: 'w-6 h-6 md:w-7 md:h-7'   },
]

// ─── Ambient dot canvas ───────────────────────────────────────────────────────
const AmbientCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    const COLORS = [BRAND.yellow, BRAND.yellowLight, '#ffffff', BRAND.purpleLight]
    interface Dot { x: number; y: number; vy: number; size: number; opacity: number; color: string }
    const dots: Dot[] = Array.from({ length: 38 }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      vy:      0.12 + Math.random() * 0.3,
      size:    1.5 + Math.random() * 3,
      opacity: 0.12 + Math.random() * 0.28,
      color:   COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
    let raf: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const d of dots) {
        d.y += d.vy
        if (d.y > canvas.height + 6) { d.y = -6; d.x = Math.random() * canvas.width }
        ctx.globalAlpha = d.opacity
        ctx.fillStyle   = d.color
        ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none z-0" />
}

// ─── Glow orbs ────────────────────────────────────────────────────────────────
const GlowOrbs = () => (
  <>
    <motion.div
      className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle, ${BRAND.purpleLight}40 0%, transparent 70%)` }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle, ${BRAND.yellow}18 0%, transparent 70%)` }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    />
  </>
)

// ─── Floating wrapper ─────────────────────────────────────────────────────────
const Float = ({
  pos, delay, children,
}: {
  pos: { left: string; top: string }
  delay: number
  children: React.ReactNode
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: pos.left, top: pos.top }}
    animate={{
      y:      [0, -14, 8, 0],
      x:      [0,  8, -6, 0],
      rotate: [0,  3, -2, 0],
    }}
    transition={{
      duration: 18 + delay * 1.3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  >
    <motion.div
      animate={{ opacity: [0.65, 0.95, 0.65] }}
      transition={{ duration: 4 + delay * 0.5, repeat: Infinity }}
    >
      {children}
    </motion.div>
  </motion.div>
)

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#3E2D63' }}>
    <AmbientCanvas />

    {/* Glow orbs */}
    <div className="absolute inset-0 pointer-events-none z-[1]"><GlowOrbs /></div>

    {/* ── Icons — spread across ALL edges ── */}
    <div className="absolute inset-0 pointer-events-none z-[2]">

      {/* Image icons: one per corner / quadrant */}
      {IMAGE_POSITIONS.map((pos, i) => (
        <Float key={`img-${i}`} pos={pos} delay={i * 2.2}>
          <div style={{ filter: `drop-shadow(0 6px 18px ${BRAND.purple}cc)` }}>
            <img
              src={IMAGE_ICONS[i % IMAGE_ICONS.length].src}
              alt={IMAGE_ICONS[i % IMAGE_ICONS.length].alt}
              className={`${IMAGE_ICONS[i % IMAGE_ICONS.length].className} object-cover shadow-xl`}
            />
          </div>
        </Float>
      ))}

      {/* Lucide icons: fill every edge gap */}
      {LUCIDE_POSITIONS.map((pos, i) => {
        const { Icon, color, fill, size } = LUCIDE_DEFS[i % LUCIDE_DEFS.length]
        return (
          <Float key={`luc-${i}`} pos={pos} delay={i * 0.85 + 0.6}>
            <Icon
              style={{ color, ...(fill ? { fill: color } : {}) }}
              className={`${size} opacity-55`}
            />
          </Float>
        )
      })}
    </div>

    {/* Dot grid */}
    <div
      className="absolute inset-0 pointer-events-none z-[3] opacity-[0.05]"
      style={{
        backgroundImage: `radial-gradient(circle, ${BRAND.yellowLight} 1px, transparent 1px)`,
        backgroundSize:  '44px 44px',
      }}
    />

    {/* ── Content ── */}
    <div className="relative z-[4] text-center px-6 sm:px-12 lg:px-20 max-w-3xl mx-auto py-24">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 text-sm font-medium tracking-wide font-body"
        style={{
          background:     'rgba(255,255,255,0.07)',
          border:         '1px solid rgba(255,255,255,0.15)',
          color:          BRAND.yellowLight,
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.span animate={{ rotate: [0, 14, -14, 0] }} transition={{ duration: 3, repeat: Infinity }}>✨</motion.span>
        Faith-Building Resources for Kids
        <motion.span animate={{ rotate: [0, -14, 14, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}>✨</motion.span>
      </motion.div>

      {/* H1 */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
      >
       {' '}
        <motion.span
          className="relative inline-block font-heading"
          style={{ color: BRAND.yellow }}
          animate={{
            textShadow: [
              `0 0 10px ${BRAND.yellow}33`,
              `0 0 28px ${BRAND.yellow}bb`,
              `0 0 10px ${BRAND.yellow}33`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Faith Tools
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
            style={{ background: BRAND.yellow }}
            animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.span>{' '}
        for Kids
      </motion.h1>

      {/* H2 */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-2xl font-heading font-medium text-white/90 mb-8"
      >
        Helping Parents Raise Children Rooted in God's Word
      </motion.h2>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, delay: 0.6 }}
        className="text-base md:text-lg text-white/60 mb-7 max-w-2xl mx-auto leading-relaxed font-body"
      >
        Lightbearers provides Christ-centered tools for kids, that includes devotionals, Bible-based affirmation cards,
        and faith-building resources designed especially for young children.
      </motion.p>

      {/* Tagline pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="inline-block mb-10"
      >
        <motion.p
          className="text-sm md:text-base font-semibold tracking-wide px-6 py-2 rounded-full font-body"
          style={{
            background: `${BRAND.yellow}18`,
            color:      BRAND.yellow,
            border:     `1px solid ${BRAND.yellow}44`,
          }}
          animate={{
            boxShadow: [
              `0 0 0px  ${BRAND.yellow}00`,
              `0 0 18px ${BRAND.yellow}55`,
              `0 0 0px  ${BRAND.yellow}00`,
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          🕊️ Build simple daily faith habits at home — starting early.
        </motion.p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.75, delay: 1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        {/* Primary Button */}
        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: [0, -1, 1, 0],
          }}
          whileTap={{ scale: 0.96 }}
          className="relative group"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(45deg, ${BRAND.yellowLight}, ${BRAND.yellow}, ${BRAND.yellowDark})`,
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <Button
            asChild size="lg"
            className="relative font-bold font-body px-8 py-6 rounded-2xl text-lg shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${BRAND.yellow} 0%, ${BRAND.yellowDark} 100%)`,
              color: BRAND.purple,
              boxShadow: `0 8px 32px ${BRAND.yellow}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}
          >
            <motion.a
              href="#shop"
              className="relative z-10 flex items-center gap-2"
              whileHover={{ x: [0, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span>Shop Christian Resources for Kids</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-150%', '150%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
            </motion.a>
          </Button>
        </motion.div>

        {/* Secondary Button */}
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: [0, 1, -1, 0],
          }}
          whileTap={{ scale: 0.97 }}
          className="relative group"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
            style={{
              background: 'rgba(255,255,255,0.2)',
              filter: 'blur(15px)',
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
          <Button
            asChild variant="outline" size="lg"
            className="relative font-bold font-body px-8 py-6 rounded-2xl text-lg transition-all duration-300 overflow-hidden"
            style={{
              border:         `2px solid rgba(255,255,255,0.4)`,
              color:          '#ffffff',
              background:     'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              boxShadow:      '0 4px 24px rgba(255,255,255,0.1)',
            }}
          >
            <motion.a
              href="#free"
              className="relative z-10 flex items-center gap-2"
              whileHover={{ x: [0, -2, 2, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <BookOpen className="w-5 h-5" />
              </motion.div>
              <span>Start With a Free Printable</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-150%', '150%'] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />
            </motion.a>
          </Button>
        </motion.div>
      </motion.div>


    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2"
    >
      <motion.span
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="text-xs tracking-widest uppercase font-body"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        Scroll
      </motion.span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-6 h-10 rounded-full flex justify-center"
        style={{ border: '2px solid rgba(255,255,255,0.2)' }}
      >
        <motion.div
          animate={{ y: [0, 13, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-1.5 h-3 rounded-full mt-2"
          style={{ background: BRAND.yellow }}
        />
      </motion.div>
    </motion.div>
  </section>
)