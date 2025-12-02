# Zen Moment - Meditation & Breathing Practice Tool

A minimalist meditation timer and breathing exercise application designed to make mindfulness practices accessible to everyone. Built with modern web technologies and optimized for performance across all devices, we are committed to creating meditation tools that serve the global community.

🌐 **Live Demo**: [Zen Moment](https://zenmoment.net)

## 🌟 Our Vision

We believe meditation should be accessible to everyone, regardless of their background, abilities, or circumstances. Our mission is to create meditation tools([Zen Moment](https://zenmoment.net)) that serve the global community, making mindfulness practices available to all who seek inner peace and personal growth.

We are dedicated to building pure meditation tools([Zen Moment](https://zenmoment.net)) that provide a clean, distraction-free environment for people experiencing stress and anxiety. In today's fast-paced world, we aim to be a trusted companion for those who need a moment of calm, offering scientifically-backed techniques to help release tension and find mental clarity.

## ✨ Key Features

### 🧘 Meditation Timer
- **Precise Timing**: Support for 1-999 minute sessions with customizable durations
- **Multiple Presets**: Quick-start options (1/3/5/10/15/20/30/45/60 minutes)
- **Visual Feedback**: Clean countdown display with progress indicators
- **Session Tracking**: Automatic recording of meditation history and statistics

### 🫁 4-7-8 Breathing Exercise
- **Guided Practice**: Visual breathing animations with timing cues
- **Scientific Method**: Based on Dr. Weil's proven relaxation technique
- **Progress Tracking**: Complete 4-cycle sessions with completion statistics
- **Educational Content**: Comprehensive benefits explanation and practice tips

### 📊 Advanced Analytics System
- **Multi-timeframe Statistics**: Today/This Week/This Month/This Season/This Year/All Time
- **Achievement System**: Milestone tracking with badges (1h, 5h, 10h, 50h, 100h+)
- **Habit Analysis**: Practice patterns, consistency tracking, and improvement insights
- **Goal Tracking**: Daily targets, streak counters, and completion rates
- **Statistics Export**: Export meditation data in JSON, CSV, and text summary formats for personal records

### 📝 Professional Blog System
- **SEO-Optimized Content**: Scientifically-backed meditation articles with practical guidance
- **Eastern Philosophy Integration**: Daoist and Zen concepts translated for Western audiences
- **Markdown-Driven**: Efficient content management with Git-based version control
- **Social Sharing**: Easy sharing of meditation guides and breathing exercises
- **Multi-platform Distribution**: Optimized for LinkedIn, Medium, and Reddit sharing

### 🎨 User Experience
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Universal Access**: Designed for users of all abilities and technical backgrounds
- **Performance**: Lighthouse scores >95 on mobile and desktop
- **Offline Functionality**: Complete offline capability once loaded
- **Background Sounds**: 8 ambient sound options (rain, forest, ocean, lake, insects, temple, thunder) for enhanced meditation experience
- **Keyboard Shortcuts**: PC keyboard controls (Space to start/pause, Escape to reset, Enter to start timer) for efficient navigation

### 🔒 Privacy & Security
- **Anonymous Analytics**: Uses Google Analytics for website optimization with IP anonymization
- **Local Data Storage**: All meditation data stored locally using IndexedDB and localStorage
- **No Personal Data**: No registration, email, or personal information required
- **GDPR Compliant**: Configured for privacy with data anonymization and opt-out options
- **Open Source**: Transparent codebase with MIT license
- **User Control**: Analytics opt-out available via browser settings or extensions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cenyi/zen-moment.git
cd zen-moment

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

## 🛠️ Technical Architecture

### Core Technologies
- **Framework**: Next.js 14 (Static Export)
- **Language**: TypeScript 5.4+
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for lightweight state handling
- **Animations**: Framer Motion for smooth interactions
- **Content**: Markdown with gray-matter and remark
- **Audio System**: Web Audio API with HTML5 Audio for background sounds and breathing cues

### Build Optimization
- **Static Generation**: Pre-rendered pages for optimal performance
- **Code Splitting**: Intelligent chunking for mobile optimization
- **Modern Browser Targeting**: Chrome 110+, Firefox 115+, Safari 16+
- **Bundle Optimization**: 244KB max chunk size for mobile caching
- **Critical CSS**: Inlined critical styles for faster rendering
- **Analytics Integration**: Delayed Google Analytics loading for performance

### Performance Features
- **Lighthouse Score**: 95+ on mobile and desktop
- **First Contentful Paint**: <1.5s on 3G networks
- **Time to Interactive**: <2.5s on mobile devices
- **Bundle Size**: <500KB total JavaScript
- **Image Optimization**: WebP format with responsive sizing

## 📁 Project Structure

```
zen-moment/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage - Meditation Timer
│   │   ├── breathing/         # 4-7-8 Breathing Exercise
│   │   ├── stats/             # Advanced Analytics
│   │   ├── blog/              # Blog System
│   │   ├── about/             # About Page
│   │   ├── contact/           # Contact Page
│   │   └── legal/             # Privacy Policy & Terms
│   ├── components/            # Reusable React Components
│   │   ├── Navigation.tsx     # Main Navigation
│   │   ├── Timer.tsx          # Meditation Timer
│   │   ├── BreathingGuide.tsx # Breathing Exercise UI
│   │   ├── StatsCards.tsx     # Analytics Dashboard
│   │   └── BlogPost.tsx       # Blog Article Renderer
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useTimer.ts        # Timer Logic
│   │   ├── useBreathing.ts    # Breathing Exercise Logic
│   │   ├── useStats.ts        # Analytics Calculations
│   │   ├── useTheme.ts        # Theme Management
│   │   ├── useBackgroundSound.ts # Background Audio Management
│   │   └── usePreRecordedSound.ts # Breathing Phase Audio Cues
│   ├── store/                 # State Management
│   │   └── timerStore.ts      # Global State Store
│   ├── utils/                 # Utility Functions
│   │   ├── statsCalculations.ts     # Statistical Analysis
│   │   ├── habitAnalysis.ts         # Pattern Recognition
│   │   ├── timeFormatters.ts        # Time Formatting
│   │   └── blogUtils.ts             # Blog Processing
│   └── types/                 # TypeScript Type Definitions
├── public/                    # Static Assets
│   ├── images/               # Optimized Images
│   ├── sounds/               # Audio Files
│   └── sitemap.xml          # SEO Sitemap
├── scripts/                   # Build Scripts
└── content/                   # Blog Content Management
```

## 🎯 Content Strategy

### SEO-Optimized Blog Content
Our blog system features scientifically-backed meditation content optimized for search engines:

**Core Article Topics:**
- "When Focus Fails: The Archer's Breath for Deep Work"
- "Don't Empty Your Mind: Do This Instead" (Daoist approach)
- "The Samurai's Meditation: Cultivating Stillness in Action"
- "The 3-Minute Mental Reset Before a Big Meeting"
- "Meditation Timer vs Breathing Apps: Which Works Better"

**SEO Keywords:**
- Primary: meditation techniques, mindfulness practices, stress relief meditation
- Long-tail: meditation for anxiety before meeting, how to meditate when stressed
- Technical: 4-7-8 breathing technique, mindfulness breathing exercises

### Content Architecture
- **Hook**: Problem statement (50-100 words)
- **Quick Takeaways**: 3 actionable bullet points
- **Main Content**: 600-1000 words with scientific backing
- **Practice Guide**: 5-minute actionable steps
- **Further Reading**: Internal linking strategy
- **Social Sharing**: Integrated sharing for meditation content

## 🔒 Privacy & Data Collection

### Analytics Usage
[Zen Moment](https://zenmoment.net) uses **Google Analytics** to understand how visitors interact with our website and improve the user experience. This analytics service helps us identify which features are most popular and where we can make improvements.

**What We Collect:**
- Anonymous page views and session duration
- General geographic region (city/country level)
- Device type and browser information
- Feature usage patterns

**What We DON'T Collect:**
- Personal identification information
- Meditation session data (stored locally only)
- Contact information or email addresses
- Any data that could identify you personally

**Privacy Protection:**
- IP address anonymization enabled
- Data sharing with third parties disabled
- No advertising or marketing tracking
- Complete opt-out options available

### Local Data Storage
All your meditation and breathing exercise data is stored **exclusively on your device** using:
- **IndexedDB** for structured data storage
- **localStorage** for user preferences
- **No cloud synchronization** - your data stays private

### User Control
- **Analytics Opt-out**: Use browser extensions or the [Google Analytics Opt-out Add-on](https://tools.google.com/dlpage/gaoptout)
- **Local Data Control**: Clear your browser data to remove all local storage
- **Private Browsing**: Use incognito/private mode for complete anonymity

## 🌐 Deployment Guide

### Cloudflare Pages (Recommended)

**Live Site**: [https://zenmoment.net](https://zenmoment.net) (Deployed on Cloudflare Pages)

**Build Configuration:**
```
Framework: Next.js (Static HTML Export)
Build Command: npx next build
Build Output Directory: out
Node.js Version: 18.x
Environment Variables: NODE_ENV=production
```

**Key Requirements:**
- All dependencies must be in `dependencies` (not `devDependencies`)
- Use `output: 'export'` in next.config.js
- Set `images: { unoptimized: true }`
- Avoid wrangler.toml for static exports

### Local Verification
```bash
# Test build locally
npm run build
npm run preview

# Validate output
ls -la out/  # Should contain index.html and assets
```

## 📊 Analytics & Monitoring

### Built-in Analytics
- **Session Tracking**: Meditation duration and frequency
- **Progress Visualization**: Charts and achievement badges
- **Habit Insights**: Practice patterns and recommendations
- **Export Functionality**: Statistics export in JSON, CSV, and text summary formats

### Performance Monitoring
- **Core Web Vitals**: FCP, LCP, CLS, TTI tracking
- **Bundle Analysis**: Size optimization and chunk monitoring
- **Error Tracking**: Client-side error reporting
- **Usage Analytics**: Anonymous feature usage statistics

## 🔧 Development Guidelines

### Code Standards
- **TypeScript**: Strict mode with comprehensive type definitions
- **ESLint**: Enforced code quality and consistency
- **Component Architecture**: Functional components with hooks
- **State Management**: Minimal global state, local state preferred
- **Performance**: Lazy loading and code splitting for optimal bundles

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-breathing-technique
git commit -m "feat: add box breathing exercise"
git push origin feature/new-breathing-technique

# Bug fixes
git checkout -b fix/timer-animation-bug
git commit -m "fix: resolve timer animation stuttering"
```

### Testing Strategy
- **Manual Testing**: Cross-browser and device testing
- **Performance Testing**: Lighthouse CI integration
- **Accessibility Testing**: Screen reader and keyboard navigation
- **Build Validation**: TypeScript compilation and ESLint checks

## 🤝 Contributing

We welcome contributions from the meditation and developer communities:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request with detailed description

### Contribution Areas
- **New Meditation Techniques**: Additional breathing exercises or mindfulness practices
- **UI/UX Improvements**: Accessibility enhancements or visual improvements
- **Content**: Blog articles, guided meditations, or educational materials
- **Accessibility**: Screen reader support, keyboard navigation, or inclusive design features
- **Translations**: Multi-language support for global accessibility
- **Performance**: Bundle optimization, loading improvements, or new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the excellent React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animation capabilities
- **Meditation Community**: For content inspiration and user feedback
- **Open Source Contributors**: For bug reports, feature suggestions, and code contributions

## 📞 Support

- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Feature requests and general discussion
- **Email**: Contact through the in-app contact form
- **Documentation**: Comprehensive guides in the `/docs` folder

---

**[Zen Moment](https://zenmoment.net)** - Creating accessible meditation tools for everyone, transforming daily moments into mindful experiences through science-backed practices and intuitive digital tools.

🌐 **Visit us**: [Zen Moment](https://zenmoment.net)

*Made with ❤️ for the global meditation community - Building accessible meditation tools for everyone*