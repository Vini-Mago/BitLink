import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
      <div className="max-w-5xl mx-auto px-4">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart size={16} className="text-red-500" /> in 2025
        </p>
        <p className="mt-1">
        Explore o <strong>Linkly.Bio</strong> — seu novo jeito elegante de organizar e compartilhar todos os seus links favoritos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;