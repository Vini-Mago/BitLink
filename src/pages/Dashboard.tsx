import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, Plus } from 'lucide-react';

import ProfileHeader from '../components/ProfileHeader';
import ProfileEditForm from '../components/ProfileEditForm';
import LinkItem from '../components/LinkItem';
import LinkForm from '../components/LinkForm';
import { Link as LinkType } from '../types';

const Dashboard: React.FC = () => {
  const { currentUser, updateUser, addLink, updateLink, deleteLink } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkType | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  useEffect(() => {
    if (currentUser) {
      setPreviewUrl(`/${currentUser.username}`);
    }
  }, [currentUser]);
  
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50">
        <p className="text-gray-600">Carregando painel...</p>
      </div>
    );
  }
  
  const handleProfileUpdate = (userData: Partial<typeof currentUser>) => {
    updateUser(userData);
  };
  
  const handleProfileImageChange = (file: File) => {
    // In a real app, we would upload this to a server
    // For this demo, we'll use a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser({ profilePicture: reader.result as string });
    };
    reader.readAsDataURL(file);
  };
  
  const handleAddLink = (link: Omit<LinkType, 'id'>) => {
    addLink({
      ...link,
      order: currentUser.links.length
    });
    setShowAddForm(false);
  };
  
  const handleUpdateLink = (link: Omit<LinkType, 'id'>) => {
    if (editingLink) {
      updateLink(editingLink.id, link);
      setEditingLink(null);
    }
  };
  
  const handleEditLink = (id: string) => {
    const link = currentUser.links.find(link => link.id === id);
    if (link) {
      setEditingLink(link);
      setShowAddForm(false);
    }
  };
  
  const handleDeleteLink = (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este link?')) {
      deleteLink(id);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingLink(null);
    setShowAddForm(false);
  };
  
  // Sort links by order
  const sortedLinks = [...currentUser.links].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Left column - Profile preview */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Prévia do perfil</h2>
            
            <div className="pt-4 border-t border-gray-100">
              <ProfileHeader user={currentUser} />
              
              <div className="mb-4">
                {sortedLinks.length > 0 ? (
                  sortedLinks.map(link => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg shadow-sm border border-gray-200 mb-3 transition-all duration-200 hover:shadow transform hover:-translate-y-1 flex items-center justify-between"
                    >
                      <span>{link.title}</span>
                      <Eye size={16} className="text-gray-500" />
                    </a>
                  ))
                ) : (
                  <p className="text-center text-gray-500 my-8">
                    Links em breve!
                  </p>
                )}
              </div>
              
              <div className="text-center">
                <Link
                  to={previewUrl}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Visitar perfil público
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right column - Edit profile and links */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Meu Perfil</h2>
              
              <ProfileHeader 
                user={currentUser} 
                isEditable 
                onImageChange={handleProfileImageChange} 
              />
              
              <ProfileEditForm 
                user={currentUser}
                onSubmit={handleProfileUpdate}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Your Links</h2>
                
                {!showAddForm && !editingLink && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 py-1.5 px-3 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Plus size={16} />
                    Adicionar Link
                  </button>
                )}
              </div>
              
              {showAddForm && (
                <LinkForm 
                  onSubmit={handleAddLink}
                  onCancel={handleCancelEdit}
                />
              )}
              
              {editingLink && (
                <LinkForm 
                  link={editingLink}
                  onSubmit={handleUpdateLink}
                  onCancel={handleCancelEdit}
                />
              )}
              
              <div className="pt-2">
                {sortedLinks.length > 0 ? (
                  sortedLinks.map(link => (
                    <LinkItem
                      key={link.id}
                      link={link}
                      onEdit={handleEditLink}
                      onDelete={handleDeleteLink}
                      isDraggable
                    />
                  ))
                ) : (
                  <div className="text-center py-8 border-t border-gray-100">
                    <p className="text-gray-500 mb-4">Você ainda não adicionou nenhum link</p>
                    
                    {!showAddForm && (
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-1 mx-auto bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <Plus size={16} />
                        Adicione seu primeiro link
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;