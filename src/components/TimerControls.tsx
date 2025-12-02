import { useState } from 'react'
import { Button } from './ui/Button'

interface TimerControlsProps {
  duration: number
  isRunning: boolean
  isPaused: boolean
  onStart: (duration: number) => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
}

export const TimerControls = ({
  duration,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset
}: TimerControlsProps) => {
  const [selectedDuration, setSelectedDuration] = useState(duration)

  const durations = [1, 3, 5, 10, 15]

  const handleStart = () => {
    if (isRunning) {
      onPause()
    } else if (isPaused) {
      onResume()
    } else {
      onStart(selectedDuration * 60)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      {/* 时长选择 - 移动端优化 */}
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {durations.map((min) => (
          <Button
            key={min}
            variant={selectedDuration === min ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedDuration(min)}
            className="flex-1 min-w-[48px] py-3 text-sm"
          >
            {min}m
          </Button>
        ))}
      </div>

      {/* 主要控制按钮 - 大尺寸便于触摸 */}
      <div className="flex justify-center space-x-4 w-full flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={handleStart}
          className="flex-1 min-w-[120px] h-14 text-lg font-medium"
        >
          {isRunning ? 'PAUSE' : isPaused ? 'RESUME' : 'START'}
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={onReset}
          className="flex-1 min-w-[120px] h-14 text-lg font-medium"
        >
          RESET
        </Button>
      </div>
    </div>
  )
}