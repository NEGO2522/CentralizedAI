import { Navigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';

export const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  
  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const withAuth = (Component) => {
  return (props) => (
    <ProtectedRoute>
      <Component {...props} />
    </ProtectedRoute>
  );
};
