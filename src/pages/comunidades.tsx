import React, { useState } from 'react';import React, { useState } from 'react';

import Head from 'next/head';import Head from 'next/head';

import Layout from '../components/Layout';import Layout from '../components/Layout';

import CommunityCard from '../components/CommunityCard';

import { useCommunities, useCreateCommunity } from '../hooks/useCommunities';interface Community {

import { CommunityTopic, CreateCommunityDTO } from '../shared/types/community.types';  id: string;

  name: string;

export default function Comunidades() {  description: string;

  const [searchTerm, setSearchTerm] = useState('');  members: number;

  const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | ''>('');  posts: number;

  const [showCreateModal, setShowCreateModal] = useState(false);  category: string;

  image: string;

  // Query params  joined: boolean;

  const queryParams = {}

    search: searchTerm || undefined,

    topic: selectedTopic || undefined,const trendingCommunities: Community[] = [

    onlyPublic: true,  { id: '1', name: 'História Mundial', description: 'Destinos históricos e museus ao redor do mundo', members: 1250, posts: 450, category: 'História', image: '🏛️', joined: false },

  };  { id: '2', name: 'Ciências Naturais', description: 'Viagens para museus, parques e centros de ciência', members: 980, posts: 320, category: 'Ciências', image: '🔬', joined: false },

  { id: '3', name: 'Arte e Cultura', description: 'Galerias, teatros e experiências artísticas', members: 870, posts: 280, category: 'Arte', image: '🎨', joined: false },

  const { data: communities = [], isLoading, error } = useCommunities(queryParams);  { id: '4', name: 'Geografia Viva', description: 'Destinos que enriquecem o ensino de geografia', members: 750, posts: 190, category: 'Geografia', image: '🌍', joined: false },

  const createCommunityMutation = useCreateCommunity();  { id: '5', name: 'Matemática Aplicada', description: 'Locais que demonstram matemática na prática', members: 650, posts: 150, category: 'Matemática', image: '📊', joined: false },

  { id: '6', name: 'Literatura Mundial', description: 'Lugares que inspiraram grandes obras', members: 620, posts: 165, category: 'Literatura', image: '📚', joined: false },

  const [newCommunity, setNewCommunity] = useState<CreateCommunityDTO>({  { id: '7', name: 'Educação Física', description: 'Esportes aventura e atividades ao ar livre', members: 580, posts: 120, category: 'Ed. Física', image: '⚽', joined: false }

    name: '',];

    slug: '',

    description: '',const suggestedCommunities: Community[] = [

    topic: CommunityTopic.PEDAGOGIA,  { id: '8', name: 'Idiomas Mundo', description: 'Imersão linguística e intercâmbio cultural', members: 1100, posts: 380, category: 'Idiomas', image: '🗣️', joined: false },

    isPrivate: false,  { id: '9', name: 'Biologia Marinha', description: 'Exploração de ecossistemas aquáticos', members: 380, posts: 95, category: 'Biologia', image: '🐠', joined: false },

    rules: '',  { id: '10', name: 'Astronomia', description: 'Observação de estrelas e planetários', members: 320, posts: 60, category: 'Física', image: '🌟', joined: false },

  });  { id: '11', name: 'Culinária Mundial', description: 'Tradições culinárias em diferentes países', members: 290, posts: 110, category: 'Culinária', image: '🍽️', joined: false },

  { id: '12', name: 'Tecnologia Educativa', description: 'Inovações tecnológicas no ensino', members: 450, posts: 140, category: 'Tecnologia', image: '💻', joined: false },

  const handleCreateCommunity = async (e: React.FormEvent) => {  { id: '13', name: 'Meio Ambiente', description: 'Sustentabilidade e ecoturismo', members: 560, posts: 200, category: 'Ecologia', image: '🌱', joined: false }

    e.preventDefault();];



    try {const myCommunities: Community[] = [

      await createCommunityMutation.mutateAsync(newCommunity);  { id: '2', name: 'Ciências Naturais', description: 'Viagens para museus, parques e centros de ciência', members: 980, posts: 320, category: 'Ciências', image: '🔬', joined: true },

      setShowCreateModal(false);  { id: '4', name: 'Geografia Viva', description: 'Destinos que enriquecem o ensino de geografia', members: 750, posts: 190, category: 'Geografia', image: '🌍', joined: true },

      // Reset form  { id: '7', name: 'Educação Física', description: 'Esportes aventura e atividades ao ar livre', members: 580, posts: 120, category: 'Ed. Física', image: '⚽', joined: true }

      setNewCommunity({];

        name: '',

        slug: '',export default function Comunidades() {

        description: '',  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

        topic: CommunityTopic.PEDAGOGIA,  const [communities, setCommunities] = useState({

        isPrivate: false,    trending: trendingCommunities,

        rules: '',    suggested: suggestedCommunities,

      });    my: myCommunities

    } catch (err) {  });

      console.error('Erro ao criar comunidade:', err);

    }  const handleJoinCommunity = (communityId: string, section: 'trending' | 'suggested' | 'my') => {

  };    setCommunities(prev => {

      const newState = { ...prev };

  const generateSlug = (name: string) => {      const community = newState[section].find(c => c.id === communityId);

    return name      

      .toLowerCase()      if (community) {

      .normalize('NFD')        community.joined = !community.joined;

      .replace(/[\u0300-\u036f]/g, '')        community.members += community.joined ? 1 : -1;

      .replace(/[^a-z0-9]+/g, '-')        

      .replace(/^-+|-+$/g, '');        // Atualizar "Minhas Comunidades"

  };        if (community.joined && section !== 'my') {

          newState.my = [...newState.my, community];

  const handleNameChange = (name: string) => {        } else if (!community.joined && section === 'my') {

    setNewCommunity({          newState.my = newState.my.filter(c => c.id !== communityId);

      ...newCommunity,        }

      name,      }

      slug: generateSlug(name),      

    });      return newState;

  };    });

  };

  return (

    <Layout>  const CommunityCard = ({ community, section }: { community: Community; section: 'trending' | 'suggested' | 'my' }) => (

      <Head>    <div 

        <title>Comunidades - PedagoPass</title>      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"

        <meta name="description" content="Encontre e participe de comunidades educacionais" />      onClick={() => setSelectedCommunity(community)}

      </Head>    >

      <div className="p-4">

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">        <div className="flex items-center space-x-3 mb-3">

        <div className="container mx-auto px-4 max-w-7xl">          <div className="text-3xl">{community.image}</div>

          {/* Header */}          <div className="flex-1">

          <div className="mb-8">            <h3 className="font-bold text-gray-900 text-lg">{community.name}</h3>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">            <p className="text-gray-600 text-sm">{community.description}</p>

              Comunidades Educacionais          </div>

            </h1>        </div>

            <p className="text-gray-600 text-lg">        

              Conecte-se com educadores e compartilhe conhecimento        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">

            </p>          <span>👥 {community.members}</span>

          </div>          <span>📝 {community.posts}</span>

        </div>

          {/* Search and Filters */}        

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">        <button

            <div className="flex flex-col md:flex-row gap-4">          onClick={(e) => {

              {/* Search */}            e.stopPropagation();

              <div className="flex-1">            handleJoinCommunity(community.id, section);

                <div className="relative">          }}

                  <input          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${

                    type="text"            community.joined

                    placeholder="Buscar comunidades..."              ? 'bg-green-100 text-green-700 hover:bg-green-200'

                    value={searchTerm}              : 'bg-blue-600 text-white hover:bg-blue-700'

                    onChange={(e) => setSearchTerm(e.target.value)}          }`}

                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"        >

                  />          {community.joined ? '✓ Participando' : '+ Participar'}

                  <svg        </button>

                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"      </div>

                    fill="none"    </div>

                    stroke="currentColor"  );

                    viewBox="0 0 24 24"

                  >  const CommunityDetails = () => {

                    <path    if (!selectedCommunity) return null;

                      strokeLinecap="round"

                      strokeLinejoin="round"    return (

                      strokeWidth={2}      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">

                    />          <div className="p-6">

                  </svg>            <div className="flex items-center justify-between mb-6">

                </div>              <div className="flex items-center space-x-4">

              </div>                <div className="text-4xl">{selectedCommunity.image}</div>

                <div>

              {/* Topic Filter */}                  <h2 className="text-2xl font-bold text-gray-900">{selectedCommunity.name}</h2>

              <div className="md:w-64">                  <p className="text-gray-600">{selectedCommunity.description}</p>

                <select                </div>

                  value={selectedTopic}              </div>

                  onChange={(e) => setSelectedTopic(e.target.value as CommunityTopic | '')}              <button

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"                onClick={() => setSelectedCommunity(null)}

                >                className="text-gray-500 hover:text-gray-700 text-2xl"

                  <option value="">Todos os Tópicos</option>              >

                  {Object.values(CommunityTopic).map((topic) => (                ×

                    <option key={topic} value={topic}>              </button>

                      {topic}            </div>

                    </option>

                  ))}            <div className="grid grid-cols-3 gap-4 mb-6">

                </select>              <div className="text-center">

              </div>                <div className="text-2xl font-bold text-blue-600">{selectedCommunity.members}</div>

                <div className="text-gray-600 text-sm">Membros</div>

              {/* Create Button */}              </div>

              <button              <div className="text-center">

                onClick={() => setShowCreateModal(true)}                <div className="text-2xl font-bold text-green-600">{selectedCommunity.posts}</div>

                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"                <div className="text-gray-600 text-sm">Posts</div>

              >              </div>

                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <div className="text-center">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />                <div className="text-2xl font-bold text-purple-600">+15</div>

                </svg>                <div className="text-gray-600 text-sm">Pontos por participar</div>

                Criar Comunidade              </div>

              </button>            </div>

            </div>

          </div>            <div className="mb-6">

              <h3 className="font-bold text-gray-900 mb-3">Atividades Recentes</h3>

          {/* Loading State */}              <div className="space-y-3">

          {isLoading && (                <div className="bg-gray-50 p-3 rounded-lg">

            <div className="text-center py-12">                  <div className="font-medium text-gray-900">Prof. Marina Silva</div>

              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>                  <div className="text-gray-600 text-sm">Compartilhou fotos do Museu do Louvre • 2h atrás</div>

              <p className="mt-4 text-gray-600">Carregando comunidades...</p>                </div>

            </div>                <div className="bg-gray-50 p-3 rounded-lg">

          )}                  <div className="font-medium text-gray-900">Prof. João Santos</div>

                  <div className="text-gray-600 text-sm">Postou dicas sobre viagem educativa • 5h atrás</div>

          {/* Error State */}                </div>

          {error && (                <div className="bg-gray-50 p-3 rounded-lg">

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">                  <div className="font-medium text-gray-900">Prof. Ana Costa</div>

              <p className="text-red-800 font-semibold mb-2">Erro ao carregar comunidades</p>                  <div className="text-gray-600 text-sm">Iniciou discussão sobre roteiros • 1 dia atrás</div>

              <p className="text-red-600 text-sm">{error.message}</p>                </div>

            </div>              </div>

          )}            </div>



          {/* Communities Grid */}            <button

          {!isLoading && !error && (              onClick={() => {

            <>                const section = communities.trending.find(c => c.id === selectedCommunity.id) ? 'trending' :

              {communities.length === 0 ? (                              communities.suggested.find(c => c.id === selectedCommunity.id) ? 'suggested' : 'my';

                <div className="text-center py-12 bg-white rounded-xl shadow-md">                handleJoinCommunity(selectedCommunity.id, section);

                  <svg                setSelectedCommunity(null);

                    className="mx-auto h-16 w-16 text-gray-400 mb-4"              }}

                    fill="none"              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${

                    stroke="currentColor"                selectedCommunity.joined

                    viewBox="0 0 24 24"                  ? 'bg-red-100 text-red-700 hover:bg-red-200'

                  >                  : 'bg-blue-600 text-white hover:bg-blue-700'

                    <path              }`}

                      strokeLinecap="round"            >

                      strokeLinejoin="round"              {selectedCommunity.joined ? 'Sair da Comunidade' : 'Participar da Comunidade (+15 pontos)'}

                      strokeWidth={2}            </button>

                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"          </div>

                    />        </div>

                  </svg>      </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">    );

                    Nenhuma comunidade encontrada  };

                  </h3>

                  <p className="text-gray-600 mb-4">  return (

                    Tente ajustar seus filtros ou crie uma nova comunidade    <>

                  </p>      <Head>

                </div>        <title>Comunidades - PedagoPass</title>

              ) : (        <meta name="description" content="Participe de comunidades temáticas de professores viajantes" />

                <>      </Head>

                  <div className="mb-4 text-gray-600">

                    Mostrando {communities.length} {communities.length === 1 ? 'comunidade' : 'comunidades'}      <Layout>

                  </div>        <div className="min-h-screen py-8">

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">          <div className="max-w-6xl mx-auto px-4">

                    {communities.map((community) => (            

                      <CommunityCard key={community.id} community={community} />            {/* Header */}

                    ))}            <div className="mb-8">

                  </div>              <h1 className="text-3xl font-bold text-gray-900 mb-2">Comunidades</h1>

                </>              <p className="text-gray-600">Conecte-se com outros educadores e compartilhe experiências por interesse</p>

              )}            </div>

            </>

          )}            {/* Em Alta */}

        </div>            <div className="mb-8">

      </div>              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">

                🔥 Em Alta

      {/* Create Community Modal */}                <span className="ml-2 bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-full">

      {showCreateModal && (                  {communities.trending.length}

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">                </span>

          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">              </h2>

            {/* Header */}              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">                {communities.trending.map((community) => (

              <h2 className="text-2xl font-bold text-gray-900">Criar Nova Comunidade</h2>                  <CommunityCard key={community.id} community={community} section="trending" />

              <button                ))}

                onClick={() => setShowCreateModal(false)}              </div>

                className="text-gray-400 hover:text-gray-600 transition-colors"            </div>

              >

                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">            {/* Sugestões */}

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />            <div className="mb-8">

                </svg>              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">

              </button>                💡 Sugestões

            </div>                <span className="ml-2 bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-full">

                  {communities.suggested.length}

            {/* Form */}                </span>

            <form onSubmit={handleCreateCommunity} className="p-6 space-y-5">              </h2>

              {/* Name */}              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div>                {communities.suggested.map((community) => (

                <label className="block text-sm font-semibold text-gray-700 mb-2">                  <CommunityCard key={community.id} community={community} section="suggested" />

                  Nome da Comunidade *                ))}

                </label>              </div>

                <input            </div>

                  type="text"

                  required            {/* Minhas Comunidades */}

                  value={newCommunity.name}            <div className="mb-8">

                  onChange={(e) => handleNameChange(e.target.value)}              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"                ⭐ Minhas Comunidades

                  placeholder="Ex: Professores de Matemática"                <span className="ml-2 bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded-full">

                />                  {communities.my.length}

              </div>                </span>

              </h2>

              {/* Slug (auto-generated) */}              {communities.my.length > 0 ? (

              <div>                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">                  {communities.my.map((community) => (

                  URL da Comunidade                    <CommunityCard key={community.id} community={community} section="my" />

                </label>                  ))}

                <div className="flex items-center gap-2">                </div>

                  <span className="text-gray-500 text-sm">pedagopass.com/comunidades/</span>              ) : (

                  <input                <div className="bg-white rounded-lg shadow-md p-8 text-center">

                    type="text"                  <div className="text-4xl mb-4">🎯</div>

                    value={newCommunity.slug}                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma comunidade ainda</h3>

                    onChange={(e) => setNewCommunity({ ...newCommunity, slug: e.target.value })}                  <p className="text-gray-600">Explore as comunidades acima e comece a participar!</p>

                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"                </div>

                    placeholder="professores-de-matematica"              )}

                  />            </div>

                </div>

              </div>          </div>

        </div>

              {/* Description */}

              <div>        <CommunityDetails />

                <label className="block text-sm font-semibold text-gray-700 mb-2">      </Layout>

                  Descrição *    </>

                </label>  );

                <textarea}
                  required
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Descreva o propósito da comunidade..."
                />
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tópico *
                </label>
                <select
                  required
                  value={newCommunity.topic}
                  onChange={(e) => setNewCommunity({ ...newCommunity, topic: e.target.value as CommunityTopic })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.values(CommunityTopic).map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rules */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Regras (opcional)
                </label>
                <textarea
                  value={newCommunity.rules || ''}
                  onChange={(e) => setNewCommunity({ ...newCommunity, rules: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Regras e diretrizes da comunidade..."
                />
              </div>

              {/* Private Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={newCommunity.isPrivate}
                  onChange={(e) => setNewCommunity({ ...newCommunity, isPrivate: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isPrivate" className="text-sm text-gray-700">
                  Comunidade Privada (requer aprovação para entrar)
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createCommunityMutation.isPending}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {createCommunityMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Criando...
                    </>
                  ) : (
                    'Criar Comunidade'
                  )}
                </button>
              </div>

              {/* Error Message */}
              {createCommunityMutation.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">
                    {createCommunityMutation.error.message}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
