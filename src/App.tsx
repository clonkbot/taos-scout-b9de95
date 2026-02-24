import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BusinessScanner from './components/BusinessScanner';
import WebsiteBuilder from './components/WebsiteBuilder';
import EmailComposer from './components/EmailComposer';

type Step = 'scan' | 'build' | 'email';

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

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('scan');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [websitePreview, setWebsitePreview] = useState<WebsitePreview | null>(null);

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'scan', label: 'Discover', number: 1 },
    { id: 'build', label: 'Design', number: 2 },
    { id: 'email', label: 'Outreach', number: 3 },
  ];

  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setCurrentStep('build');
  };

  const handleWebsiteComplete = (preview: WebsitePreview) => {
    setWebsitePreview(preview);
    setCurrentStep('email');
  };

  const handleBack = () => {
    if (currentStep === 'email') {
      setCurrentStep('build');
    } else if (currentStep === 'build') {
      setCurrentStep('scan');
      setSelectedBusiness(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Desert texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric desert shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-terracotta/20 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-turquoise/15 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 md:px-8 lg:px-12 pt-6 md:pt-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center shadow-lg shadow-terracotta/30">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="font-display text-xl md:text-2xl text-stone-800 tracking-tight">Taos Scout</h1>
                  <p className="text-xs md:text-sm text-stone-500 font-body">Business opportunity finder</p>
                </div>
              </div>

              {/* Progress Steps */}
              <nav className="flex items-center gap-2 md:gap-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => {
                        if (step.id === 'scan') {
                          setCurrentStep('scan');
                          setSelectedBusiness(null);
                        } else if (step.id === 'build' && selectedBusiness) {
                          setCurrentStep('build');
                        } else if (step.id === 'email' && websitePreview) {
                          setCurrentStep('email');
                        }
                      }}
                      disabled={
                        (step.id === 'build' && !selectedBusiness) ||
                        (step.id === 'email' && !websitePreview)
                      }
                      className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all duration-300 ${
                        currentStep === step.id
                          ? 'bg-terracotta text-amber-50 shadow-md shadow-terracotta/30'
                          : 'bg-stone-100/80 text-stone-400 hover:bg-stone-200/80 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      <span className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        currentStep === step.id ? 'bg-amber-50/20' : 'bg-stone-200'
                      }`}>
                        {step.number}
                      </span>
                      <span className="text-xs md:text-sm font-body font-medium hidden sm:inline">{step.label}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className="w-4 md:w-8 h-px bg-stone-200 mx-1" />
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {currentStep === 'scan' && (
                <motion.div
                  key="scan"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BusinessScanner onSelectBusiness={handleSelectBusiness} />
                </motion.div>
              )}

              {currentStep === 'build' && selectedBusiness && (
                <motion.div
                  key="build"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WebsiteBuilder
                    business={selectedBusiness}
                    onComplete={handleWebsiteComplete}
                    onBack={handleBack}
                  />
                </motion.div>
              )}

              {currentStep === 'email' && selectedBusiness && websitePreview && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EmailComposer
                    business={selectedBusiness}
                    websitePreview={websitePreview}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-4 md:px-8 lg:px-12 py-4 md:py-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs text-stone-400 font-body">
              Requested by <span className="text-stone-500">@Quincy</span> · Built by <span className="text-stone-500">@clonkbot</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
