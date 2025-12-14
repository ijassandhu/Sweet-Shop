import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;

