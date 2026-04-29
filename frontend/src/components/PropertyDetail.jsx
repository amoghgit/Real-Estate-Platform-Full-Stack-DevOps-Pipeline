import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyById } from '../services/api';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id);
        setProperty(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Property not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <div className="skeleton h-8 w-32 mb-6" />
        <div className="skeleton h-80 w-full mb-6" />
        <div className="skeleton h-10 w-3/4 mb-4" />
        <div className="skeleton h-6 w-1/2 mb-4" />
        <div className="skeleton h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
        <div className="glass-card p-12">
          <h2 className="text-2xl font-bold text-white mb-3">Property Not Found</h2>
          <p className="text-dark-200 mb-6">{error}</p>
          <Link to="/" className="btn-primary">← Back to Listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-2 text-dark-200 hover:text-primary-400 transition-colors mb-6 text-sm font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Listings
      </Link>

      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-8">
        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary-600/90 backdrop-blur-sm text-white text-lg font-bold px-4 py-2 rounded-xl">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Details Card */}
      <div className="glass-card p-6 sm:p-8">
        <h1 className="text-3xl font-display font-bold text-white mb-3">{property.title}</h1>
        <div className="flex items-center gap-2 text-primary-400 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-lg">{property.location}</span>
        </div>
        <div className="border-t border-white/5 pt-6">
          <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
          <p className="text-dark-100 leading-relaxed whitespace-pre-line">
            {property.description || 'No description available for this property.'}
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 text-xs text-dark-300">
          Listed on {new Date(property.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
