import { Preloader } from './components/preloader'
import { Navigation } from './components/navigation'
import './index.css'
import { Hero } from './app/hero'
import { MusicPlayer } from './components/music-player'
import { WhyThisMatters } from './app/WhyThisMatters'
import { AboutAuthor } from './app/AboutAuthor'
import { FloatingActions } from './components/floating-actions'
import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ResourcesSection } from './app/Resourcessection'
import { WhoThisIsFor } from './app/Whothisisfor'
import { Footer } from './app/Footer'
import { Gallery } from './app/Gallery'
import { FreePrintable } from './app/Freeprintable'
import { SocialMediaSection } from './app/SocialMediaSection'

export const App = () => {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 9500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
    <Navigation />
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-lb-purple z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
    />
    <Preloader />
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={!loading ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Hero />
      <WhyThisMatters />
      <AboutAuthor />
      <MusicPlayer />
      <ResourcesSection/>
      <WhoThisIsFor/>
      <FreePrintable/>
    <SocialMediaSection/>
      <Gallery/>
      <Footer/>
      {!loading && <FloatingActions />}
    </motion.div>
    </>
  )
}
