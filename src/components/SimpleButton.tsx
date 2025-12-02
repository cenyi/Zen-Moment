import { ButtonHTMLAttributes } from 'react'

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  href?: string
  theme?: 'dark' | 'light'
}

export const SimpleButton = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  theme = 'dark',
  href,
  ...props
}: SimpleButtonProps) => {
  // Base classes with accessibility and touch target standards
  const baseClasses = 'font-medium transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  } as const

  const sizeShadowClasses = {
    sm: theme === 'dark' ? 'shadow-neumorphic-dark-small' : 'shadow-neumorphic-small',
    md: theme === 'dark' ? 'shadow-neumorphic-dark' : 'shadow-neumorphic',
    lg: theme === 'dark' ? 'shadow-neumorphic-dark-large' : 'shadow-neumorphic-large'
  } as const

  const variantClasses = {
    primary: {
      ...sizeShadowClasses,
      ...(theme === 'dark' ? {
        'bg-neumorphic-dark': true,
        'text-blue-400': true,
        'hover:text-blue-300': true,
        'hover:shadow-neumorphic-dark-hover': true,
        'hover:-translate-y-1': true,
        'hover:scale-1.02': true,
        'active:shadow-neumorphic-dark-inset': true,
        'active:translate-y-0': true,
        'active:scale-1': true,
        // 增强边界感 - 更强的边框对比度作为阴影的后备方案
        'border': true,
        'border-gray-600/35': true,
        'hover:border-gray-500/45': true
      } : {
        'bg-neumorphic-light': true,
        'text-blue-600': true,
        'hover:text-blue-700': true,
        'hover:shadow-neumorphic-hover': true,
        'hover:-translate-y-1': true,
        'hover:scale-1.02': true,
        'active:shadow-neumorphic-inset': true,
        'active:translate-y-0': true,
        'active:scale-1': true,
        // 增强边界感 - 微妙边框作为阴影的后备方案
        'border': true,
        'border-gray-400/25': true,
        'hover:border-gray-500/35': true
      })
    },
    secondary: {
      ...sizeShadowClasses,
      ...(theme === 'dark' ? {
        'bg-neumorphic-dark': true,
        'text-neumorphic-tips-dark': true,
        'hover:text-white': true,
        'hover:shadow-neumorphic-dark-hover': true,
        'hover:-translate-y-1': true,
        'hover:scale-1.02': true,
        'active:shadow-neumorphic-dark-inset': true,
        'active:translate-y-0': true,
        'active:scale-1': true,
        // 增强边界感 - 更强的边框对比度作为阴影的后备方案
        'border': true,
        'border-gray-600/30': true,
        'hover:border-gray-500/40': true
      } : {
        'bg-neumorphic-light': true,
        'text-neumorphic-tips-light': true,
        'hover:text-blue-700': true,
        'hover:shadow-neumorphic-hover': true,
        'hover:-translate-y-1': true,
        'hover:scale-1.02': true,
        'active:shadow-neumorphic-inset': true,
        'active:translate-y-0': true,
        'active:scale-1': true,
        // 增强边界感 - 微妙边框作为阴影的后备方案
        'border': true,
        'border-gray-400/20': true,
        'hover:border-gray-500/30': true
      })
    }
  } as const

  // Safety checks to prevent undefined access
  const safeVariant = variant && variant in variantClasses ? variant : 'primary'
  const safeSize = size && size in sizeClasses ? size : 'md'

  // Build class names from the variantClasses object
  const variantClassNames = Object.entries(variantClasses[safeVariant])
    .filter(([, isActive]) => isActive)
    .map(([className]) => className)
    .join(' ')

  const widthClass = fullWidth ? 'w-full' : ''

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClassNames} ${sizeClasses[safeSize]} ${widthClass} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={`${baseClasses} ${variantClassNames} ${sizeClasses[safeSize]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}