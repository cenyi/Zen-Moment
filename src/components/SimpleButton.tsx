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
  const baseClasses =
    'font-semibold tracking-[0.01em] transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E9B7F] disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  } as const

  const shadowClasses = {
    sm: theme === 'dark' ? 'shadow-neumorphic-dark-small' : 'shadow-neumorphic-small',
    md: theme === 'dark' ? 'shadow-neumorphic-dark' : 'shadow-neumorphic',
    lg: theme === 'dark' ? 'shadow-neumorphic-dark-large' : 'shadow-neumorphic-large',
  } as const

  const variantClasses = {
    primary:
      theme === 'dark'
        ? 'bg-[#223529] text-[#D8EADF] hover:text-[#EEF5F0] border border-[#547661]/55 hover:border-[#8ABFA2]/55 hover:shadow-neumorphic-dark-hover hover:-translate-y-1 hover:scale-1.02 active:shadow-neumorphic-dark-inset active:translate-y-0 active:scale-1'
        : 'bg-[#FFF3E1] text-[#4A705D] hover:text-[#27372E] border border-[#D8C4A7]/60 hover:border-[#6E9B7F]/55 hover:shadow-neumorphic-hover hover:-translate-y-1 hover:scale-1.02 active:shadow-neumorphic-inset active:translate-y-0 active:scale-1',
    secondary:
      theme === 'dark'
        ? 'bg-[#1A2A21] text-[#E7EFEA] hover:text-[#CFE2D7] border border-[#4A6756]/50 hover:border-[#8ABFA2]/55 hover:shadow-neumorphic-dark-hover hover:-translate-y-1 hover:scale-1.02 active:shadow-neumorphic-dark-inset active:translate-y-0 active:scale-1'
        : 'bg-[#FBEBD6] text-[#2D342C] hover:text-[#4E775F] border border-[#DCC8AD]/55 hover:border-[#6E9B7F]/55 hover:shadow-neumorphic-hover hover:-translate-y-1 hover:scale-1.02 active:shadow-neumorphic-inset active:translate-y-0 active:scale-1',
  } as const

  const widthClass = fullWidth ? 'w-full' : ''
  const buttonClasses = `${baseClasses} ${shadowClasses[size]} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    )
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}
