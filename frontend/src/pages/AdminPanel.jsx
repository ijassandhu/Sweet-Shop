import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/Navbar';
import { PlusIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/sweets');
      setSweets(response.data);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      alert('Error fetching sweets: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axiosClient.post('/sweets', formData);
      setSuccess('Sweet added successfully!');
      setFormData({
        name: '',
        category: '',
        price: '',
        quantity: '',
      });
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding sweet');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (sweetId, sweetName) => {
    if (!window.confirm(`Are you sure you want to delete ${sweetName}?`)) {
      return;
    }
    try {
      await axiosClient.delete(`/sweets/${sweetId}`);
      fetchSweets();
    } catch (error) {
      alert('Error deleting sweet: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRestock = async (sweetId) => {
    const amount = prompt('Enter restock amount:');
    if (!amount || isNaN(amount) || amount <= 0) {
      return;
    }
    try {
      await axiosClient.post(`/sweets/${sweetId}/restock`, { amount: parseInt(amount) });
      fetchSweets();
    } catch (error) {
      alert('Error restocking sweet: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      
      <div className="max-w-screen-xl mx-auto px-6 py-10 space-y-10">
        {/* Admin Header */}
        <div>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight text-[#0A1A2F]">
            CraveCraft Admin Panel
          </h1>
          <p className="text-slate-600 mt-1">
            Manage sweets, update stock, and keep the shop running smoothly.
          </p>
        </div>

        {/* Add New Sweet Form */}
        <div className="bg-white rounded-2xl border border-yellow-100 shadow-md p-8">
          <h2 className="text-xl font-heading font-semibold text-[#0A1A2F] mb-4">Add New Sweet</h2>
          
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 mb-4">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}
          
          {success && (
            <div className="bg-[#6EDCCF] bg-opacity-20 border border-[#1B998B] text-[#1B998B] text-sm px-4 py-3 rounded-lg mb-4">
              {success}
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
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-[#FFD84D] text-[#0A1A2F] font-semibold rounded-full px-5 py-2 hover:bg-yellow-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out mt-4"
              >
                <PlusIcon className="h-5 w-5 inline-block mr-1" />
                Add Sweet
              </button>
            </div>
          </form>
        </div>

        {/* Sweets Management List */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-[#0A1A2F] mb-4 tracking-tight">Manage Sweets</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-[#0A1A2F] text-sm">Loading sweets...</p>
            </div>
          ) : sweets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-yellow-100">
              <p className="text-[#0A1A2F] text-sm">No sweets found. Add your first sweet above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sweets.map((sweet) => (
                <div key={sweet.id} className="bg-white rounded-2xl border border-yellow-100 shadow-md p-5 space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
                  <h3 className="text-lg font-heading font-bold text-[#0A1A2F]">{sweet.name}</h3>
                  <p className="text-slate-600 text-sm">{sweet.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600 text-sm">${sweet.price.toFixed(2)}</p>
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      sweet.quantity > 0 
                        ? 'bg-[#6EDCCF] text-[#0A1A2F]' 
                        : 'bg-[#FF6F61] text-white'
                    }`}>
                      {sweet.quantity} in stock
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/edit/${sweet.id}`}
                      className="bg-[#1B998B] text-white rounded-full px-4 py-1 text-sm hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out text-center"
                    >
                      <PencilSquareIcon className="h-5 w-5 inline-block mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleRestock(sweet.id)}
                      className="bg-[#FFD84D] text-[#0A1A2F] rounded-full px-4 py-1 text-sm hover:bg-yellow-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
                    >
                      <ArrowPathIcon className="h-5 w-5 inline-block mr-1" />
                      Restock
                    </button>
                    <button
                      onClick={() => handleDelete(sweet.id, sweet.name)}
                      className="bg-[#FF6F61] text-white rounded-full px-4 py-1 text-sm hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
                    >
                      <TrashIcon className="h-5 w-5 inline-block mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

