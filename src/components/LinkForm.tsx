import React, { useState, useEffect } from 'react';
import { Link } from '../types';
import { X } from 'lucide-react';

interface LinkFormProps {
  link?: Link;
  onSubmit: (link: Omit<Link, 'id'>) => void;
  onCancel: () => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ link, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({ title: '', url: '' });

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url);
    }
  }, [link]);

  const validateForm = (): boolean => {
    const newErrors = { title: '', url: '' };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!url.trim()) {
      newErrors.url = 'URL is required';
      isValid = false;
    } else {
      try {
        // Check if URL is valid
        new URL(url);
      } catch {
        newErrors.url = 'Please enter a valid URL (including http:// or https://)';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: title.trim(),
        url: url.trim(),
        order: link?.order || 0
      });
      
      // Reset form if it's a new link
      if (!link) {
        setTitle('');
        setUrl('');
      }
    }
  };

  // Auto add https:// if not present
  const handleUrlChange = (value: string) => {
    if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
      setUrl(`https://${value}`);
    } else {
      setUrl(value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">
          {link ? 'Edit Link' : 'Add New Link'}
        </h3>
        <button 
          onClick={onCancel} 
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter link title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com"
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-500">{errors.url}</p>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:opacity-90 transition-opacity"
          >
            {link ? 'Update' : 'Add'} Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;