import { useState } from 'react';
import { createProperty } from '../services/api';

const Field = ({ id, label, required, type = 'text', placeholder, rows, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-medium text-dark-200 mb-1.5 uppercase tracking-wider">
      {label} {required && '*'}
    </label>
    {rows ? (
      <textarea id={id} name={id} rows={rows} placeholder={placeholder} value={value} onChange={onChange} className="input-field resize-none" />
    ) : (
      <input id={id} name={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        className={`input-field ${error ? 'border-accent-coral/50' : ''}`} />
    )}
    {error && <p className="text-accent-coral text-xs mt-1">{error}</p>}
  </div>
);

const AddPropertyForm = ({ onPropertyAdded }) => {
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', description: '', imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.price || Number(formData.price) <= 0) e.price = 'Valid price is required';
    if (!formData.location.trim()) e.location = 'Location is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createProperty({ ...formData, price: Number(formData.price), imageUrl: formData.imageUrl || undefined });
      showToast('Property listed successfully!');
      setFormData({ title: '', price: '', location: '', description: '', imageUrl: '' });
      setErrors({});
      if (onPropertyAdded) onPropertyAdded();
    } catch (error) {
      const msg = error.response?.data?.error;
      showToast(Array.isArray(msg) ? msg[0] : msg || 'Failed to create property', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  return (
    <div className="relative">
      {toast && (
        <div className={`toast fixed top-20 right-4 z-50 px-5 py-3 rounded-xl shadow-lg font-medium text-sm ${toast.type === 'success' ? 'bg-accent-teal/90 text-white' : 'bg-accent-coral/90 text-white'}`}>
          {toast.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5" id="add-property-form">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-white">List a Property</h2>
          <p className="text-dark-200 text-sm mt-1">Fill in the details to add a new listing</p>
        </div>
        <Field id="title" label="Title" required placeholder="Luxury 3BHK Apartment in Bandra" value={formData.title} onChange={handleChange} error={errors.title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="price" label="Price (₹)" required type="number" placeholder="5000000" value={formData.price} onChange={handleChange} error={errors.price} />
          <Field id="location" label="Location" required placeholder="Mumbai, Maharashtra" value={formData.location} onChange={handleChange} error={errors.location} />
        </div>
        <Field id="description" label="Description" placeholder="Describe the property..." rows={3} value={formData.description} onChange={handleChange} error={errors.description} />
        <Field id="imageUrl" label="Image URL" type="url" placeholder="https://images.unsplash.com/..." value={formData.imageUrl} onChange={handleChange} error={errors.imageUrl} />
        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? 'Creating...' : '+ List Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
