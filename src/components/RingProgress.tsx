interface RingProgressProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  theme?: 'dark' | 'light'
}

export const RingProgress = ({
  progress,
  size = 200,
  strokeWidth = 6,
  theme = 'dark'
}: RingProgressProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme === 'dark' ? '#374151' : '#9CA3AF'}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme === 'dark' ? '#60A5FA' : '#3B82F6'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      </div>
  )
}