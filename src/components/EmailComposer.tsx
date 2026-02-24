import { useState } from 'react';
import { motion } from 'framer-motion';

interface Business {
  name: string;
  category: string;
  address: string;
  phone: string;
  status: 'no-website' | 'poor-website' | 'good-website';
  issues?: string[];
  existingUrl?: string;
}

interface WebsitePreview {
  style: string;
  colorScheme: string;
  features: string[];
}

interface Props {
  business: Business;
  websitePreview: WebsitePreview;
  onBack: () => void;
}

export default function EmailComposer({ business, websitePreview, onBack }: Props) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [yourName, setYourName] = useState('');
  const [pricingTier, setPricingTier] = useState<'starter' | 'professional' | 'premium'>('professional');
  const [copied, setCopied] = useState(false);

  const pricing = {
    starter: { price: 499, monthly: 29, features: ['5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO'] },
    professional: { price: 999, monthly: 49, features: ['10 pages', 'Mobile responsive', 'Online booking', 'Advanced SEO', 'Social media integration'] },
    premium: { price: 1999, monthly: 79, features: ['Unlimited pages', 'E-commerce ready', 'Custom features', 'Priority support', 'Analytics dashboard'] },
  };

  const selectedPricing = pricing[pricingTier];

  const generateEmail = () => {
    const statusText = business.status === 'no-website'
      ? "I noticed that your business doesn't currently have a website"
      : "I came across your current website and noticed some opportunities for improvement";

    const issuesText = business.issues && business.issues.length > 0
      ? `\n\nSpecifically, I observed:\n${business.issues.map(issue => `• ${issue}`).join('\n')}`
      : '';

    return `Subject: Custom Website Designed for ${business.name}

Dear ${business.name} Team,

I hope this email finds you well. My name is ${yourName || '[Your Name]'}, and I'm a web designer specializing in helping local Taos businesses establish a strong online presence.

${statusText}.${issuesText}

I've taken the initiative to design a custom website concept specifically for ${business.name}. Here's what I've created:

DESIGN OVERVIEW
─────────────────
Style: ${websitePreview.style}
Color Palette: ${websitePreview.colorScheme}
Key Features: ${websitePreview.features.join(', ')}

This design was crafted to reflect the unique character of your ${business.category.toLowerCase()} business while ensuring modern functionality and mobile responsiveness.

INVESTMENT OPTIONS
─────────────────
${pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)} Package: $${selectedPricing.price} one-time setup + $${selectedPricing.monthly}/month hosting & maintenance

Includes:
${selectedPricing.features.map(f => `✓ ${f}`).join('\n')}

I would love to schedule a brief call to show you the design mockup and discuss how a professional website could help bring more customers to ${business.name}.

Are you available for a 15-minute call this week?

Best regards,
${yourName || '[Your Name]'}
${recipientEmail ? `\nReply to: ${recipientEmail}` : ''}

---
This website concept was designed with your business in mind. No obligation to proceed.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmail());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    const email = generateEmail();
    const subject = encodeURIComponent(`Custom Website Designed for ${business.name}`);
    const body = encodeURIComponent(email.replace(/^Subject:.*\n\n/, ''));
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-terracotta transition-colors mb-2 font-body text-sm min-h-[44px] py-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to design
        </button>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-stone-800">
          Outreach for <span className="text-terracotta">{business.name}</span>
        </h2>
        <p className="text-stone-500 font-body mt-1 text-sm md:text-base">Customize your pitch and send your proposal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Configuration Panel */}
        <div className="space-y-4 md:space-y-6">
          {/* Your Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <h3 className="font-display text-lg md:text-xl text-stone-800 mb-3 md:mb-4">Your Details</h3>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5 md:mb-2 font-body">
                  Your Name
                </label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 font-body focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all placeholder:text-stone-400 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5 md:mb-2 font-body">
                  Your Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 font-body focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all placeholder:text-stone-400 text-base"
                />
              </div>
            </div>
          </motion.div>

          {/* Pricing Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <h3 className="font-display text-lg md:text-xl text-stone-800 mb-3 md:mb-4">Pricing Package</h3>
            <div className="space-y-2 md:space-y-3">
              {(Object.keys(pricing) as Array<keyof typeof pricing>).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setPricingTier(tier)}
                  className={`w-full p-3 md:p-4 rounded-xl text-left transition-all duration-300 ${
                    pricingTier === tier
                      ? 'bg-terracotta/10 border-2 border-terracotta'
                      : 'bg-stone-50 border-2 border-transparent hover:bg-stone-100'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 mb-2">
                    <h4 className={`font-body font-semibold capitalize ${
                      pricingTier === tier ? 'text-terracotta' : 'text-stone-700'
                    }`}>
                      {tier}
                    </h4>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${
                        pricingTier === tier ? 'text-terracotta' : 'text-stone-800'
                      }`}>
                        ${pricing[tier].price}
                      </span>
                      <span className="text-xs text-stone-500 ml-1">
                        + ${pricing[tier].monthly}/mo
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {pricing[tier].features.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs bg-stone-100 text-stone-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {pricing[tier].features.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-stone-100 text-stone-600 rounded-full">
                        +{pricing[tier].features.length - 3} more
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Website Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-turquoise/10 to-turquoise/5 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-turquoise/20"
          >
            <h3 className="font-display text-lg md:text-xl text-stone-800 mb-3 md:mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Website Design Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-stone-500 font-body">Style</span>
                <span className="text-stone-800 font-medium font-body">{websitePreview.style}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-stone-500 font-body">Colors</span>
                <span className="text-stone-800 font-medium font-body">{websitePreview.colorScheme}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-stone-500 font-body">Features</span>
                <span className="text-stone-800 font-medium font-body text-right max-w-[60%]">
                  {websitePreview.features.slice(0, 3).join(', ')}
                  {websitePreview.features.length > 3 && ` +${websitePreview.features.length - 3}`}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Email Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100 sticky top-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 md:mb-4">
              <h3 className="font-display text-lg md:text-xl text-stone-800">Email Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-body font-medium text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors min-h-[36px]"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Email Content */}
            <div className="bg-stone-50 rounded-xl p-3 md:p-4 max-h-[40vh] md:max-h-[50vh] overflow-y-auto mb-4 md:mb-6">
              <pre className="text-xs md:text-sm text-stone-700 font-body whitespace-pre-wrap leading-relaxed">
                {generateEmail()}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={handleSendEmail}
                className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-terracotta to-terracotta-dark text-amber-50 font-body font-semibold rounded-xl shadow-lg shadow-terracotta/30 hover:shadow-xl hover:shadow-terracotta/40 transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Open in Email Client
              </button>
              <button
                onClick={handleCopy}
                className="px-4 md:px-6 py-3 md:py-4 border-2 border-stone-200 text-stone-700 font-body font-semibold rounded-xl hover:bg-stone-50 transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy to Clipboard</span>
              </button>
            </div>

            {/* Tips */}
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-amber-50 rounded-xl border border-amber-100">
              <h4 className="font-body font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Outreach Tips
              </h4>
              <ul className="text-xs text-amber-700 font-body space-y-1">
                <li>• Research the business owner's name on LinkedIn</li>
                <li>• Follow up within 3-5 business days</li>
                <li>• Attach a screenshot of your design mockup</li>
                <li>• Be prepared to show a live demo</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
