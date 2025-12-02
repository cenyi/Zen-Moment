/**
 * Centralized type definitions for meditation app data structures
 * Ensures consistency across all components and utilities
 */

export interface DailyData {
  meditationDuration: number
  breathingSessions: number
  breathingModes: Record<string, number> // Track breathing mode usage
  date: string
}

export interface WeeklyData {
  date: string
  meditationDuration: number
  breathingSessions: number
}

export interface HeatmapData {
  date: string
  intensity: number
}

export interface BreathingModeStats {
  [modeId: string]: number
}

// Type guards for data validation
export const isValidDailyData = (data: any): data is DailyData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.meditationDuration === 'number' &&
    typeof data.breathingSessions === 'number' &&
    typeof data.breathingModes === 'object' &&
    typeof data.date === 'string'
  )
}

// Helper to create default DailyData
export const createDefaultDailyData = (date: string): DailyData => ({
  meditationDuration: 0,
  breathingSessions: 0,
  breathingModes: {},
  date
})