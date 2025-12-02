import { useRef, useCallback, useEffect } from 'react'

interface UsePerformanceOptimizedScrollOptions {
  onScroll?: (scrollInfo: {
    scrolled: number
    progress: number
    direction: 'up' | 'down'
    velocity: number
  }) => void
  threshold?: number // 最小变化阈值，默认0.1%
  debounceMs?: number // 防抖时间，默认16ms (60fps)
}

/**
 * 性能优化的滚动Hook
 *
 * 特性：
 * - 使用 requestAnimationFrame 防抖
 * - 缓存 scrollHeight 避免强制重排
 * - 滚动方向和速度检测
 * - 最小变化阈值减少不必要更新
 * - 主题切换和窗口大小变化时自动重置缓存
 */
export function usePerformanceOptimizedScroll({
  onScroll,
  threshold = 0.1,
  debounceMs = 16
}: UsePerformanceOptimizedScrollOptions = {}) {
  const rafRef = useRef<number>()
  const lastKnownScrollHeightRef = useRef<number>(0)
  const lastScrollYRef = useRef<number>(0)
  const lastProgressRef = useRef<number>(0)
  const lastTimestampRef = useRef<number>(0)
  const scrollDirectionRef = useRef<'up' | 'down'>('down')

  const optimizedScrollHandler = useCallback(() => {
    // 取消之前的动画帧请求
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      const currentTimestamp = performance.now()

      // 计算滚动方向
      if (currentScrollY > lastScrollYRef.current) {
        scrollDirectionRef.current = 'down'
      } else if (currentScrollY < lastScrollYRef.current) {
        scrollDirectionRef.current = 'up'
      }

      // 计算滚动速度 (px/ms)
      const timeDiff = currentTimestamp - lastTimestampRef.current
      const scrollDiff = Math.abs(currentScrollY - lastScrollYRef.current)
      const velocity = timeDiff > 0 ? scrollDiff / timeDiff : 0

      // 缓存 scrollHeight，避免频繁查询
      if (lastKnownScrollHeightRef.current === 0) {
        lastKnownScrollHeightRef.current = document.documentElement.scrollHeight - window.innerHeight
      }

      const documentHeight = lastKnownScrollHeightRef.current

      // 如果文档高度无效，强制重新计算
      if (documentHeight <= 0) {
        lastKnownScrollHeightRef.current = document.documentElement.scrollHeight - window.innerHeight
        lastScrollYRef.current = currentScrollY
        lastTimestampRef.current = currentTimestamp
        return
      }

      // 计算进度
      const progress = (currentScrollY / documentHeight) * 100
      const clampedProgress = Math.min(100, Math.max(0, progress))

      // 只有变化超过阈值时才触发回调
      if (Math.abs(clampedProgress - lastProgressRef.current) > threshold) {
        lastProgressRef.current = clampedProgress

        if (onScroll) {
          onScroll({
            scrolled: currentScrollY,
            progress: clampedProgress,
            direction: scrollDirectionRef.current,
            velocity
          })
        }
      }

      // 更新缓存值
      lastScrollYRef.current = currentScrollY
      lastTimestampRef.current = currentTimestamp
    })
  }, [onScroll, threshold])

  // 重置缓存的函数
  const resetCache = useCallback(() => {
    lastKnownScrollHeightRef.current = 0
    lastScrollYRef.current = 0
    lastProgressRef.current = 0
    lastTimestampRef.current = 0
  }, [])

  // 处理窗口大小变化
  const handleResize = useCallback(() => {
    resetCache()
  }, [resetCache])

  // 处理页面可见性变化
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      resetCache()
    }
  }, [resetCache])

  useEffect(() => {
    // 使用被动监听器提高性能
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [optimizedScrollHandler, handleResize, handleVisibilityChange])

  return {
    resetCache,
    getCurrentProgress: () => lastProgressRef.current,
    getScrollDirection: () => scrollDirectionRef.current,
    getVelocity: () => {
      const currentTime = performance.now()
      const timeDiff = currentTime - lastTimestampRef.current
      const scrollDiff = Math.abs(window.scrollY - lastScrollYRef.current)
      return timeDiff > 0 ? scrollDiff / timeDiff : 0
    }
  }
}