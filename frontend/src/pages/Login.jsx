import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      const { token } = response.data;
      
      // Decode token to get role (simple base64 decode)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      
      login(token, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-4 py-12">
      <div className="bg-[#FFF8E7] rounded-xl shadow-md p-8 w-full max-w-md border border-yellow-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-[#0A1A2F] mb-2 tracking-tight">
            🍬 CraveCraft
          </h1>
          <p className="text-base text-slate-600 font-medium">Welcome back! Login to your account</p>
        </div>
        
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 mb-6">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#0A1A2F] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm text-slate-800 border border-gray-300 rounded-lg focus:border-[#1B998B] focus:ring-2 focus:ring-[#1B998B] outline-none transition-colors bg-white placeholder:text-slate-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#0A1A2F] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm text-slate-800 border border-gray-300 rounded-lg focus:border-[#1B998B] focus:ring-2 focus:ring-[#1B998B] outline-none transition-colors bg-white placeholder:text-slate-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD84D] text-[#0A1A2F] px-5 py-2 text-sm font-semibold rounded-full hover:bg-yellow-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none mt-6"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#1B998B] hover:text-teal-700 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

