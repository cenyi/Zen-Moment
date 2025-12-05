/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  
  // Configure redirects
  async redirects() {
    return [
      // Redirect /breathing to /breathing-exercise
      { source: '/breathing', destination: '/breathing-exercise', permanent: true },
      { source: '/breathing/', destination: '/breathing-exercise', permanent: true },
    ];
  },

  // Optimize for modern browsers
  experimental: {
    optimizePackageImports: ['zustand', 'framer-motion'],
    optimizeCss: true,
  },

  // Configure SWC for modern browser targeting
  swcMinify: true,

  // Completely disable polyfills for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  // Critical CSS inlining for performance
  reactStrictMode: false,

  // Configure webpack for better modern browser support
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle size for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, net: false, tls: false,
      };

      // Reduce polyfills in production for modern browsers
      if (!dev) {
        // Use modern browser targets for webpack
        config.target = ['web', 'es2022'];

        // Set browserslist environment for modern browsers
        process.env.BROWSERSLIST = 'Chrome >= 110, Firefox >= 115, Safari >= 16, Edge >= 110, iOS >= 16, Android >= 110';

        // Completely disable polyfills for modern browsers
        config.resolve.alias = {
          ...config.resolve.alias,
          // Disable all core-js polyfills for modern browsers
          'core-js': false,
          'core-js/pure': false,
          'core-js/stable': false,
          'core-js/es': false,
          'core-js/features': false,
          'regenerator-runtime': false,
          'regenerator-runtime/runtime': false,
          '@babel/polyfill': false,
          '@babel/runtime': false,
          'babel-runtime': false,
        };

        // Optimize bundle for better tree shaking and mobile performance
        config.optimization = {
          ...config.optimization,
          usedExports: true,
          sideEffects: false,
          // 优化代码分割 - 移动端性能优化
          splitChunks: {
            chunks: 'all',
            maxSize: 244000, // 244KB chunks for better mobile caching
            cacheGroups: {
              // framer-motion延迟加载 - 降低优先级
              framerMotion: {
                test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                name: 'framer-motion',
                chunks: 'async',
                priority: 20,
                enforce: true,
              },
              // 核心vendor库优化
              vendor: {
                test: /[\\/]node_modules[\\/](?!framer-motion)[\\/]/,
                name: 'vendors',
                chunks: 'all',
                priority: 10,
                minChunks: 1,
                maxSize: 150000, // 150KB max for mobile
              },
              // 公共代码优化
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 5,
                maxSize: 100000, // 100KB max for mobile
                minSize: 30000, // 30KB min size
              },
            },
          },
        };
      }
    }

    return config;
  },

  // Optimize output for modern browsers
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;