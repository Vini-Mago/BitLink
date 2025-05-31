import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Smartphone, Users, ExternalLink, Shield } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Seção Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Todos os Seus Links em Um Só Lugar
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Crie sua página de links personalizada e compartilhe todos os seus links importantes com seu público em um clique simples.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                Ir para o Painel
              </Link>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Começar
                </Link>
                <Link 
                  to="/login" 
                  className="bg-transparent text-white border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Entrar
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Seção de Funcionalidades */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Tudo o Que Você Precisa
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compatível com Celulares</h3>
              <p className="text-gray-600">Fica ótimo em qualquer dispositivo, do desktop ao celular.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Múltiplos Usuários</h3>
              <p className="text-gray-600">Suporte para múltiplas contas de usuários com perfis únicos.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <ExternalLink className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Links Personalizados</h3>
              <p className="text-gray-600">Adicione, edite e reorganize seus links facilmente.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-pink-100 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Shield className="text-pink-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Seguro</h3>
              <p className="text-gray-600">Seus dados estão sempre privados e seguros.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Pronto para Criar Sua Página de Links?
          </h2>
          <p className="text-gray-600 mb-8">
            Junte-se a milhares de criadores que usam nossa plataforma para compartilhar seu conteúdo com o mundo.
          </p>
          
          {!isAuthenticated && (
            <Link 
              to="/register" 
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md"
            >
              Crie Sua Página
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;