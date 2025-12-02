// 呼吸练习模式配置
export interface BreathingPattern {
  inhale: number
  hold: number
  exhale: number
  holdAfter?: number
}

export interface BreathingMode {
  id: string
  name: string
  icon: string
  description: string
  pattern: BreathingPattern
  color: string
  benefits: string[]
}

export const BREATHING_MODES: Record<string, BreathingMode> = {
  relax: {
    id: 'relax',
    name: 'Relax',
    icon: '○',
    description: 'Calm your mind and body',
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    color: 'blue',
    benefits: ['Reduces anxiety', 'Improves sleep', 'Quick relaxation']
  },
  focus: {
    id: 'focus',
    name: 'Focus',
    icon: '◎',
    description: 'Sharpen concentration',
    pattern: { inhale: 4, hold: 4, exhale: 4, holdAfter: 4 },
    color: 'purple',
    benefits: ['Enhances focus', 'Mental clarity', 'Stress reduction']
  },
  energy: {
    id: 'energy',
    name: 'Energy',
    icon: '▲',
    description: 'Boost vitality and alertness',
    pattern: { inhale: 6, hold: 0, exhale: 2 },
    color: 'orange',
    benefits: ['Increases energy', 'Better alertness', 'Quick refresh']
  },
  natural: {
    id: 'natural',
    name: 'Natural',
    icon: '◇',
    description: 'Gentle, mindful breathing',
    pattern: { inhale: 4, hold: 2, exhale: 6 },
    color: 'green',
    benefits: ['Mindfulness', 'Gentle relaxation', 'Body awareness']
  },
  beginner: {
    id: 'beginner',
    name: 'Beginner',
    icon: '▢',
    description: 'Easy pattern for beginners',
    pattern: { inhale: 3, hold: 6, exhale: 6 },
    color: 'teal',
    benefits: ['Easy to learn', 'Gentle introduction', 'Building foundation']
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced',
    icon: '◉',
    description: 'Perfectly balanced breathing',
    pattern: { inhale: 5, hold: 5, exhale: 5 },
    color: 'indigo',
    benefits: ['Perfect balance', 'Steady rhythm', 'Harmonious state']
  }
}

export const DEFAULT_BREATHING_MODE = 'relax'