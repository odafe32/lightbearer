import { motion } from 'framer-motion'
import type { FC } from 'react'
import {
  Youtube,
  Instagram,
  Sparkles,
} from 'lucide-react'

// ─── Custom TikTok Icon ──────────────────────────────────────────────────────
const TikTokIcon: FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
)

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

// ─── Social media links ────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://www.youtube.com/@LightbearersKids',
    color: '#FF0000',
    handle: '@lightbearers.kids',
  },
  {
    icon: TikTokIcon,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@lightbearerskids?is_from_webapp=1&sender_device=pc',
    color: '#000000',
    handle: '@lightbearers.kids',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/lightbearers.kids?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    color: '#E4405F',
    handle: '@lightbearers.kids',
  },

]

// ─── Social media section ─────────────────────────────────────────────────────
export const SocialMediaSection: FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, ${B.purple} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `${B.yellow}08`, filter: 'blur(60px)' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `${B.purpleLight}10`, filter: 'blur(60px)' }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5" style={{ color: B.yellow }} fill={B.yellow} />
            </motion.div>
            <span
              className="text-sm font-heading font-black tracking-[0.28em] uppercase px-5 py-2 rounded-full"
              style={{
                background: `${B.yellow}22`,
                color:       B.purpleDark,
                border:      `1.5px solid ${B.yellow}88`,
              }}
            >
              Follow Our Journey
            </span>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <Sparkles className="w-5 h-5" style={{ color: B.yellow }} fill={B.yellow} />
            </motion.div>
          </div>

          <h2
            className="font-heading font-bold leading-tight mb-4"
            style={{ color: B.purpleDark, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Join Our Faith Family{' '}
            <span className="relative inline-block" style={{ color: B.purpleLight }}>
              Online
              <motion.span
                className="absolute -bottom-1 left-0 right-0 rounded-full"
                style={{ height: 4, background: `linear-gradient(90deg, ${B.yellow}, ${B.yellowDark})` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.4 }}
              />
            </span>
          </h2>

          <p className="text-lg font-body font-medium max-w-2xl mx-auto" style={{ color: '#5a4e7a' }}>
            Connect with us across all platforms for daily inspiration, Bible stories, and family faith activities
          </p>
        </motion.div>

        {/* Social media grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {SOCIAL_LINKS.map((social, i) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-[1.5rem] p-6 overflow-hidden cursor-pointer"
                style={{
                  background: B.white,
                  border:     `2px solid ${B.purple}12`,
                  boxShadow:  `0 8px 32px ${B.purple}08`,
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 24px 56px ${B.purple}18`,
                  borderColor: `${B.purple}24`,
                }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              >
                {/* Background color overlay on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `${social.color}05` }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${social.color}15`, border: `1.5px solid ${social.color}30` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-7 h-7" style={{ color: social.color }} />
                  </motion.div>

                  {/* Label */}
                  <h3
                    className="font-heading font-bold text-lg mb-2"
                    style={{ color: B.purpleDark }}
                  >
                    {social.label}
                  </h3>

                  {/* Handle */}
                  <p className="text-sm font-body font-medium" style={{ color: '#5a4e7a' }}>
                    {social.handle}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-base font-body font-semibold" style={{ color: B.purpleLight }}>
            Follow us for daily Bible stories, faith activities, and family devotionals 🌟
          </p>
        </motion.div>
      </div>
    </section>
  )
}
