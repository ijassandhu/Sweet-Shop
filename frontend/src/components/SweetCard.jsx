import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const SweetCard = ({ sweet, onUpdate, onDelete }) => {
  const { role } = useAuth();

  const handlePurchase = async () => {
    try {
      await axiosClient.post(`/sweets/${sweet.id}/purchase`);
      onUpdate();
    } catch (error) {
      alert('Error purchasing sweet: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
      return;
    }
    try {
      await axiosClient.delete(`/sweets/${sweet.id}`);
      onDelete();
    } catch (error) {
      alert('Error deleting sweet: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRestock = async () => {
    const amount = prompt('Enter restock amount:');
    if (!amount || isNaN(amount) || amount <= 0) {
      return;
    }
    try {
      await axiosClient.post(`/sweets/${sweet.id}/restock`, { amount: parseInt(amount) });
      onUpdate();
    } catch (error) {
      alert('Error restocking sweet: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-yellow-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
      <div className="flex flex-col h-full">
        <div className="flex-1 mb-4">
          <h3 className="text-xl font-heading font-bold tracking-tight text-[#0A1A2F] mb-1">{sweet.name}</h3>
          <p className="text-xs text-gray-500 mb-3">
            {sweet.category}
          </p>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-lg font-semibold text-[#1B998B]">
              ${sweet.price.toFixed(2)}
            </p>
            <span className={`rounded-full px-3 py-1 ${
              sweet.quantity > 0 
                ? 'bg-[#6EDCCF] text-[#0A1A2F] text-xs font-medium' 
                : 'bg-[#FF6F61] text-white text-xs'
            }`}>
              {sweet.quantity} in stock
            </span>
          </div>
        </div>
        <div className="mt-auto">
          {role !== 'admin' && (
            <button
              onClick={handlePurchase}
              disabled={sweet.quantity === 0}
              className={`w-full rounded-full px-5 py-2 font-semibold mt-4 ${
                sweet.quantity === 0
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-[#FFD84D] text-[#0A1A2F] hover:bg-yellow-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out'
              }`}
            >
              <ShoppingCartIcon className="h-5 w-5 inline-block mr-1" />
              Purchase
            </button>
          )}
          {role === 'admin' && (
            <div className="flex gap-2 mt-3">
              <Link
                to={`/edit/${sweet.id}`}
                className="px-3 py-1.5 text-xs font-semibold bg-[#1B998B] text-white rounded-full hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out text-center"
              >
                <PencilSquareIcon className="h-5 w-5 inline-block mr-1" />
                Edit
              </Link>
              <button
                onClick={handleRestock}
                className="px-3 py-1.5 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                <ArrowPathIcon className="h-5 w-5 inline-block mr-1" />
                Restock
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-xs font-semibold bg-[#FF6F61] text-white rounded-full hover:bg-red-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                <TrashIcon className="h-5 w-5 inline-block mr-1" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;

