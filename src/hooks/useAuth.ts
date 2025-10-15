import { useState, useEffect } from 'react';
import userService from '@/services/userService';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await userService.login({ email, password });
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (name: string, email: string, password: string) => {
    const result = await userService.register({ name, email, password });
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  const updateProfile = async (name: string, email: string, currentPassword?: string, newPassword?: string) => {
    const result = await userService.updateProfile({ 
      name, 
      email, 
      currentPassword, 
      newPassword 
    });
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };
};
