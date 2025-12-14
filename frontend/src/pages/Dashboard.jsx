import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/Navbar';
import SweetCard from '../components/SweetCard';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchParams.name) params.append('name', searchParams.name);
      if (searchParams.category) params.append('category', searchParams.category);
      if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
      if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);

      const url = params.toString() ? `/sweets/search?${params.toString()}` : '/sweets';
      const response = await axiosClient.get(url);
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSweets();
  };

  const handleReset = () => {
    setSearchParams({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    setTimeout(() => {
      fetchSweets();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="relative rounded-xl shadow-sm border border-yellow-100 p-10 md:p-14 mb-10 text-center md:text-left overflow-hidden bg-cover bg-center before:absolute before:inset-0 before:bg-white/70 before:backdrop-blur-sm before:content-[''] animate-fade-in-up" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1920&auto=format&fit=crop)' }}>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-[#0A1A2F]">
              Welcome to CraveCraft
            </h1>
            <p className="text-slate-600 mt-2 md:max-w-xl">
              Handcrafted sweets made with love, tradition, and a sprinkle of magic.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-[#FFD84D] text-[#0A1A2F] px-6 py-2 rounded-full font-semibold text-sm">
                Explore Our Sweets
              </span>
            </div>
          </div>
        </div>

        {/* Why CraveCraft Section */}
        <div className="bg-white rounded-2xl shadow-md border border-yellow-100 p-8 md:p-10 mb-10 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-[#0A1A2F] mb-6">
            Why CraveCraft?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-[#FFF8E7] rounded-xl p-6 border border-yellow-200 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
              <div className="text-4xl mb-2">🍬</div>
              <h3 className="font-semibold text-lg text-[#0A1A2F] mt-3">
                Handcrafted Sweets
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Every sweet is carefully handcrafted to ensure authentic taste and quality.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-[#FFF8E7] rounded-xl p-6 border border-yellow-200 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
              <div className="text-4xl mb-2">🌿</div>
              <h3 className="font-semibold text-lg text-[#0A1A2F] mt-3">
                Fresh Ingredients
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                We use fresh, high-quality ingredients sourced responsibly for the best flavors.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-[#FFF8E7] rounded-xl p-6 border border-yellow-200 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
              <div className="text-4xl mb-2">🧁</div>
              <h3 className="font-semibold text-lg text-[#0A1A2F] mt-3">
                Traditional Recipes
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Our recipes are inspired by timeless traditions and perfected with modern care.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-[#FFF8E7] rounded-xl p-6 border border-yellow-200 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
              <div className="text-4xl mb-2">❤️</div>
              <h3 className="font-semibold text-lg text-[#0A1A2F] mt-3">
                Made with Care
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Hygiene, consistency, and customer satisfaction are always our top priority.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md border border-yellow-100 p-6 mb-10">
          <h2 className="text-lg font-heading font-semibold text-[#0A1A2F] mb-4 tracking-tight">Search Sweets</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Name
              </label>
              <input
                type="text"
                value={searchParams.name}
                onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#1B998B] focus:ring-[#1B998B] outline-none transition-colors bg-white"
                placeholder="Sweet name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Category
              </label>
              <input
                type="text"
                value={searchParams.category}
                onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#1B998B] focus:ring-[#1B998B] outline-none transition-colors bg-white"
                placeholder="Category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Min Price
              </label>
              <input
                type="number"
                step="0.01"
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#1B998B] focus:ring-[#1B998B] outline-none transition-colors bg-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Max Price
              </label>
              <input
                type="number"
                step="0.01"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#1B998B] focus:ring-[#1B998B] outline-none transition-colors bg-white"
                placeholder="100.00"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4 flex space-x-3 mt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-[#FFD84D] text-[#0A1A2F] text-sm font-semibold rounded-full hover:bg-yellow-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-[#1B998B] text-white text-sm font-semibold rounded-full hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* How It Works Section */}
        <div className="bg-[#FFF8E7] rounded-2xl border border-yellow-100 shadow-md p-8 md:p-10 mb-10 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-[#0A1A2F] mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl border border-yellow-200 shadow-sm p-6 text-center relative hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
              <div className="bg-[#FFD84D] text-[#0A1A2F] rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-4">
                1
              </div>
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="font-semibold text-lg text-[#0A1A2F] mt-2">
                Browse Sweets
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xs mx-auto">
                Explore a wide variety of handcrafted sweets available in our shop.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl border border-yellow-200 shadow-sm p-6 text-center relative hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
              <div className="bg-[#FFD84D] text-[#0A1A2F] rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-4">
                2
              </div>
              <div className="text-4xl mb-2">🛒</div>
              <h3 className="font-semibold text-lg text-[#0A1A2F] mt-2">
                Purchase Easily
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xs mx-auto">
                Buy your favorite sweets with a simple and smooth purchasing experience.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl border border-yellow-200 shadow-sm p-6 text-center relative hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
              <div className="bg-[#FFD84D] text-[#0A1A2F] rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-4">
                3
              </div>
              <div className="text-4xl mb-2">🎁</div>
              <h3 className="font-semibold text-lg text-[#0A1A2F] mt-2">
                Freshly Prepared
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xs mx-auto">
                Sweets are freshly prepared and managed to ensure quality and availability.
              </p>
            </div>
          </div>
        </div>

        {/* Sweets Grid Section */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-[#0A1A2F] mb-4 tracking-tight">Available Sweets</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-[#0A1A2F] text-sm">Loading sweets...</p>
            </div>
          ) : sweets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-yellow-100">
              <p className="text-[#0A1A2F] text-sm">No sweets found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sweets.map((sweet) => (
                <SweetCard
                  key={sweet.id}
                  sweet={sweet}
                  onUpdate={fetchSweets}
                  onDelete={fetchSweets}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#0A1A2F] text-white mt-16">
        <div className="max-w-screen-xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Section 1 - Brand */}
            <div>
              <h3 className="text-[#FFD84D] text-2xl font-heading font-extrabold tracking-tight">
                CraveCraft
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-xs">
                Handcrafted sweets made with love, tradition, and care.
              </p>
            </div>

            {/* Section 2 - Quick Info */}
            <div>
              <h4 className="font-semibold text-white mb-2">
                Our Promise
              </h4>
              <ul className="text-slate-300 text-sm leading-relaxed space-y-1">
                <li>• Quality Ingredients</li>
                <li>• Traditional Recipes</li>
                <li>• Fresh Preparation</li>
                <li>• Trusted Taste</li>
              </ul>
            </div>

            {/* Section 3 - Footer Note */}
            <div>
              <p className="text-slate-400 text-sm">
                Crafted with passion for sweet lovers.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 mt-8 pt-4">
            <p className="text-slate-400 text-xs text-center">
              © 2025 CraveCraft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

