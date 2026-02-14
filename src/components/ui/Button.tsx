import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  href?: string
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  href,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-[#5B836B] text-[#FFF6EA] hover:bg-[#4A705D] focus:ring-[#6E9B7F]',
    secondary: 'bg-[#4B5F54] text-[#EBECE8] hover:bg-[#3E5147] focus:ring-[#6E9B7F]',
    accent: 'bg-[#C89C67] text-[#2D2A24] hover:bg-[#A67E4F] focus:ring-[#C89C67]'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const widthClass = fullWidth ? 'w-full' : ''

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
