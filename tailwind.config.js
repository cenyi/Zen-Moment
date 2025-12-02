/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // 精简safelist只保留真正需要的动态类
  safelist: [
    // 只保留核心的neumorphic模式，而不是所有变体
    {
      pattern: /^neumorphic$/,
    },
    {
      pattern: /^neumorphic-dark$/,
    },
    {
      pattern: /^neumorphic-flat$/,
    },
    {
      pattern: /^neumorphic-dark-flat$/,
    },
    // 只保留实际使用的动画类
    'animate-fade-in',
    'animate-fade-in-delay',
    'animate-fade-in-delay-2',
    // 只保留实际使用的文字颜色类
    {
      pattern: /^text-neumorphic-tips-/,
    },
    {
      pattern: /^text-neumorphic-muted-/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            lineHeight: '1.7',
          },
        },
      },
      colors: {
        neumorphic: {
          light: '#e0e5ec',
          dark: '#1a202c',
          shadowLight: '#ffffff',
          shadowDark: '#c5cdd8',
          shadowDarkInset: '#0f1419',
          shadowLightInset: '#8b929e',
        }
      },
      boxShadow: {
        // 使用CSS变量的增强对比度新拟态效果 - 解决浅色主题视觉层次问题
        'neumorphic': '14px 14px 28px var(--neumorphic-light-shadow), -14px -14px 28px var(--neumorphic-light-bg)',
        'neumorphic-inset': 'inset 8px 8px 16px var(--neumorphic-light-shadow), inset -8px -8px 16px var(--neumorphic-light-bg)',
        'neumorphic-flat': '8px 8px 16px var(--neumorphic-light-shadow), -8px -8px 16px var(--neumorphic-light-bg)',

        // 增强对比度暗色主题 - 使用CSS变量
        'neumorphic-dark': '16px 16px 32px var(--neumorphic-dark-shadow), -16px -16px 32px var(--neumorphic-dark-bg)',
        'neumorphic-dark-inset': 'inset 10px 10px 20px var(--neumorphic-dark-shadow), inset -10px -10px 20px var(--neumorphic-dark-bg)',
        'neumorphic-dark-flat': '10px 10px 20px var(--neumorphic-dark-shadow), -10px -10px 20px var(--neumorphic-dark-bg)',

        // 增强悬停效果 - 使用CSS变量
        'neumorphic-hover': '12px 12px 24px var(--neumorphic-light-shadow), -12px -12px 24px var(--neumorphic-light-bg)',
        'neumorphic-dark-hover': '12px 12px 24px var(--neumorphic-dark-shadow), -12px -12px 24px var(--neumorphic-dark-bg)',

        // 增强对比度阴影系统 - 使用CSS变量
        'neumorphic-small': '12px 12px 24px var(--neumorphic-light-shadow), -12px -12px 24px var(--neumorphic-light-bg)',    // 小按钮/图标
        'neumorphic-dark-small': '12px 12px 24px var(--neumorphic-dark-shadow), -12px -12px 24px var(--neumorphic-dark-bg)', // 小按钮/图标暗色

        'neumorphic': '16px 16px 32px var(--neumorphic-light-shadow), -16px -16px 32px var(--neumorphic-light-bg)',      // 中等按钮(默认)
        'neumorphic-dark': '16px 16px 32px var(--neumorphic-dark-shadow), -16px -16px 32px var(--neumorphic-dark-bg)', // 中等按钮暗色(默认)

        'neumorphic-large': '20px 20px 40px var(--neumorphic-light-shadow), -20px -20px 40px var(--neumorphic-light-bg)',  // 大按钮/卡片
        'neumorphic-dark-large': '20px 20px 40px var(--neumorphic-dark-shadow), -20px -20px 40px var(--neumorphic-dark-bg)', // 大按钮/卡片暗色

        // 移动端优化 - 使用CSS变量
        'neumorphic-mobile': '8px 8px 16px var(--neumorphic-light-shadow), -8px -8px 16px var(--neumorphic-light-bg)',
        'neumorphic-dark-mobile': '8px 8px 16px var(--neumorphic-dark-shadow), -8px -8px 16px var(--neumorphic-dark-bg)',
      },
      animation: {
        'breathing': 'breathing 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'neumorphic-breathe': 'neumorphic-breathe 4s ease-in-out infinite',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'neumorphic-breathe': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '12px 12px 24px var(--neumorphic-light-shadow), -12px -12px 24px var(--neumorphic-light-bg)',
          },
          '50%': {
            transform: 'scale(1.02)',
            boxShadow: '14px 14px 28px var(--neumorphic-light-shadow), -14px -14px 28px var(--neumorphic-light-bg)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
}

module.exports = config