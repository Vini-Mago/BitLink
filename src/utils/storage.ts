import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'linktree_users';
const CURRENT_USER_KEY = 'linktree_current_user';

// Get all users from localStorage
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save all users to localStorage
export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get current user ID from localStorage
export const getCurrentUserId = (): string | null => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

// Save current user ID to localStorage
export const saveCurrentUserId = (userId: string | null): void => {
  if (userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userId = getCurrentUserId();
  if (!userId) return null;
  
  const users = getUsers();
  return users.find(user => user.id === userId) || null;
};

// Create a new user
export const createUser = (username: string, email: string, password: string): User => {
  const users = getUsers();
  
  // Check if username or email already exists
  if (users.some(user => user.username === username)) {
    throw new Error('Username already exists');
  }
  
  if (users.some(user => user.email === email)) {
    throw new Error('Email already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    displayName: username,
    bio: '',
    profilePicture: '',
    links: []
  };
  
  // Add to users and save
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

// Update user data
export const updateUserData = (userId: string, userData: Partial<User>): User => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }
  
  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    ...userData
  };
  
  saveUsers(users);
  return users[userIndex];
};

// Validate credentials and return user
export const validateUser = (email: string, password: string): User => {
  // In a real app, you would validate the password hash
  // For this demo, we're just checking if the user exists
  const users = getUsers();
  const user = users.find(user => user.email === email);
  
  if (!user) {
    throw new Error('Email ou senha inválidos');
  }
  
  // Pretend we checked password here
  return user;
};

// Find user by username
export const findUserByUsername = (username: string): User | null => {
  const users = getUsers();
  return users.find(user => user.username === username) || null;
};