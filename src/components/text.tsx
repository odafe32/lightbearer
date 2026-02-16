import React from 'react'
import { cn } from '@/lib/utils'

interface TextProps {
  as?: React.ElementType
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  className?: string
  children: React.ReactNode
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size,
  weight,
  className,
  children
}) => {
  const Comp = Component as React.ElementType
  return (
    <Comp className={cn(size && `text-${size}`, weight && `font-${weight}`, className)}>
      {children}
    </Comp>
  )
}
