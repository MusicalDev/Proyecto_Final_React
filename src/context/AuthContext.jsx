import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfAdmin = async (email) => {
    try {
      console.log('🔍 Verificando si es admin:', email);

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('❌ Error en consulta admin_users:', error.message);
        setIsAdmin(false);
        return false;
      }

      const isAdminResult = !!data;
      console.log('✅ isAdmin resultado:', isAdminResult);
      setIsAdmin(isAdminResult);
      return isAdminResult;
    } catch (error) {
      console.error('❌ Error catch en checkIfAdmin:', error);
      setIsAdmin(false);
      return false;
    }
  };

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        await checkIfAdmin(session.user.email);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error en checkUser:', error);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const adminResult = await checkIfAdmin(email);
      setUser(data.user);

      return { success: true, isAdmin: adminResult };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkUser();
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        checkIfAdmin(session.user.email);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    usuario: user?.email,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
