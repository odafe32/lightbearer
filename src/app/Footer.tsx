import { motion } from 'framer-motion'
import type { FC } from 'react'
import {
  Heart, Mail, Instagram,  Star, 
  BookOpen,
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


const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/lightbearers.kids?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: '#E4405F' },
  { icon: Mail, label: 'Email', href: 'mailto:lightbearerskids@gmail.com', color: B.yellow },
]

// ─── Footer Component ─────────────────────────────────────────────────────────
export const Footer: FC = () => {
  return (
    <footer id="contact" className="relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${B.purpleDark} 0%, ${B.purple} 100%)` }}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, ${B.yellow} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient blobs */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `${B.yellow}08`, filter: 'blur(80px)' }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `${B.purpleLight}12`, filter: 'blur(80px)' }}
      />

      {/* Floating stars */}
      {([
        { top: '10%', left: '5%', size: 18, delay: 0, dur: 4.5 },
        { top: '15%', left: '92%', size: 16, delay: 1.2, dur: 5.0 },
        { top: '85%', left: '8%', size: 14, delay: 0.8, dur: 4.2 },
        { top: '80%', left: '88%', size: 20, delay: 1.6, dur: 4.8 },
      ] as Array<{ top: string; left: string; size: number; delay: number; dur: number }>).map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ top: s.top, left: s.left }}
          animate={{ y: [0, -10, 0], rotate: [0, 20, -20, 0], opacity: [0.2, 0.5, 0.2] }}
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
        {/* Newsletter CTA */}
        {/* <motion.div
          className="py-16 border-b"
          style={{ borderColor: `${B.white}15` }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ background: `${B.yellow}22`, border: `1.5px solid ${B.yellow}44` }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8" style={{ color: B.yellow }} />
            </motion.div>

            <h3
              className="font-heading font-black leading-tight mb-4"
              style={{ color: B.white, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Join Our Faith Family
            </h3>

            <p className="text-xl font-body font-bold mb-8" style={{ color: `${B.white}B3` }}>
              Get weekly devotionals, activities, and encouragement delivered to your inbox 
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl font-body font-medium text-base outline-none"
                style={{
                  background: `${B.white}15`,
                  border: `1.5px solid ${B.white}25`,
                  color: B.white,
                  backdropFilter: 'blur(10px)',
                }}
              />
              <motion.button
                className="px-8 py-4 rounded-2xl font-heading font-black text-lg flex items-center justify-center gap-2 whitespace-nowrap"
                style={{ background: B.yellow, color: B.purpleDark, boxShadow: `0 8px 28px ${B.yellow}40` }}
                whileHover={{ scale: 1.05, boxShadow: `0 14px 36px ${B.yellow}60` }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div> */}

        {/* Main footer content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${B.yellow}22`, border: `1.5px solid ${B.yellow}44` }}
              >
                <BookOpen className="w-6 h-6" style={{ color: B.yellow }} />
              </div>
              <span className="font-heading font-black text-2xl" style={{ color: B.white }}>
                Lightbearers
              </span>
            </div>

            <p className="text-base font-body font-medium mb-6 leading-relaxed" style={{ color: `${B.white}B3` }}>
              Helping families raise little lightbearers through simple, joyful Bible study tools designed for Kids and young children.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.label === 'Instagram' ? '_blank' : undefined}
                    rel={social.label === 'Instagram' ? 'noopener noreferrer' : undefined}
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${B.white}12`,
                      border: `1.5px solid ${B.white}20`,
                    }}
                    whileHover={{
                      background: `${B.yellow}30`,
                      borderColor: B.yellow,
                      y: -4,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    <Icon className="w-5 h-5" style={{ color: B.white }} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Resources */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 className="font-heading font-black text-lg mb-5" style={{ color: B.yellow }}>
              Resources
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="font-body font-medium text-base hover:text-white transition-colors inline-block"
                    style={{ color: `${B.white}B3` }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div> */}

          {/* Company
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h4 className="font-heading font-black text-lg mb-5" style={{ color: B.yellow }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="font-body font-medium text-base hover:text-white transition-colors inline-block"
                    style={{ color: `${B.white}B3` }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div> */}

     
        </div>

        {/* Bottom bar */}
        <motion.div
          className="py-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: `${B.white}15` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="font-body font-medium text-base" style={{ color: `${B.white}80` }}>
            © {new Date().getFullYear()} Lightbearers. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="font-body font-medium text-base" style={{ color: `${B.white}80` }}>
              Made with
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5" style={{ color: B.yellow }} fill={B.yellow} />
            </motion.div>
            <span className="font-body font-medium text-base" style={{ color: `${B.white}80` }}>
              for Kids
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
