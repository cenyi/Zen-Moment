'use client'

import React, { useEffect, useState } from 'react'
import { useTimerStore } from '../store/timerStore'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void
  removeToast: (id: string) => void
}

// 创建 Context
export const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const { theme } = useTimerStore()

  const showToast = (type: ToastType, message: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { id, type, message, duration }

    setToasts(prev => [...prev, newToast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} theme={theme} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  removeToast: (id: string) => void
  theme: 'dark' | 'light'
}

function ToastContainer({ toasts, removeToast, theme }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}
      role="alert"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
          theme={theme}
        />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
  theme: 'dark' | 'light'
}

function ToastItem({ toast, onRemove, theme }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onRemove(toast.id)
    }, 300) // 等待动画完成
  }

  const getToastStyles = (type: ToastType) => {
    const baseStyles = 'pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out'

    const typeStyles = {
      success: {
        light: 'bg-green-50 border-green-200 text-green-800',
        dark: 'bg-green-900/30 border-green-700/50 text-green-300',
        icon: (
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      },
      error: {
        light: 'bg-red-50 border-red-200 text-red-800',
        dark: 'bg-red-900/30 border-red-700/50 text-red-300',
        icon: (
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8 10.414l1.293 1.293a1 1 0 101.414 1.414l-1.293-1.293a1 1 0 00-1.414 0l-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293a1 1 0 001.414 0l1.293 1.293zM10 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        )
      },
      warning: {
        light: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        dark: 'bg-yellow-900/30 border-yellow-700/50 text-yellow-300',
        icon: (
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.585 5.585c.77.77 2.722.77 3.486 0 5.585-5.585.77-.77 2.722-.77 3.486 0l-5.585-5.585c-.77-.77-2.722-.77-3.486 0zM11.07 18.257a1 1 0 11-2 0 1 1 0 012 0zm-1.07-5.143a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
          </svg>
        )
      },
      info: {
        light: 'bg-blue-50 border-blue-200 text-blue-800',
        dark: 'bg-blue-900/30 border-blue-700/50 text-blue-300',
        icon: (
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
      }
    }

    return {
      base: baseStyles,
      ...typeStyles[toast.type]
    }
  }

  const styles = getToastStyles(toast.type)

  return (
    <div
      className={`${styles.base} ${styles[theme === 'dark' ? 'dark' : 'light']} ${
        isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
    >
      {/* 图标 */}
      <div className="flex-shrink-0">
        {styles.icon}
      </div>

      {/* 消息内容 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug">
          {toast.message}
        </p>
      </div>

      {/* 关闭按钮 */}
      <button
        onClick={handleClose}
        className={`flex-shrink-0 ml-2 p-1 rounded hover:bg-opacity-20 hover:bg-black hover:bg-opacity-10 transition-colors`}
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 01-1.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414 1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586 4.293 4.293a1 1 0 01-1.414-1.414l-4.293 4.293z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}

// 自定义 Hook 用于使用 Toast
export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
