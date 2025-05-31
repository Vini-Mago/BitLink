import React, { useState } from 'react';
import { Link } from '../types';
import { 
  Trash2, 
  Edit, 
  ExternalLink, 
  GripVertical, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Github,
  Youtube,
  Mail,
  Music,
  Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkItemProps {
  link: Link;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDraggable?: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({ 
  link, 
  onEdit, 
  onDelete, 
  isDraggable = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIconForUrl = (url: string) => {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('instagram.com')) return <Instagram size={16} className="text-pink-500" />;
    if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return <Twitter size={16} className="text-blue-400" />;
    if (urlLower.includes('facebook.com')) return <Facebook size={16} className="text-blue-600" />;
    if (urlLower.includes('linkedin.com')) return <Linkedin size={16} className="text-blue-700" />;
    if (urlLower.includes('github.com')) return <Github size={16} className="text-gray-800" />;
    if (urlLower.includes('youtube.com')) return <Youtube size={16} className="text-red-600" />;
    if (urlLower.includes('spotify.com') || urlLower.includes('apple.com/music')) return <Music size={16} className="text-green-500" />;
    if (urlLower.includes('mailto:')) return <Mail size={16} className="text-gray-600" />;
    return <Globe size={16} className="text-gray-500" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-3 flex items-center transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isDraggable && (
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="cursor-move text-gray-400 hover:text-gray-600 transition-colors mr-2"
        >
          <GripVertical size={18} />
        </motion.div>
      )}
      
      <div className="flex-1 overflow-hidden">
        <h3 className="font-medium text-gray-800 truncate flex items-center gap-2">
          {getIconForUrl(link.url)}
          {link.title}
        </h3>
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-blue-500 transition-colors truncate flex items-center gap-1"
        >
          <ExternalLink size={14} />
          <span className="truncate">{link.url}</span>
        </a>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex gap-2 ml-2"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              onClick={() => onEdit(link.id)}
              className="p-1.5 text-gray-500 hover:text-blue-500 transition-colors"
              aria-label="Edit link"
            >
              <Edit size={16} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              onClick={() => onDelete(link.id)}
              className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Delete link"
            >
              <Trash2 size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LinkItem;