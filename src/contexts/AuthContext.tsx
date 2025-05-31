import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Link, AuthContextType } from '../types';
import { 
  getCurrentUser, 
  saveCurrentUserId, 
  createUser, 
  validateUser, 
  updateUserData 
} from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const defaultContext: AuthContextType = {
  currentUser: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
  addLink: () => {},
  updateLink: () => {},
  deleteLink: () => {},
  reorderLinks: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user = validateUser(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      saveCurrentUserId(user.id);
    } catch (error) {
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const user = createUser(username, email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      saveCurrentUserId(user.id);
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    saveCurrentUserId(null);
  };

  const updateUser = (userData: Partial<User>): void => {
    if (!currentUser) return;
    
    const updatedUser = updateUserData(currentUser.id, userData);
    setCurrentUser(updatedUser);
  };

  const addLink = (link: Omit<Link, 'id'>): void => {
    if (!currentUser) return;
    
    const newLink: Link = {
      ...link,
      id: uuidv4()
    };
    
    const updatedLinks = [...currentUser.links, newLink];
    updateUser({ links: updatedLinks });
  };

  const updateLink = (id: string, linkData: Partial<Omit<Link, 'id'>>): void => {
    if (!currentUser) return;
    
    const linkIndex = currentUser.links.findIndex(link => link.id === id);
    if (linkIndex === -1) return;
    
    const updatedLinks = [...currentUser.links];
    updatedLinks[linkIndex] = {
      ...updatedLinks[linkIndex],
      ...linkData
    };
    
    updateUser({ links: updatedLinks });
  };

  const deleteLink = (id: string): void => {
    if (!currentUser) return;
    
    const updatedLinks = currentUser.links.filter(link => link.id !== id);
    updateUser({ links: updatedLinks });
  };

  const reorderLinks = (linkIds: string[]): void => {
    if (!currentUser) return;
    
    const linkMap = new Map(currentUser.links.map(link => [link.id, link]));
    
    const reorderedLinks = linkIds
      .map((id, index) => {
        const link = linkMap.get(id);
        return link ? { ...link, order: index } : null;
      })
      .filter((link): link is Link => link !== null);
    
    updateUser({ links: reorderedLinks });
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};