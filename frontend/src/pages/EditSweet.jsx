import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/Navbar';

const EditSweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const response = await axiosClient.get('/sweets');
        const sweet = response.data.find((s) => s.id === parseInt(id));
        if (sweet) {
          setFormData({
            name: sweet.name,
            category: sweet.category,
            price: sweet.price.toString(),
            quantity: sweet.quantity.toString(),
          });
        } else {
          setError('Sweet not found');
        }
      } catch (err) {
        setError('Error fetching sweet: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchSweet();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await axiosClient.put(`/sweets/${id}`, {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      });
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating sweet');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7]">
        <Navbar />
        <div className="max-w-screen-md mx-auto px-6 py-10">
          <div className="text-center py-12">
            <p className="text-[#0A1A2F] text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      
      <div className="max-w-screen-md mx-auto px-6 py-10">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-[#0A1A2F] tracking-tight">Edit Sweet</h1>
          <p className="text-slate-600 mt-1">
            Update sweet details and manage pricing and stock.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-yellow-100 p-8 mt-8">
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 mb-6">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#1B998B] focus:border-[#1B998B] outline-none transition-colors bg-white"
                placeholder="Sweet name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#1B998B] focus:border-[#1B998B] outline-none transition-colors bg-white"
                placeholder="Category"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#1B998B] focus:border-[#1B998B] outline-none transition-colors bg-white"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#1B998B] focus:border-[#1B998B] outline-none transition-colors bg-white"
                placeholder="0"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#FFD84D] text-[#0A1A2F] font-semibold rounded-full px-6 py-3 hover:bg-yellow-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none w-full mt-6"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-[#1B998B] text-white font-semibold rounded-full px-6 py-3 hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSweet;

