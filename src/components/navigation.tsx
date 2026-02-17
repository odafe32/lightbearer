import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, Home, Info, Package, BookOpen, Phone, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Resources', href: '#resources', icon: Package },
    { name: 'Devotional', href: '#devotional', icon: BookOpen },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center space-x-2 relative z-50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dllrkis3c/image/upload/v1771270253/favicon_chorhr.png" 
                alt="Lightbearers Logo" 
                className="h-20 w-20 md:h-28 md:w-28"
              />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: navItems.indexOf(item) * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.05, 
                            boxShadow: '0 8px 25px rgba(74, 59, 107, 0.2)',
                            backgroundColor: 'rgba(74, 59, 107, 0.05)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <NavigationMenuLink
                            href={item.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              'font-body font-semibold text-gray-700 hover:text-lb-purple transition-all duration-200 rounded-lg px-4 py-2 flex items-center gap-2 relative overflow-hidden text-lg'
                            )}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                          </NavigationMenuLink>
                        </motion.div>
                      </motion.div>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-lb-yellow hover:bg-lb-yellow-dark text-lb-purple font-bold font-body px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden text-lg"
              >
                <a href="#contact" className="relative z-10">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Contact
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden relative z-50">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-lb-purple/5 transition-colors duration-200"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <X className="h-6 w-6 text-lb-purple" />
                    ) : (
                      <Menu className="h-6 w-6 text-lb-purple" />
                    )}
                  </motion.div>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[85vw] sm:w-[400px] bg-white text-gray-900 border-l border-gray-200 p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img 
                          src="https://res.cloudinary.com/dllrkis3c/image/upload/v1771270253/favicon_chorhr.png" 
                          alt="Lightbearers Logo" 
                          className="w-24 h-24"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <motion.nav 
                    className="flex-1 p-6 space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {navItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        variants={{
                          hidden: { opacity: 0, x: 50 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-xl text-gray-700 hover:text-lb-purple hover:bg-lb-purple/5 transition-all duration-300 group font-body font-semibold"
                      >
                        <motion.div
                          className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-lb-purple/10 transition-colors"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                        <span className="text-xl font-body font-medium">{item.name}</span>
                        
                        {/* Arrow indicator */}
                        <motion.div
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ x: -5 }}
                          whileHover={{ x: 0 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-lb-yellow" />
                        </motion.div>
                      </motion.a>
                    ))}
                  </motion.nav>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 border-t border-gray-200 bg-gray-50"
                  >
                    <motion.a
                      href="#contact"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full bg-lb-yellow hover:bg-lb-yellow-dark text-lb-purple font-bold font-body px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden text-lg"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Contact</span>
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.a>
                    
                    {/* Tagline
                    <p className="text-center text-gray-600 text-sm mt-4 font-body">
                      ✨ Bringing Faith to Life
                    </p> */}
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}