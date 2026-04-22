import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pre-configured accounts
const DEFAULT_ACCOUNTS = [
  { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' as const },
  { id: 'user-1', name: 'Regular User', email: 'user@example.com', password: 'password123', role: 'user' as const }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if the mock DB has been initialized, if not initialize it with default accounts
    const existingUsers = localStorage.getItem('nolimits_users_db');
    if (!existingUsers) {
      localStorage.setItem('nolimits_users_db', JSON.stringify(DEFAULT_ACCOUNTS));
    }

    const storedUser = localStorage.getItem('nolimits_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const usersDb = JSON.parse(localStorage.getItem('nolimits_users_db') || '[]');
        const foundUser = usersDb.find((u: any) => u.email === email.toLowerCase() && u.password === password);
        
        if (foundUser) {
            const userObj: User = { id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role };
            setUser(userObj);
            localStorage.setItem('nolimits_user', JSON.stringify(userObj));
            resolve(userObj);
        } else {
            reject(new Error('Invalid email or password.'));
        }
      }, 500);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const existingUsers = JSON.parse(localStorage.getItem('nolimits_users_db') || '[]');
        
        if (existingUsers.some((u: any) => u.email === email.toLowerCase())) {
          return reject(new Error('User with this email already exists'));
        }

        const newUser = { id: Math.random().toString(36).substr(2, 9), name, email: email.toLowerCase(), password, role: 'user' as const };
        existingUsers.push(newUser);
        localStorage.setItem('nolimits_users_db', JSON.stringify(existingUsers));
        
        const userObj: User = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user' };
        setUser(userObj);
        localStorage.setItem('nolimits_user', JSON.stringify(userObj));
        resolve(userObj);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nolimits_user');
  };

  const getAllUsers = (): User[] => {
    try {
      const usersDb = JSON.parse(localStorage.getItem('nolimits_users_db') || '[]');
      return usersDb;
    } catch {
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
