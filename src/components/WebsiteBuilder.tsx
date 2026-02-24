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
  onComplete: (preview: WebsitePreview) => void;
  onBack: () => void;
}

const styleOptions = [
  { id: 'modern', name: 'Modern Minimal', desc: 'Clean lines, ample whitespace, contemporary feel' },
  { id: 'artisan', name: 'Artisan Craft', desc: 'Handcrafted aesthetic, warm textures, authentic' },
  { id: 'bold', name: 'Bold & Vibrant', desc: 'Eye-catching colors, dynamic layouts, energetic' },
  { id: 'elegant', name: 'Elegant Classic', desc: 'Sophisticated typography, refined details, timeless' },
];

const colorSchemes = [
  { id: 'desert', name: 'Desert Sunset', colors: ['#C4703C', '#E8D5B7', '#2D4A5E'] },
  { id: 'sage', name: 'Sage & Stone', colors: ['#7D9A78', '#F5F2EB', '#3D3D3D'] },
  { id: 'turquoise', name: 'Turquoise Trail', colors: ['#40B5AD', '#FFF8F0', '#1E1E1E'] },
  { id: 'clay', name: 'Red Clay', colors: ['#A65D4E', '#FBF7F4', '#2B2B2B'] },
];

const featureOptions = [
  { id: 'gallery', name: 'Photo Gallery', icon: '🖼️' },
  { id: 'booking', name: 'Online Booking', icon: '📅' },
  { id: 'contact', name: 'Contact Form', icon: '✉️' },
  { id: 'map', name: 'Location Map', icon: '📍' },
  { id: 'reviews', name: 'Testimonials', icon: '⭐' },
  { id: 'social', name: 'Social Media', icon: '📱' },
  { id: 'shop', name: 'Online Shop', icon: '🛒' },
  { id: 'blog', name: 'News/Blog', icon: '📝' },
];

export default function WebsiteBuilder({ business, onComplete, onBack }: Props) {
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [selectedColorScheme, setSelectedColorScheme] = useState('desert');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['gallery', 'contact', 'map']);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const style = styleOptions.find(s => s.id === selectedStyle);
      const colors = colorSchemes.find(c => c.id === selectedColorScheme);
      const features = featureOptions.filter(f => selectedFeatures.includes(f.id));

      onComplete({
        style: style?.name || 'Modern Minimal',
        colorScheme: colors?.name || 'Desert Sunset',
        features: features.map(f => f.name),
      });
    }, 2000);
  };

  const currentColors = colorSchemes.find(c => c.id === selectedColorScheme)?.colors || colorSchemes[0].colors;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-500 hover:text-terracotta transition-colors mb-2 font-body text-sm min-h-[44px] py-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to results
          </button>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-stone-800">
            Design for <span className="text-terracotta">{business.name}</span>
          </h2>
          <p className="text-stone-500 font-body mt-1 text-sm md:text-base">{business.category} • {business.address}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Options Panel */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Style Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <h3 className="font-display text-lg md:text-xl text-stone-800 mb-3 md:mb-4">Design Style</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {styleOptions.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-3 md:p-4 rounded-xl text-left transition-all duration-300 min-h-[72px] ${
                    selectedStyle === style.id
                      ? 'bg-terracotta/10 border-2 border-terracotta'
                      : 'bg-stone-50 border-2 border-transparent hover:bg-stone-100'
                  }`}
                >
                  <h4 className={`font-body font-semibold text-sm md:text-base ${
                    selectedStyle === style.id ? 'text-terracotta' : 'text-stone-700'
                  }`}>
                    {style.name}
                  </h4>
                  <p className="text-xs md:text-sm text-stone-500 mt-0.5 md:mt-1 line-clamp-2">{style.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Color Scheme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <h3 className="font-display text-lg md:text-xl text-stone-800 mb-3 md:mb-4">Color Scheme</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {colorSchemes.map(scheme => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedColorScheme(scheme.id)}
                  className={`p-3 md:p-4 rounded-xl transition-all duration-300 min-h-[80px] ${
                    selectedColorScheme === scheme.id
                      ? 'bg-terracotta/10 border-2 border-terracotta'
                      : 'bg-stone-50 border-2 border-transparent hover:bg-stone-100'
                  }`}
                >
                  <div className="flex gap-1 mb-2">
                    {scheme.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 rounded-full shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className={`text-xs md:text-sm font-body font-medium ${
                    selectedColorScheme === scheme.id ? 'text-terracotta' : 'text-stone-600'
                  }`}>
                    {scheme.name}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <h3 className="font-display text-lg md:text-xl text-stone-800 mb-3 md:mb-4">Website Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
              {featureOptions.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-3 md:p-4 rounded-xl text-center transition-all duration-300 min-h-[72px] ${
                    selectedFeatures.includes(feature.id)
                      ? 'bg-turquoise/10 border-2 border-turquoise'
                      : 'bg-stone-50 border-2 border-transparent hover:bg-stone-100'
                  }`}
                >
                  <span className="text-xl md:text-2xl">{feature.icon}</span>
                  <p className={`text-xs md:text-sm font-body font-medium mt-1 ${
                    selectedFeatures.includes(feature.id) ? 'text-turquoise-dark' : 'text-stone-600'
                  }`}>
                    {feature.name}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100 sticky top-4">
            <h3 className="font-display text-lg md:text-xl text-stone-800 mb-3 md:mb-4">Preview</h3>

            {/* Mini Website Preview */}
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-lg mb-4 md:mb-6">
              {/* Browser Chrome */}
              <div className="bg-stone-100 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 bg-white rounded px-2 py-0.5 text-xs text-stone-400 truncate font-mono">
                  {business.name.toLowerCase().replace(/\s+/g, '')}.com
                </div>
              </div>

              {/* Preview Content */}
              <div
                className="aspect-[4/3]"
                style={{ backgroundColor: currentColors[1] }}
              >
                {/* Header */}
                <div
                  className="h-8 md:h-10 flex items-center justify-between px-3 md:px-4"
                  style={{ backgroundColor: currentColors[2] }}
                >
                  <div className="text-[10px] md:text-xs font-bold truncate max-w-[60%]" style={{ color: currentColors[1] }}>
                    {business.name}
                  </div>
                  <div className="flex gap-2 md:gap-3">
                    {['About', 'Services', 'Contact'].map(item => (
                      <span key={item} className="text-[8px] md:text-[10px] hidden sm:inline" style={{ color: currentColors[1], opacity: 0.7 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hero */}
                <div className="p-3 md:p-4">
                  <div
                    className="h-12 md:h-16 rounded-lg mb-2 md:mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${currentColors[0]}20` }}
                  >
                    <span className="text-[10px] md:text-xs font-semibold" style={{ color: currentColors[0] }}>
                      Hero Image
                    </span>
                  </div>
                  <div className="h-2 rounded mb-1" style={{ backgroundColor: currentColors[2], width: '70%' }} />
                  <div className="h-1.5 rounded mb-2" style={{ backgroundColor: `${currentColors[2]}40`, width: '50%' }} />
                  <div
                    className="inline-block px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px]"
                    style={{ backgroundColor: currentColors[0], color: currentColors[1] }}
                  >
                    Learn More
                  </div>
                </div>

                {/* Features Grid */}
                <div className="px-3 md:px-4 pb-3">
                  <div className="grid grid-cols-3 gap-1 md:gap-2">
                    {selectedFeatures.slice(0, 3).map(featureId => {
                      const feature = featureOptions.find(f => f.id === featureId);
                      return (
                        <div
                          key={featureId}
                          className="rounded p-1 md:p-2 text-center"
                          style={{ backgroundColor: `${currentColors[0]}10` }}
                        >
                          <span className="text-xs md:text-sm">{feature?.icon}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-stone-500 font-body">Style</span>
                <span className="text-stone-800 font-medium font-body">
                  {styleOptions.find(s => s.id === selectedStyle)?.name}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-stone-500 font-body">Colors</span>
                <span className="text-stone-800 font-medium font-body">
                  {colorSchemes.find(c => c.id === selectedColorScheme)?.name}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-stone-500 font-body">Features</span>
                <span className="text-stone-800 font-medium font-body">
                  {selectedFeatures.length} selected
                </span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || selectedFeatures.length === 0}
              className="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-terracotta to-terracotta-dark text-amber-50 font-body font-semibold rounded-xl shadow-lg shadow-terracotta/30 hover:shadow-xl hover:shadow-terracotta/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
            >
              {isGenerating ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Website</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
