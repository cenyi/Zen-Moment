'use client'

import { useState, useEffect, useMemo } from 'react'
import { formatTime, formatDate } from '../utils/statsCalculations'

interface MonthlyTrendChartProps {
  data: Array<{
    date: string
    meditationTime: number
    breathingSessions: number
    practiceTime: number
  }>
  theme: 'dark' | 'light'
}

export const MonthlyTrendChart = ({ data, theme }: MonthlyTrendChartProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 计算图表的最大值和比例
  const chartData = useMemo(() => {
    if (!mounted || data.length === 0) return []

    const maxPracticeTime = Math.max(...data.map(d => d.practiceTime), 1)
    const maxMeditationTime = Math.max(...data.map(d => Math.round(d.meditationTime / 60)), 1) // 转换为分钟
    const maxBreathingSessions = Math.max(...data.map(d => d.breathingSessions), 1)

    return data.map(item => ({
      ...item,
      practiceHeight: (item.practiceTime / maxPracticeTime) * 100,
      meditationHeight: (Math.round(item.meditationTime / 60) / maxMeditationTime) * 100, // 转换为分钟
      breathingHeight: (item.breathingSessions / maxBreathingSessions) * 100
    }))
  }, [data, mounted])

  if (!mounted) {
    return (
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'}`}>
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className={`p-6 rounded-2xl text-center ${theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'}`}>
        <div className={`text-lg ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
          No data available for the selected time range
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          ▴ Practice Trend
        </h2>
        <div className="flex items-center gap-3">
          {data.length > 30 && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100/80 text-blue-600'
            }`}>
              ↔ Swipe to explore
            </div>
          )}
          <div className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            {data.length} days
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="space-y-6">
        {/* Practice Time Chart */}
        <div>
          <div className={`text-sm mb-2 flex items-center gap-2 ${
            theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
          }`}>
            <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
            Practice Time (minutes)
          </div>
          <div className="relative">
            {/* 根据数据量和屏幕尺寸智能决定是否需要滚动 */}
            <div className={`h-32 ${
              chartData.length > 30 ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'
            } scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800`}>
              <div className={`flex items-end gap-1 h-full min-w-max ${
                chartData.length > 30 ? 'px-4' : 'px-0'
              }`}>
                {chartData.map((item, index) => {
                  // 智能调整显示策略：数据多时用固定宽度，少时用flex布局
                  const isLargeDataset = chartData.length > 30
                  const barWidth = isLargeDataset ? 'max(2px, min(4px, calc(100% / chartData.length)))' : 'flex-1'
                  const showTooltip = !isLargeDataset || index % Math.max(1, Math.floor(chartData.length / 20)) === 0

                  return (
                    <div
                      key={index}
                      className={`group relative ${!isLargeDataset ? 'flex-1' : ''}`}
                      style={isLargeDataset ? {
                        width: `max(2px, min(4px, calc(100% / ${chartData.length})))`,
                        flexShrink: 0,
                        minWidth: '2px',
                        maxWidth: '6px'
                      } : {}}
                      title={showTooltip ? `${formatDate(item.date)}: ${item.practiceTime} min` : ''}
                    >
                      <div
                        className={`w-full transition-all duration-300 hover:opacity-80 hover:scale-105 ${
                          theme === 'dark' ? 'bg-blue-400/80' : 'bg-blue-700/90'
                        } shadow-sm hover:shadow-md`}
                        style={{
                          height: `${Math.max(item.practiceHeight, item.practiceTime > 0 ? 4 : 0)}%`,
                          minHeight: item.practiceTime > 0 ? '2px' : '0'
                        }}
                      />
                      {item.practiceTime > 0 && showTooltip && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className={`px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg ${
                            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-700/90 text-white border border-gray-600/50'
                          }`}>
                            {item.practiceTime}m
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              {/* Grid lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`h-full flex flex-col justify-between ${
                  theme === 'dark' ? 'border-l border-r border-gray-600/45' : 'border-l border-r border-gray-400/60'
                }`}>
                  {[25, 50, 75, 100].map((percent) => (
                    <div key={percent} className={`relative w-full border-t ${
                      theme === 'dark' ? 'border-gray-600/45' : 'border-gray-400/60'
                    }`} />
                  ))}
                </div>
              </div>
            </div>

            {/* 滚动提示 */}
            {chartData.length > 30 && (
              <div className={`flex justify-center mt-2 text-xs ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                ↔ Swipe to view {chartData.length} days
              </div>
            )}
          </div>
        </div>

        {/* Meditation and Breathing Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Meditation Time */}
          <div>
            <div className={`text-sm mb-2 flex items-center gap-2 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
              Meditation Time
            </div>
            <div className={`relative h-20 ${
              chartData.length > 30 ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'
            } scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800`}>
              <div className={`flex items-end gap-1 h-full min-w-max ${
                chartData.length > 30 ? 'px-4' : 'px-0'
              }`}>
                {chartData.map((item, index) => {
                  const isLargeDataset = chartData.length > 30
                  const showTooltip = !isLargeDataset || index % Math.max(1, Math.floor(chartData.length / 20)) === 0

                  return (
                    <div
                      key={index}
                      className={`group relative ${!isLargeDataset ? 'flex-1' : ''}`}
                      style={isLargeDataset ? {
                        width: `max(2px, min(4px, calc(100% / ${chartData.length})))`,
                        flexShrink: 0,
                        minWidth: '2px',
                        maxWidth: '6px'
                      } : {}}
                      title={showTooltip ? `${formatDate(item.date)}: ${formatTime(item.meditationTime)}` : ''}
                    >
                      <div
                        className={`w-full transition-all duration-300 hover:opacity-80 hover:scale-105 ${
                          theme === 'dark' ? 'bg-green-400/80' : 'bg-green-700/90'
                        } shadow-sm hover:shadow-md`}
                        style={{
                          height: `${Math.max(item.meditationHeight, item.meditationTime > 0 ? 4 : 0)}%`,
                          minHeight: item.meditationTime > 0 ? '2px' : '0'
                        }}
                      />
                      {item.meditationTime > 0 && item.meditationHeight > 20 && showTooltip && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className={`px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg ${
                            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-700/90 text-white border border-gray-600/50'
                          }`}>
                            {formatTime(item.meditationTime)}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Breathing Sessions */}
          <div>
            <div className={`text-sm mb-2 flex items-center gap-2 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
              Breathing Sessions
            </div>
            <div className={`relative h-20 ${
              chartData.length > 30 ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'
            } scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800`}>
              <div className={`flex items-end gap-1 h-full min-w-max ${
                chartData.length > 30 ? 'px-4' : 'px-0'
              }`}>
                {chartData.map((item, index) => {
                  const isLargeDataset = chartData.length > 30
                  const showTooltip = !isLargeDataset || index % Math.max(1, Math.floor(chartData.length / 20)) === 0

                  return (
                    <div
                      key={index}
                      className={`group relative ${!isLargeDataset ? 'flex-1' : ''}`}
                      style={isLargeDataset ? {
                        width: `max(2px, min(4px, calc(100% / ${chartData.length})))`,
                        flexShrink: 0,
                        minWidth: '2px',
                        maxWidth: '6px'
                      } : {}}
                      title={showTooltip ? `${formatDate(item.date)}: ${item.breathingSessions} sessions` : ''}
                    >
                      <div
                        className={`w-full transition-all duration-300 hover:opacity-80 hover:scale-105 ${
                          theme === 'dark' ? 'bg-purple-400/80' : 'bg-purple-700/90'
                        } shadow-sm hover:shadow-md`}
                        style={{
                          height: `${Math.max(item.breathingHeight, item.breathingSessions > 0 ? 4 : 0)}%`,
                          minHeight: item.breathingSessions > 0 ? '2px' : '0'
                        }}
                      />
                      {item.breathingSessions > 0 && showTooltip && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className={`px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg ${
                            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-700/90 text-white border border-gray-600/50'
                          }`}>
                            {item.breathingSessions}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Practice Time</span>
        </div>
        <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Meditation</span>
        </div>
        <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Breathing</span>
        </div>
      </div>
    </div>
  )
}