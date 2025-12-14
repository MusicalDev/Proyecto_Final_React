import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const RutaProtegida = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuthContext();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!adminOnly && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
};

export default RutaProtegida;
