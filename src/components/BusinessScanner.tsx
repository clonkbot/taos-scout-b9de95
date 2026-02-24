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

interface Props {
  onSelectBusiness: (business: Business) => void;
}

// Simulated Taos business data
const mockBusinesses: Business[] = [
  {
    name: "Adobe Dreams Gallery",
    category: "Art Gallery",
    address: "123 Paseo del Pueblo Norte",
    phone: "(575) 555-0101",
    status: "no-website",
    issues: ["No online presence", "Missing from Google Maps"],
  },
  {
    name: "Taos Mountain Roasters",
    category: "Coffee Shop",
    address: "456 Kit Carson Rd",
    phone: "(575) 555-0202",
    status: "poor-website",
    existingUrl: "taosmtnroasters.weebly.com",
    issues: ["Not mobile friendly", "Slow loading", "No SSL certificate", "Outdated design"],
  },
  {
    name: "Sacred Earth Pottery",
    category: "Artisan Crafts",
    address: "789 Bent Street",
    phone: "(575) 555-0303",
    status: "no-website",
    issues: ["No website", "Only Facebook page"],
  },
  {
    name: "High Desert Wellness",
    category: "Spa & Wellness",
    address: "321 Camino de la Placita",
    phone: "(575) 555-0404",
    status: "poor-website",
    existingUrl: "highdesertwellness.wordpress.com",
    issues: ["WordPress.com subdomain", "Template not customized", "No booking system"],
  },
  {
    name: "Rio Grande Rafting Co",
    category: "Adventure Tours",
    address: "555 State Road 68",
    phone: "(575) 555-0505",
    status: "no-website",
    issues: ["No website", "Relies on Yelp listing only"],
  },
  {
    name: "Coyote Moon Jewelry",
    category: "Jewelry & Accessories",
    address: "888 Ledoux Street",
    phone: "(575) 555-0606",
    status: "poor-website",
    existingUrl: "coyotemoontaos.com",
    issues: ["Flash-based elements", "Broken images", "No mobile version"],
  },
];

export default function BusinessScanner({ onSelectBusiness }: Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchCategory, setSearchCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'no-website' | 'poor-website'>('all');

  const categories = ['all', 'Art Gallery', 'Coffee Shop', 'Artisan Crafts', 'Spa & Wellness', 'Adventure Tours', 'Jewelry & Accessories'];

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setBusinesses([]);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setBusinesses(mockBusinesses);
    }, 2500);
  };

  const filteredBusinesses = businesses.filter(b => {
    const categoryMatch = searchCategory === 'all' || b.category === searchCategory;
    const statusMatch = filterStatus === 'all' || b.status === filterStatus;
    return categoryMatch && statusMatch && b.status !== 'good-website';
  });

  const getStatusBadge = (status: Business['status']) => {
    switch (status) {
      case 'no-website':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-rose-100 text-rose-700 rounded-full">
            No Website
          </span>
        );
      case 'poor-website':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
            Needs Upgrade
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-3 md:mb-4"
        >
          Discover Opportunities in{' '}
          <span className="text-terracotta">Taos</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-stone-600 font-body text-base md:text-lg px-4"
        >
          Find local businesses without websites or with outdated ones. Help them thrive online.
        </motion.p>
      </div>

      {/* Scan Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl shadow-stone-200/50 border border-stone-100"
      >
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start lg:items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-stone-700 mb-2 font-body">
              Business Category
            </label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 font-body focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-base"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-stone-700 mb-2 font-body">
              Website Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'no-website' | 'poor-website')}
              className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 font-body focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-base"
            >
              <option value="all">All Opportunities</option>
              <option value="no-website">No Website</option>
              <option value="poor-website">Needs Upgrade</option>
            </select>
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full lg:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-gradient-to-r from-terracotta to-terracotta-dark text-amber-50 font-body font-semibold rounded-xl shadow-lg shadow-terracotta/30 hover:shadow-xl hover:shadow-terracotta/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            {isScanning ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="whitespace-nowrap">Scanning Taos...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="whitespace-nowrap">Start Scan</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Scanning Animation */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 md:py-16"
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-terracotta/30"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-turquoise/30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-4 md:mt-6 text-stone-600 font-body text-sm md:text-base px-4 text-center">Scanning business directories in Taos, NM...</p>
        </motion.div>
      )}

      {/* Results */}
      {scanComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2">
            <h3 className="font-display text-xl md:text-2xl text-stone-800">
              Found {filteredBusinesses.length} Opportunities
            </h3>
            <p className="text-sm text-stone-500 font-body">
              Click a business to design their new website
            </p>
          </div>

          <div className="grid gap-3 md:gap-4">
            {filteredBusinesses.map((business, index) => (
              <motion.button
                key={business.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectBusiness(business)}
                className="w-full text-left bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg shadow-stone-200/30 border border-stone-100 hover:shadow-xl hover:border-terracotta/30 hover:bg-white transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <h4 className="font-display text-lg md:text-xl text-stone-800 group-hover:text-terracotta transition-colors truncate">
                        {business.name}
                      </h4>
                      {getStatusBadge(business.status)}
                    </div>
                    <p className="text-sm text-turquoise-dark font-medium font-body mb-1">
                      {business.category}
                    </p>
                    <p className="text-sm text-stone-500 font-body">
                      {business.address}
                    </p>
                    {business.existingUrl && (
                      <p className="text-xs text-stone-400 font-body mt-1 truncate">
                        Current: {business.existingUrl}
                      </p>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-3 flex-shrink-0">
                    {business.issues && (
                      <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-2">
                        {business.issues.slice(0, 2).map((issue, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs bg-stone-100 text-stone-600 rounded-full whitespace-nowrap"
                          >
                            {issue}
                          </span>
                        ))}
                        {business.issues.length > 2 && (
                          <span className="px-2 py-0.5 text-xs bg-stone-100 text-stone-600 rounded-full whitespace-nowrap">
                            +{business.issues.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                    <div className="hidden sm:flex items-center gap-2 text-terracotta font-body text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Design Website</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isScanning && !scanComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12 md:py-16"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-stone-100 flex items-center justify-center">
            <svg className="w-10 h-10 md:w-12 md:h-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="font-display text-lg md:text-xl text-stone-700 mb-2">Ready to Discover</h3>
          <p className="text-stone-500 font-body text-sm md:text-base max-w-md mx-auto px-4">
            Click "Start Scan" to search for Taos businesses that could use a professional website.
          </p>
        </motion.div>
      )}
    </div>
  );
}
