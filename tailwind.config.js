/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // 绮剧畝safelist鍙繚鐣欑湡姝ｉ渶瑕佺殑鍔ㄦ€佺被
  safelist: [
    // 鍙繚鐣欐牳蹇冪殑neumorphic妯″紡锛岃€屼笉鏄墍鏈夊彉浣?
    {
      pattern: /^neumorphic$/,
    },
    {
      pattern: /^neumorphic-dark$/,
    },
    // 鍙繚鐣欏疄闄呬娇鐢ㄧ殑鍔ㄧ敾绫?
    'animate-fade-in',
    'animate-fade-in-delay',
    'animate-fade-in-delay-2',
    // 鍙繚鐣欏疄闄呬娇鐢ㄧ殑鏂囧瓧棰滆壊绫?
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
        sans: ['var(--font-zen-body)', 'Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-zen-heading)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-zen-mono)', 'JetBrains Mono', 'Consolas', 'monospace'],
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
          // 娴呰壊涓婚 - 鏃ヨ惤鐭宠川锛屾俯娑﹀畞闈?(Sunset Stone)
          light: '#F2E8D9',
          // 娣辫壊涓婚 - 鏈堝厜鐭宠川锛屾繁閭冨畞闈?(Moonlit Stone)
          dark: '#162019',
          // 闃村奖鑹?- 鏌斿拰鑷劧
          shadowLight: '#FFF9F0',
          shadowDark: '#DCCFBE',
          shadowDarkInset: '#0D1510',
          shadowLightInset: '#7C8078',
        },
        // Warm neutral grayscale to avoid cold/washed UI remnants in legacy gray-* classes.
        gray: {
          50: '#F8F3EB',
          100: '#EFE6DA',
          200: '#E0D3C2',
          300: '#C7B8A4',
          400: '#A89A84',
          500: '#867A67',
          600: '#665B4D',
          700: '#4D453A',
          800: '#373229',
          900: '#221F19',
          950: '#171510',
        },
        // Muted accent palette: keep existing utility classes, remove neon intensity.
        blue: {
          50: '#F1F5F6',
          100: '#E3EBEE',
          200: '#CBD9DF',
          300: '#AFC2CC',
          400: '#8EA9B7',
          500: '#6F8EA0',
          600: '#4D6676',
          700: '#3D5563',
          800: '#30414C',
          900: '#22303A',
        },
        purple: {
          50: '#F4F2F6',
          100: '#E9E5ED',
          200: '#D3CBDC',
          300: '#C1B8C9',
          400: '#A79AB3',
          500: '#8D7F9C',
          600: '#746583',
          700: '#5D516C',
          800: '#463D53',
          900: '#322B3C',
        },
        green: {
          50: '#F2F6F3',
          100: '#E4EDE6',
          200: '#CDDACE',
          300: '#A9C0B0',
          400: '#8EAE99',
          500: '#73977E',
          600: '#4F6A57',
          700: '#3F5646',
          800: '#304138',
          900: '#212D27',
        },
        red: {
          50: '#F8F3F1',
          100: '#F0E4E1',
          200: '#E2CFC8',
          300: '#D8B5AE',
          400: '#C79388',
          500: '#B17165',
          600: '#95594E',
          700: '#78463D',
          800: '#5C3530',
          900: '#422522',
        },
        orange: {
          50: '#F8F4EF',
          100: '#F1E8DC',
          200: '#E4D4B8',
          300: '#DCC2A1',
          400: '#CFAE83',
          500: '#BC9568',
          600: '#7F5F40',
          700: '#6A4F35',
          800: '#523D29',
          900: '#3B2B1D',
        },
        amber: {
          50: '#F9F5EE',
          100: '#F3EBDD',
          200: '#E7D7B7',
          300: '#E0CFA9',
          400: '#D2BB87',
          500: '#BCA063',
          600: '#7C663A',
          700: '#68552F',
          800: '#504124',
          900: '#392E1A',
        },
        yellow: {
          50: '#F9F7EF',
          100: '#F4EEDC',
          200: '#E8DFB8',
          300: '#E3D7AF',
          400: '#D4C487',
          500: '#B8A564',
          600: '#74673A',
          700: '#625730',
          800: '#4A4224',
          900: '#342E19',
        },
        teal: {
          50: '#F1F6F5',
          100: '#E2ECEA',
          200: '#C9DAD6',
          300: '#A8C7C1',
          400: '#88AEA6',
          500: '#6D938B',
          600: '#4A655E',
          700: '#3D534E',
          800: '#2F403C',
          900: '#22302D',
        },
        cyan: {
          50: '#F1F6F7',
          100: '#E2ECED',
          200: '#CBDBDE',
          300: '#B0CBD0',
          400: '#8FAFB8',
          500: '#72939C',
          600: '#4D6872',
          700: '#405660',
          800: '#314149',
          900: '#232F35',
        },
        indigo: {
          50: '#F3F4F7',
          100: '#E7E9F0',
          200: '#D1D6E3',
          300: '#B6BACF',
          400: '#979EB8',
          500: '#7B84A3',
          600: '#616A86',
          700: '#4E566E',
          800: '#3A4154',
          900: '#292E3B',
        },
        rose: {
          50: '#F8F3F4',
          100: '#F0E5E8',
          200: '#E1CED4',
          300: '#DABBC1',
          400: '#C79EA7',
          500: '#B2838E',
          600: '#825863',
          700: '#6B4852',
          800: '#52383F',
          900: '#3B282E',
        },
        pink: {
          50: '#F8F3F5',
          100: '#F1E6EA',
          200: '#E3D0D8',
          300: '#DEC0CC',
          400: '#CDA4B4',
          500: '#B6899C',
          600: '#825E71',
          700: '#6C4D5D',
          800: '#533A47',
          900: '#3C2A33',
        },
        violet: {
          50: '#F4F2F7',
          100: '#EAE5F0',
          200: '#D6CCE3',
          300: '#C5B8D5',
          400: '#AB9DC0',
          500: '#9182AA',
          600: '#76678C',
          700: '#5F5372',
          800: '#473E56',
          900: '#332D3E',
        },
        emerald: {
          50: '#F1F7F4',
          100: '#E2EFE8',
          200: '#CAE0D4',
          300: '#A8CBB8',
          400: '#89B49C',
          500: '#6E9A81',
          600: '#4F6E5C',
          700: '#3F5A4B',
          800: '#30453A',
          900: '#223128',
        },
      },
      boxShadow: {
        // 浣跨敤CSS鍙橀噺鐨勫寮哄姣斿害鏂版嫙鎬佹晥鏋?- 娓╂殩鑹茶皟
        'neumorphic': '12px 12px 24px var(--neumorphic-light-shadow), -12px -12px 24px var(--neumorphic-light-bg)',
        'neumorphic-inset': 'inset 6px 6px 12px var(--neumorphic-light-shadow), inset -6px -6px 12px var(--neumorphic-light-bg)',
        'neumorphic-flat': '6px 6px 12px var(--neumorphic-light-shadow), -6px -6px 12px var(--neumorphic-light-bg)',

        // 澧炲己瀵规瘮搴︽殫鑹蹭富棰?- 娣遍們鏆栭粦
        'neumorphic-dark': '12px 12px 24px var(--neumorphic-dark-shadow), -12px -12px 24px var(--neumorphic-dark-bg)',
        'neumorphic-dark-inset': 'inset 6px 6px 12px var(--neumorphic-dark-shadow), inset -6px -6px 12px var(--neumorphic-dark-bg)',
        'neumorphic-dark-flat': '6px 6px 12px var(--neumorphic-dark-shadow), -6px -6px 12px var(--neumorphic-dark-bg)',

        // 澧炲己鎮仠鏁堟灉
        'neumorphic-hover': '14px 14px 28px var(--neumorphic-light-shadow), -14px -14px 28px var(--neumorphic-light-bg)',
        'neumorphic-dark-hover': '14px 14px 28px var(--neumorphic-dark-shadow), -14px -14px 28px var(--neumorphic-dark-bg)',

        // 澧炲己瀵规瘮搴﹂槾褰辩郴缁?
        'neumorphic-small': '8px 8px 16px var(--neumorphic-light-shadow), -8px -8px 16px var(--neumorphic-light-bg)',
        'neumorphic-dark-small': '8px 8px 16px var(--neumorphic-dark-shadow), -8px -8px 16px var(--neumorphic-dark-bg)',

        'neumorphic-large': '16px 16px 32px var(--neumorphic-light-shadow), -16px -16px 32px var(--neumorphic-light-bg)',
        'neumorphic-dark-large': '16px 16px 32px var(--neumorphic-dark-shadow), -16px -16px 32px var(--neumorphic-dark-bg)',

        // 绉诲姩绔紭鍖?
        'neumorphic-mobile': '6px 6px 12px var(--neumorphic-light-shadow), -6px -6px 12px var(--neumorphic-light-bg)',
        'neumorphic-dark-mobile': '6px 6px 12px var(--neumorphic-dark-shadow), -6px -6px 12px var(--neumorphic-dark-bg)',
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
