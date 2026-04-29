import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Link
      to={`/property/${property._id}`}
      id={`property-card-${property._id}`}
      className="group glass-card overflow-hidden hover:shadow-card-hover 
                 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 
                     group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-primary-600/90 backdrop-blur-sm text-white text-sm font-bold 
                         px-3 py-1.5 rounded-lg shadow-lg">
            {formatPrice(property.price)}
          </span>
        </div>

        {/* Hover Indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 
                       transition-colors duration-300 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-dark-100 text-sm mb-3">
          <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{property.location}</span>
        </div>

        {/* Description */}
        <p className="text-dark-200 text-sm line-clamp-2 leading-relaxed">
          {property.description || 'A beautiful property waiting for you to explore.'}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-dark-200">
            {new Date(property.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="text-xs text-primary-400 font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
