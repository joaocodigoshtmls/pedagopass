import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  return (
    <nav className="bg-white text-gray-800 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">
                PedagoPass
                <span className="block text-sm text-gray-500 font-normal">Viagens e formação para professores</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
              <a href="/feed" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Feed</a>
              <a href="/comunidades" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Comunidades</a>
              <a href="/destinos" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Roteiros</a>
              <a href="/professores" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Professores</a>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-50 px-3 py-2 rounded-md transition-all duration-150"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-md py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-600">Logado como:</p>
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    </div>
                    <a
                      href="/perfil"
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 block"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Meu Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <a href="/login" className="px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">Entrar</a>
                <a href="/cadastro" className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Cadastrar</a>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-blue-700 p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-500">
              <a href="/feed" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Feed
              </a>
              <a href="/comunidades" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Comunidades
              </a>
              <a href="/destinos" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Roteiros
              </a>
              {user ? (
                <>
                  <div className="border-t border-blue-500 pt-3 mt-3">
                    <div className="px-3 py-2">
                      <p className="text-sm text-blue-200">Logado como:</p>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-blue-200">{user.email}</p>
                    </div>
                    <a 
                      href="/perfil" 
                      className="block hover:bg-blue-700 px-3 py-2 rounded-md text-sm text-blue-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meu Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-200 hover:bg-blue-700 rounded-md"
                    >
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-blue-500 pt-3 mt-3 space-y-1">
                  <a href="/login" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                    Entrar
                  </a>
                  <a href="/cadastro" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                    Cadastrar
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
