export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio: string;
  profilePicture: string;
  links: Link[];
}

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  order: number;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addLink: (link: Omit<Link, 'id'>) => void;
  updateLink: (id: string, link: Partial<Omit<Link, 'id'>>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (linkIds: string[]) => void;
}