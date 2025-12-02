import Image from 'next/image'

interface ThemeLogoProps {
  theme?: 'dark' | 'light'
  className?: string
  alt?: string
  size?: 'small' | 'medium' | 'large'
}

export const ThemeLogo = ({
  theme = 'dark',
  className = '',
  alt = 'Zen Moment',
  size = 'medium'
}: ThemeLogoProps) => {
  // 根据主题选择对应的logo文件（WebP格式）
  const getLogoConfig = () => {
    const themeSuffix = theme === 'dark' ? 'white' : 'black'

    switch (size) {
      case 'small':
        return {
          displaySize: 32,
          imageSrc: `/favicon-optimized-32x32-${themeSuffix}.webp`,
          fallbackSrc: `/favicon-32x32.webp`,
        }
      case 'large':
        return {
          displaySize: 64,
          imageSrc: `/logo-${themeSuffix}.webp`,
          fallbackSrc: `/logo.webp`,
        }
      default: // medium
        return {
          displaySize: 48,
          imageSrc: `/favicon-48x48-${themeSuffix}.webp`,
          fallbackSrc: `/favicon-32x32.webp`,
        }
    }
  }

  const config = getLogoConfig()

  // 生成响应式sizes属性，根据实际显示大小调整
  const getResponsiveSizes = () => {
    switch (size) {
      case 'small':
        return "(max-width: 640px) 24px, (max-width: 768px) 28px, (max-width: 1024px) 32px, 32px"
      case 'large':
        return "(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 64px"
      default: // medium
        return "(max-width: 640px) 36px, (max-width: 768px) 42px, (max-width: 1024px) 48px, 48px"
    }
  }

  // 简化的WebP错误处理
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement

    // 如果主要WebP失败，尝试备用WebP
    if (target.src === config.imageSrc) {
      target.src = config.fallbackSrc
    }
  }

  // 生成CSS样式，确保正确的尺寸显示
  const getImageStyle = () => ({
    width: `${config.displaySize}px`,
    height: `${config.displaySize}px`,
    objectFit: 'contain' as const,
  })

  return (
    <Image
      src={config.imageSrc}
      alt={alt}
      className={className}
      style={getImageStyle()}
      width={config.displaySize}
      height={config.displaySize}
      sizes={getResponsiveSizes()}
      quality={95}
      priority={false}
      onError={handleImageError}
    />
  )
}