'use client'

import { useState, useEffect } from 'react'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  layoutShifts: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
}

/**
 * 性能监控组件 - 仅在开发环境显示
 *
 * 功能：
 * - 实时FPS监控
 * - 内存使用情况
 * - 布局偏移检测
 * - Largest Contentful Paint (LCP)
 * - Cumulative Layout Shift (CLS)
 */
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    layoutShifts: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  // FPS计算
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let fps = 0

    const calculateFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime

        setMetrics(prev => ({ ...prev, fps }))
      }

      requestAnimationFrame(calculateFPS)
    }

    requestAnimationFrame(calculateFPS)

    return () => {
      // 清理逻辑
    }
  }, [])

  // 内存使用监控
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576)
        setMetrics(prev => ({ ...prev, memoryUsage: usedMB }))
      }
    }

    const interval = setInterval(updateMemoryUsage, 2000)
    return () => clearInterval(interval)
  }, [])

  // Web Vitals监控
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // 监控LCP
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({
            ...prev,
            largestContentfulPaint: Math.round(entry.startTime)
          }))
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.log('LCP observation not supported')
    }

    // 监控CLS
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
          setMetrics(prev => ({
            ...prev,
            cumulativeLayoutShift: Math.round(clsValue * 1000) / 1000
          }))
        }
      }
    })

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      console.log('CLS observation not supported')
    }

    return () => {
      observer.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  // 键盘快捷键切换显示
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 transition-colors"
        title="Ctrl+Shift+P 打开性能监控"
      >
        性能
      </button>
    )
  }

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400'
    if (fps >= 30) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getMemoryColor = (memory: number) => {
    if (memory <= 50) return 'text-green-400'
    if (memory <= 100) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl w-64">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">性能监控</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">FPS:</span>
          <span className={getFPSColor(metrics.fps)}>{metrics.fps}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">内存:</span>
          <span className={getMemoryColor(metrics.memoryUsage)}>{metrics.memoryUsage}MB</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">LCP:</span>
          <span className="text-blue-400">{metrics.largestContentfulPaint}ms</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">CLS:</span>
          <span className="text-purple-400">{metrics.cumulativeLayoutShift}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="text-xs text-gray-400 space-y-1">
          <p>• FPS &lt; 30: 性能问题</p>
          <p>• 内存 &gt; 100MB: 需优化</p>
          <p>• LCP &lt; 2.5s: 良好</p>
          <p>• CLS &lt; 0.1: 良好</p>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        按 Ctrl+Shift+P 切换
      </div>
    </div>
  )
}