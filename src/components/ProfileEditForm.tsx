import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface ProfileEditFormProps {
  user: User;
  onSubmit: (userData: Partial<User>) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ user, onSubmit }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [bio, setBio] = useState(user.bio || '');
  
  useEffect(() => {
    setDisplayName(user.displayName || '');
    setBio(user.bio || '');
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      displayName: displayName.trim(),
      bio: bio.trim()
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h3 className="font-medium text-gray-800 mb-4">Editar Perfil</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
            Nome de Exibição
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your display name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell the world about yourself..."
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:opacity-90 transition-opacity"
          >
            Salvar Perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;