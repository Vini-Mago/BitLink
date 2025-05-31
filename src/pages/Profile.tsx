import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { findUserByUsername } from '../utils/storage';
import { User } from '../types';
import ProfileHeader from '../components/ProfileHeader';
import LinkButton from '../components/LinkButton';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      const foundUser = findUserByUsername(username);
      setUser(foundUser);
      setLoading(false);
      
      if (!foundUser) {
        setError(`Usuário @${username} não encontrado`);
      }
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-gray-600"
        >
          Carregando perfil...
        </motion.div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
        <p className="text-gray-600 mb-6">O usuário que você procura parece não existir.</p>
        <RouterLink 
          to="/" 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar para a página inicial
        </RouterLink>
      </motion.div>
    );
  }

  // Ordena os links pelo campo order
  const sortedLinks = [...user.links].sort((a, b) => a.order - b.order);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-4"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProfileHeader user={user} />
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          {sortedLinks.length > 0 ? (
            sortedLinks.map((link, index) => (
              <LinkButton key={link.id} link={link} index={index} />
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-gray-500 my-8"
            >
              Este usuário ainda não adicionou nenhum link.
            </motion.p>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <RouterLink 
            to="/" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="mr-1" />
            Voltar para a página inicial
          </RouterLink>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;