import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import Head from 'next/head';
import { 
  getMyPoints, 
  UserPoints, 
  getLevelColor, 
  getLevelBgColor, 
  calculateNextLevelPoints 
} from '@/services/pointsService';

function PerfilPage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [pointsLoading, setPointsLoading] = useState(true);
  const [pointsError, setPointsError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const router = useRouter();

  // Função para carregar pontos do usuário
  const loadUserPoints = async () => {
    try {
      setPointsLoading(true);
      const points = await getMyPoints();
      setUserPoints(points);
    } catch (err) {
      console.error('Erro ao carregar pontos:', err);
      setPointsError('Erro ao carregar pontos do usuário');
    } finally {
      setPointsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
      
      // Carregar pontos do usuário
      loadUserPoints();
    }
  }, [user, isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔄 Iniciando salvamento do perfil...');
    console.log('📊 Dados do formulário:', formData);
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Validação de senha
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      console.log('✅ Validações passaram, chamando updateProfile...');
      
      const result = await updateProfile(
        formData.name,
        formData.email,
        formData.currentPassword || undefined,
        formData.newPassword || undefined
      );
      
      console.log('📊 Resultado da atualização:', result);
      
      if (result.success) {
        setSuccess(result.message);
        setIsEditing(false);
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.log('❌ Erro capturado:', err);
      setError('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Meu Perfil - PedagoPass</title>
        <meta name="description" content="Gerencie seu perfil, pontos e atividades no PedagoPass" />
      </Head>
      
      <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-blue-100">{user.email}</p>
                  <p className="text-blue-200 text-sm mt-1">
                    Membro desde {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Sistema de Pontos */}
            <div className="bg-gray-50 px-6 py-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Minha Pontuação PedagoPass</h3>
              
              {pointsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : pointsError ? (
                <div className="text-red-600 text-center py-4">{pointsError}</div>
              ) : userPoints ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Pontos Totais */}
                    <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-1">{userPoints.totalPoints.toLocaleString()}</div>
                      <div className="text-blue-100 text-sm">Pontos Totais</div>
                    </div>

                    {/* Nível */}
                    <div className={`p-4 rounded-lg text-center text-white ${
                      userPoints.level === 'Gold' ? 'bg-yellow-500' :
                      userPoints.level === 'Silver' ? 'bg-gray-500' : 'bg-orange-500'
                    }`}>
                      <div className="text-3xl font-bold mb-1">{userPoints.level === 'Gold' ? 'Ouro' : userPoints.level === 'Silver' ? 'Prata' : 'Bronze'}</div>
                      <div className="text-white/80 text-sm">Nível Atual</div>
                    </div>

                    {/* Próximo Nível */}
                    <div className="bg-purple-600 text-white p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-1">
                        {userPoints.nextLevelPoints > 0 ? userPoints.nextLevelPoints : '✓'}
                      </div>
                      <div className="text-purple-100 text-sm">
                        {userPoints.nextLevelPoints > 0 ? 'Para Próximo Nível' : 'Nível Máximo'}
                      </div>
                    </div>
                  </div>

                  {/* Progresso para próximo nível */}
                  {userPoints.nextLevelPoints > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progresso para próximo nível</span>
                        <span>{Math.round((1 - userPoints.nextLevelPoints / (userPoints.level === 'Bronze' ? 500 : 1000)) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.round((1 - userPoints.nextLevelPoints / (userPoints.level === 'Bronze' ? 500 : 1000)) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}

              {/* Como Ganhar Pontos */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Como Ganhar Pontos:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">📝</span>
                    <span className="text-gray-600">Post: +10 pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">❤️</span>
                    <span className="text-gray-600">Like: +2 pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">💬</span>
                    <span className="text-gray-600">Comentário: +5 pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">👥</span>
                    <span className="text-gray-600">Comunidade: +15 pts</span>
                  </div>
                </div>
              </div>

              {/* Próximo Nível */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progresso para Platina</span>
                  <span className="text-sm text-gray-500">1,250 / 2,000 pts</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '62.5%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Faltam 750 pontos para o próximo nível</p>
              </div>
            </div>

            {/* Atividades Recentes */}
            <div className="px-6 py-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
              
              {pointsLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : userPoints && userPoints.activities.length > 0 ? (
                <div className="space-y-3">
                  {userPoints.activities.slice(0, 5).map((activity) => {
                    const getActivityIcon = (type: string) => {
                      switch (type) {
                        case 'post': return '📝';
                        case 'like': return '❤️';
                        case 'comment': return '💬';
                        case 'community_join': return '�';
                        case 'travel_complete': return '✈️';
                        default: return '🎯';
                      }
                    };

                    const getActivityColor = (type: string) => {
                      switch (type) {
                        case 'post': return 'blue';
                        case 'like': return 'red';
                        case 'comment': return 'purple';
                        case 'community_join': return 'green';
                        case 'travel_complete': return 'yellow';
                        default: return 'gray';
                      }
                    };

                    const formatActivityDate = (dateString: string): string => {
                      const date = new Date(dateString);
                      const now = new Date();
                      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                      
                      if (diffInDays === 0) return 'Hoje';
                      if (diffInDays === 1) return 'Ontem';
                      if (diffInDays < 7) return `Há ${diffInDays} dias`;
                      if (diffInDays < 30) return `Há ${Math.floor(diffInDays / 7)} semanas`;
                      return `Há ${Math.floor(diffInDays / 30)} meses`;
                    };

                    const color = getActivityColor(activity.type);

                    return (
                      <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 bg-${color}-100 rounded-full flex items-center justify-center`}>
                            <span className={`text-${color}-600 text-sm`}>{getActivityIcon(activity.type)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                            <p className="text-xs text-gray-500">{formatActivityDate(activity.createdAt)}</p>
                          </div>
                        </div>
                        <span className={`text-${color}-600 text-sm font-medium`}>+{activity.points} pts</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>Nenhuma atividade registrada ainda.</p>
                  <p className="text-sm">Comece criando posts e participando de comunidades!</p>
                </div>
              )}
            </div>

            {/* Benefícios Disponíveis */}
            <div className="px-6 py-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefícios Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">Desconto 10% Hospedagem</h4>
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">500 pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Desconto em hotéis parceiros</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition duration-300">
                    Resgatar
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">Desconto 15% Passagens</h4>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">800 pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Desconto em voos nacionais</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition duration-300">
                    Resgatar
                  </button>
                </div>

              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-8">
              {error && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Informações do Perfil
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md border">
                          {user.name}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md border">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Editar Perfil
                      </button>
                    </div>
                  </div>

                  {/* Statistics Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Suas Estatísticas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-sm text-gray-600">Viagens Realizadas</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-sm text-gray-600">Destinos Favoritados</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">0</div>
                        <div className="text-sm text-gray-600">Avaliações Feitas</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Editar Perfil
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Change Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Alterar Senha (Opcional)
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Senha Atual
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          disabled={loading}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Nova Senha
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          disabled={loading}
                          minLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                        <p className="mt-1 text-xs text-gray-500">Mínimo de 6 caracteres</p>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmar Nova Senha
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={loading}
                          minLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6 border-t">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        'Salvar Alterações'
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default PerfilPage;
