import { useState, useEffect } from 'react';
import { getProperties, deleteProperty } from '../services/api';
import AddPropertyForm from '../components/AddPropertyForm';
import PropertyCard from '../components/PropertyCard';

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await getProperties();
      setProperties(res.data.slice(0, 6));
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        fetchProperties(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete property:', err);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Panel</h1>
        <p className="text-dark-200">Manage your property listings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Property Form */}
        <div>
          <AddPropertyForm onPropertyAdded={fetchProperties} />
        </div>

        {/* Recent Listings */}
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-4">Recent Listings</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-24 w-full" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {properties.map((p) => (
                <PropertyCard key={p._id} property={p} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-dark-200">No properties yet. Add one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
