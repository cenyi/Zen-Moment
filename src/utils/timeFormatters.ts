/**
 * 时间格式化工具函数
 */

/**
 * 格式化时间为可读字符串 (统计用)
 * 格式: "1h 30m", "5m 30s", "30s"
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

/**
 * 格式化时间为计时器显示 (MM:SS格式)
 * 格式: "05:30", "00:30"
 */
export const formatTimerTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * 格式化时间为紧凑显示 (简化版)
 * 格式: "5m 30s", "30s"
 */
export const formatCompactTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (minutes > 0) {
    return `${minutes}m ${secs}s`
  }
  return `${secs}s`
}