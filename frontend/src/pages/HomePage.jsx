import { useState, useEffect, useCallback } from 'react';
import { getProperties } from '../services/api';
import SearchBar from '../components/SearchBar';
import PropertyList from '../components/PropertyList';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const res = await getProperties(filters);
      setProperties(res.data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-accent-teal rounded-full animate-pulse" />
            <span className="text-xs font-medium text-primary-300">Premium Real Estate Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
            Find Your Dream
            <span className="block gradient-text">Property Today</span>
          </h1>

          <p className="text-dark-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover premium properties across India. Browse curated listings, filter by your preferences, and find the perfect place to call home.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mb-12">
            {[
              { value: '500+', label: 'Properties' },
              { value: '50+', label: 'Cities' },
              { value: '1K+', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-dark-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <SearchBar onSearch={fetchProperties} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">
            {loading ? 'Loading...' : `${properties.length} Properties Found`}
          </h2>
        </div>

        <PropertyList properties={properties} loading={loading} />
      </section>
    </div>
  );
};

export default HomePage;
