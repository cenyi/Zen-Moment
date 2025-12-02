import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createEnhancedCriticalCSS() {
  const outDir = path.join(__dirname, '../out');

  if (!fs.existsSync(outDir)) {
    console.error('❌ Output directory not found. Run build first.');
    process.exit(1);
  }

  const cssDir = path.join(outDir, '_next/static/css');
  if (!fs.existsSync(cssDir)) {
    console.error('❌ CSS directory not found.');
    return;
  }

  const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  if (cssFiles.length === 0) {
    console.error('❌ No CSS files found.');
    return;
  }

  const cssFile = cssFiles[0]; // Use the first CSS file
  const cssPath = path.join(cssDir, cssFile);
  const fullCSS = fs.readFileSync(cssPath, 'utf8');

  console.log('🔍 Creating enhanced Critical CSS...');
  console.log(`📁 Processing CSS file: ${cssFile}`);

  // Optimized Critical CSS for Zen Moment - Mobile First
  const criticalCSS = `
/* Essential Reset & Base */
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}
body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-size:inherit;font-weight:inherit}

/* Critical Layout */
.min-h-screen{min-height:100vh}
.w-full{width:100%}
.h-16{height:4rem}
.max-w-md{max-width:28rem}
.flex{display:flex}
.flex-col{flex-direction:column}
.items-center{align-items:center}
.justify-center{justify-content:center}
.gap-4{gap:1rem}

/* Critical Spacing */
.mb-4{margin-bottom:1rem}
.mb-6{margin-bottom:1.5rem}
.px-4{padding-left:1rem;padding-right:1rem}
.py-3{padding-top:.75rem;padding-bottom:.75rem}

/* Critical Colors - Dark Theme Optimized */
.bg-neumorphic-dark{background-color:#1a202c}
.text-neumorphic-tips-dark{color:#f7fafc}
.text-neumorphic-muted-dark{color:#e2e8f0}

/* Critical Typography */
.text-2xl{font-size:1.5rem;line-height:2rem}
.text-lg{font-size:1.125rem;line-height:1.75rem}
.font-light{font-weight:300}
.text-center{text-align:center}

/* Critical Border Radius */
.rounded-lg{border-radius:.5rem}
.rounded-full{border-radius:9999px}

/* Essential Animations - Mobile Optimized */
.animate-fade-in{animation:fadeIn .3s ease-out}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* Critical Positioning */
.relative{position:relative}
.absolute{position:absolute}

/* Mobile Optimizations */
@media (max-width:768px){
  .animate-fade-in{animation:none;opacity:1;transform:none}
  body{font-size:16px} /* Prevent zoom on iOS */
}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.01ms !important;animation-iteration-count:1 !important}
}
`;

  // Process all HTML files with enhanced critical CSS
  const htmlFiles = fs.readdirSync(outDir).filter(file => file.endsWith('.html'));

  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(outDir, htmlFile);
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    console.log(`📄 Processing ${htmlFile}...`);

    try {
      // Remove ALL existing styles and CSS links to avoid duplication
      htmlContent = htmlContent.replace(/<style[^>]*>.*?<\/style>/gs, '');
      htmlContent = htmlContent.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, '');
      htmlContent = htmlContent.replace(/<noscript><link[^>]*rel="stylesheet"[^>]*><\/noscript>/g, '');

      // Add enhanced critical CSS in head
      const headEndIndex = htmlContent.indexOf('</head>');
      if (headEndIndex !== -1) {
        // Add optimized CSS loading strategy for mobile performance
        const optimizedCSSHTML = `<style data-emotion="critical">${criticalCSS}</style>
<link rel="preload" href="/_next/static/css/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="/_next/static/css/${cssFile}"></noscript>`;

        htmlContent = htmlContent.slice(0, headEndIndex) + optimizedCSSHTML + htmlContent.slice(headEndIndex);
      }

      // Write back the processed HTML
      fs.writeFileSync(htmlPath, htmlContent);
      const criticalSize = (criticalCSS.length/1024).toFixed(1);
      console.log(`✅ ${htmlFile} - Optimized Critical CSS applied (${criticalSize}KB inlined, mobile-optimized)`);

    } catch (error) {
      console.error(`❌ Error processing ${htmlFile}:`, error.message);
    }
  }

  console.log('🎉 Enhanced Critical CSS implementation complete!');
}

createEnhancedCriticalCSS().catch(console.error);