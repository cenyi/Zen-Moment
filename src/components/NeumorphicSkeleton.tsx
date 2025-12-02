'use client'

interface NeumorphicSkeletonProps {
  type?: 'card' | 'chart' | 'circle' | 'bar'
  height?: string
  width?: string
  theme: 'dark' | 'light'
  className?: string
}

export const NeumorphicSkeleton = ({
  type = 'card',
  height = 'h-64',
  width = 'w-full',
  theme,
  className = ''
}: NeumorphicSkeletonProps) => {
  const getBaseClasses = () => {
    switch (type) {
      case 'card':
        return `rounded-2xl p-6 ${height} ${width} ${
          theme === 'dark'
            ? 'neumorphic-dark border border-gray-600/35'
            : 'neumorphic border border-gray-400/40'
        }`
      case 'chart':
        return `rounded-2xl p-6 ${height} ${width} ${
          theme === 'dark'
            ? 'neumorphic-dark border border-gray-600/35'
            : 'neumorphic border border-gray-400/40'
        }`
      case 'circle':
        return `rounded-full h-48 w-48 mx-auto ${
          theme === 'dark'
            ? 'neumorphic-dark border border-gray-600/35'
            : 'neumorphic border border-gray-400/40'
        }`
      case 'bar':
        return `rounded-full h-4 ${width} ${
          theme === 'dark'
            ? 'neumorphic-dark-inset'
            : 'neumorphic-inset'
        }`
      default:
        return `rounded-2xl p-6 ${height} ${width} ${
          theme === 'dark'
            ? 'neumorphic-dark border border-gray-600/35'
            : 'neumorphic border border-gray-400/40'
        }`
    }
  }

  return (
    <div className={`${getBaseClasses()} ${className}`}>
      <div className="animate-pulse space-y-4">
        {/* Card type specific skeleton content */}
        {type === 'card' || type === 'chart' ? (
          <>
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
              <div className={`h-4 w-32 rounded-lg ${
                theme === 'dark'
                  ? 'neumorphic-dark-inset'
                  : 'neumorphic-inset'
              }`} />
              <div className={`h-6 w-12 rounded-full ${
                theme === 'dark'
                  ? 'neumorphic-dark-inset'
                  : 'neumorphic-inset'
              }`} />
            </div>

            {/* Content skeleton */}
            <div className="space-y-3">
              <div className={`h-20 rounded-lg ${
                theme === 'dark'
                  ? 'neumorphic-dark-inset'
                  : 'neumorphic-inset'
              }`} />
              {type === 'chart' && (
                <div className={`h-32 rounded-lg ${
                  theme === 'dark'
                    ? 'neumorphic-dark-inset'
                    : 'neumorphic-inset'
                }`} />
              )}
            </div>
          </>
        ) : type === 'circle' ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className={`h-24 w-24 rounded-full ${
              theme === 'dark'
                ? 'neumorphic-dark-inset'
                : 'neumorphic-inset'
            }`} />
          </div>
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
    </div>
  )
}