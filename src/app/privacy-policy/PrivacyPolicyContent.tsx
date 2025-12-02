export function PrivacyPolicyContent() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-6">Privacy Policy</h1>
        <p className="text-xl opacity-80">
          Effective Date: January 1, 2025
        </p>
      </div>

      <div className="space-y-8">
        <p className="text-lg leading-relaxed">
          At Zen Moment, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information when you use our meditation and breathing exercise application.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-4">Information We Don&apos;t Collect</h2>
        <p className="leading-relaxed">
          We are proud to inform you that Zen Moment does not collect any personal information from our users. Our application is designed to work entirely offline and does not require any form of user registration, login, or data collection.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-4">Local Data Storage</h2>
        <p className="leading-relaxed mb-4">
          The only data stored by Zen Moment is kept locally on your device using browser storage (localStorage). This includes:
        </p>
        <ul className="mb-6 space-y-2 pl-6">
          <li>• Your preferred theme setting (dark/light mode)</li>
          <li>• Meditation session statistics (daily and total meditation time)</li>
          <li>• App preferences and settings</li>
        </ul>

        <h2 className="text-2xl font-medium mt-8 mb-4">Analytics and Website Improvement</h2>
        <p className="leading-relaxed mb-4">
          Zen Moment uses Google Analytics to understand how visitors interact with our website and to improve the user experience. This analytics service helps us identify which features are most popular, how users navigate through the site, and where we can make improvements to better serve our meditation community.
        </p>
        <p className="leading-relaxed mb-4">
          <strong>What data is collected:</strong> Google Analytics collects anonymized information such as page views, session duration, general geographic region (city/country), device type, and browser information. This data cannot identify you personally.
        </p>
        <p className="leading-relaxed mb-4">
          <strong>How we protect your privacy:</strong> We have configured Google Analytics to respect user privacy by anonymizing IP addresses and disabling data sharing with third parties for advertising purposes. The data we collect is used solely for website optimization and improving our meditation tools.
        </p>
        <p className="leading-relaxed">
          <strong>Your choices:</strong> You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">Google Analytics Opt-out Browser Add-on</a>, or by adjusting your browser's privacy settings. You can also use browser extensions that block tracking scripts.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-4">GDPR and CCPA Compliance</h2>
        <p className="leading-relaxed">
          Our privacy practices align with the principles of the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Since we don&apos;t collect personal data, your rights under these regulations are automatically protected.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-4">Children&apos;s Privacy</h2>
        <p className="leading-relaxed">
          Zen Moment is suitable for users of all ages. No personal information is collected from children, and parental consent is not required for use of our application.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-4">Data Security</h2>
        <p className="leading-relaxed">
          All data is stored locally on your device. We implement standard security practices to ensure the integrity of our application code, but ultimate responsibility for device security rests with the user.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-4">Changes to This Policy</h2>
        <p className="leading-relaxed">
          We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. Since our core principle of not collecting user data will never change, any updates will be minor clarifications or improvements to this document.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-4">Contact Us</h2>
        <p className="leading-relaxed mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="leading-relaxed">
          Email: <a href="mailto:support@zenmoment.net" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">support@zenmoment.net</a><br/>
          Website: <a href="https://zenmoment.net" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">zenmoment.net</a>
        </p>
      </div>
    </main>
  )
}