import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, loading }) => {
  // Loading skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card overflow-hidden animate-pulse">
            <div className="h-52 bg-dark-500" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-dark-500 rounded-lg w-3/4" />
              <div className="h-4 bg-dark-500 rounded-lg w-1/2" />
              <div className="h-4 bg-dark-500 rounded-lg w-full" />
              <div className="h-4 bg-dark-500 rounded-lg w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 bg-dark-600 rounded-2xl flex items-center justify-center">
          <svg className="w-10 h-10 text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
        <p className="text-dark-200 max-w-md mx-auto">
          Try adjusting your search filters or check back later for new listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <div
          key={property._id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
