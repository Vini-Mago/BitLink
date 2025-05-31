import React from 'react';
import { Link } from '../types';
import { 
  ExternalLink, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Github,
  Youtube,
  Mail,
  Music
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LinkButtonProps {
  link: Link;
  index: number;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, index }) => {
  const getIconForUrl = (url: string) => {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('instagram.com')) return <Instagram size={18} className="text-pink-500" />;
    if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return <Twitter size={18} className="text-blue-400" />;
    if (urlLower.includes('facebook.com')) return <Facebook size={18} className="text-blue-600" />;
    if (urlLower.includes('linkedin.com')) return <Linkedin size={18} className="text-blue-700" />;
    if (urlLower.includes('github.com')) return <Github size={18} className="text-gray-800" />;
    if (urlLower.includes('youtube.com')) return <Youtube size={18} className="text-red-600" />;
    if (urlLower.includes('spotify.com') || urlLower.includes('apple.com/music')) return <Music size={18} className="text-green-500" />;
    if (urlLower.includes('mailto:')) return <Mail size={18} className="text-gray-600" />;
    return <Globe size={18} className="text-gray-500" />;
  };

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg shadow-sm border border-gray-200 mb-3 transition-all duration-200 hover:shadow transform hover:-translate-y-1 flex items-center gap-3"
    >
      {getIconForUrl(link.url)}
      <span className="flex-1">{link.title}</span>
      <ExternalLink size={16} className="text-gray-500" />
    </motion.a>
  );
};

export default LinkButton;