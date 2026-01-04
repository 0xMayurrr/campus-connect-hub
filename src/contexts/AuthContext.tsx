import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  department?: string;
  rollNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo - will be replaced with real auth
const mockUsers: Record<string, User> = {
  'student@campus.edu': {
    id: '1',
    email: 'student@campus.edu',
    name: 'John Student',
    role: 'student',
    department: 'Computer Science',
    rollNumber: 'CS2024001',
    createdAt: new Date(),
  },
  'staff@campus.edu': {
    id: '2',
    email: 'staff@campus.edu',
    name: 'Prof. Smith',
    role: 'teaching_staff',
    department: 'Computer Science',
    createdAt: new Date(),
  },
  'admin@campus.edu': {
    id: '3',
    email: 'admin@campus.edu',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('campus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo, create or get user
    const mockUser = mockUsers[email] || {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
      role,
      createdAt: new Date(),
    };

    setUser(mockUser);
    localStorage.setItem('campus_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      role: data.role,
      department: data.department,
      rollNumber: data.rollNumber,
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('campus_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campus_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
