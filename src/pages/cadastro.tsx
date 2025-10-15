import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar mensagens de erro/sucesso quando usuário começar a digitar
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        setSuccess(result.message);
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erro interno. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading}
                    minLength={6}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">Mínimo de 6 caracteres</p>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cadastrando...
                    </>
                  ) : (
                    'Cadastrar'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Já tem uma conta?{' '}
                    <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                      Faça login
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
