import React from 'react';
import { User } from '../types';
import { Camera } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  isEditable?: boolean;
  onImageChange?: (file: File) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user, 
  isEditable = false,
  onImageChange 
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageChange) {
      onImageChange(e.target.files[0]);
    }
  };

  const defaultProfilePic = "https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const profileImage = user.profilePicture || defaultProfilePic;

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img 
            src={profileImage} 
            alt={`${user.displayName || user.username}'s profile`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {isEditable && (
          <label className="absolute bottom-0 right-0 bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer shadow-sm transition-colors">
            <Camera size={16} className="text-gray-700" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange} 
            />
          </label>
        )}
      </div>
      
      <h1 className="text-xl font-bold text-gray-900 mb-1">
        {user.displayName || user.username}
      </h1>
      
      {user.bio && (
        <p className="text-gray-600 text-center max-w-md mb-2">
          {user.bio}
        </p>
      )}
      
      {!isEditable && (
        <p className="text-sm text-gray-500">
          @{user.username}
        </p>
      )}
    </div>
  );
};

export default ProfileHeader;