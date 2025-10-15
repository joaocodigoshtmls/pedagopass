import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  image: string;
  joined: boolean;
}

const trendingCommunities: Community[] = [
  { id: '1', name: 'História Mundial', description: 'Destinos históricos e museus ao redor do mundo', members: 1250, posts: 450, category: 'História', image: '🏛️', joined: false },
  { id: '2', name: 'Ciências Naturais', description: 'Viagens para museus, parques e centros de ciência', members: 980, posts: 320, category: 'Ciências', image: '🔬', joined: false },
  { id: '3', name: 'Arte e Cultura', description: 'Galerias, teatros e experiências artísticas', members: 870, posts: 280, category: 'Arte', image: '🎨', joined: false },
  { id: '4', name: 'Geografia Viva', description: 'Destinos que enriquecem o ensino de geografia', members: 750, posts: 190, category: 'Geografia', image: '🌍', joined: false },
  { id: '5', name: 'Matemática Aplicada', description: 'Locais que demonstram matemática na prática', members: 650, posts: 150, category: 'Matemática', image: '📊', joined: false },
  { id: '6', name: 'Literatura Mundial', description: 'Lugares que inspiraram grandes obras', members: 620, posts: 165, category: 'Literatura', image: '📚', joined: false },
  { id: '7', name: 'Educação Física', description: 'Esportes aventura e atividades ao ar livre', members: 580, posts: 120, category: 'Ed. Física', image: '⚽', joined: false }
];

const suggestedCommunities: Community[] = [
  { id: '8', name: 'Idiomas Mundo', description: 'Imersão linguística e intercâmbio cultural', members: 1100, posts: 380, category: 'Idiomas', image: '🗣️', joined: false },
  { id: '9', name: 'Biologia Marinha', description: 'Exploração de ecossistemas aquáticos', members: 380, posts: 95, category: 'Biologia', image: '🐠', joined: false },
  { id: '10', name: 'Astronomia', description: 'Observação de estrelas e planetários', members: 320, posts: 60, category: 'Física', image: '🌟', joined: false },
  { id: '11', name: 'Culinária Mundial', description: 'Tradições culinárias em diferentes países', members: 290, posts: 110, category: 'Culinária', image: '🍽️', joined: false },
  { id: '12', name: 'Tecnologia Educativa', description: 'Inovações tecnológicas no ensino', members: 450, posts: 140, category: 'Tecnologia', image: '💻', joined: false },
  { id: '13', name: 'Meio Ambiente', description: 'Sustentabilidade e ecoturismo', members: 560, posts: 200, category: 'Ecologia', image: '🌱', joined: false }
];

const myCommunities: Community[] = [
  { id: '2', name: 'Ciências Naturais', description: 'Viagens para museus, parques e centros de ciência', members: 980, posts: 320, category: 'Ciências', image: '🔬', joined: true },
  { id: '4', name: 'Geografia Viva', description: 'Destinos que enriquecem o ensino de geografia', members: 750, posts: 190, category: 'Geografia', image: '🌍', joined: true },
  { id: '7', name: 'Educação Física', description: 'Esportes aventura e atividades ao ar livre', members: 580, posts: 120, category: 'Ed. Física', image: '⚽', joined: true }
];

export default function Comunidades() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [communities, setCommunities] = useState({
    trending: trendingCommunities,
    suggested: suggestedCommunities,
    my: myCommunities
  });

  const handleJoinCommunity = (communityId: string, section: 'trending' | 'suggested' | 'my') => {
    setCommunities(prev => {
      const newState = { ...prev };
      const community = newState[section].find(c => c.id === communityId);
      
      if (community) {
        community.joined = !community.joined;
        community.members += community.joined ? 1 : -1;
        
        // Atualizar "Minhas Comunidades"
        if (community.joined && section !== 'my') {
          newState.my = [...newState.my, community];
        } else if (!community.joined && section === 'my') {
          newState.my = newState.my.filter(c => c.id !== communityId);
        }
      }
      
      return newState;
    });
  };

  const CommunityCard = ({ community, section }: { community: Community; section: 'trending' | 'suggested' | 'my' }) => (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
      onClick={() => setSelectedCommunity(community)}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="text-3xl">{community.image}</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{community.name}</h3>
            <p className="text-gray-600 text-sm">{community.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>👥 {community.members}</span>
          <span>📝 {community.posts}</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleJoinCommunity(community.id, section);
          }}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            community.joined
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {community.joined ? '✓ Participando' : '+ Participar'}
        </button>
      </div>
    </div>
  );

  const CommunityDetails = () => {
    if (!selectedCommunity) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedCommunity.image}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCommunity.name}</h2>
                  <p className="text-gray-600">{selectedCommunity.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCommunity(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedCommunity.members}</div>
                <div className="text-gray-600 text-sm">Membros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{selectedCommunity.posts}</div>
                <div className="text-gray-600 text-sm">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">+15</div>
                <div className="text-gray-600 text-sm">Pontos por participar</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Atividades Recentes</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-900">Prof. Marina Silva</div>
                  <div className="text-gray-600 text-sm">Compartilhou fotos do Museu do Louvre • 2h atrás</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-900">Prof. João Santos</div>
                  <div className="text-gray-600 text-sm">Postou dicas sobre viagem educativa • 5h atrás</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-900">Prof. Ana Costa</div>
                  <div className="text-gray-600 text-sm">Iniciou discussão sobre roteiros • 1 dia atrás</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const section = communities.trending.find(c => c.id === selectedCommunity.id) ? 'trending' :
                              communities.suggested.find(c => c.id === selectedCommunity.id) ? 'suggested' : 'my';
                handleJoinCommunity(selectedCommunity.id, section);
                setSelectedCommunity(null);
              }}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                selectedCommunity.joined
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {selectedCommunity.joined ? 'Sair da Comunidade' : 'Participar da Comunidade (+15 pontos)'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Comunidades - PedagoPass</title>
        <meta name="description" content="Participe de comunidades temáticas de professores viajantes" />
      </Head>

      <Layout>
        <div className="min-h-screen py-8">
          <div className="max-w-6xl mx-auto px-4">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Comunidades</h1>
              <p className="text-gray-600">Conecte-se com outros educadores e compartilhe experiências por interesse</p>
            </div>

            {/* Em Alta */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                🔥 Em Alta
                <span className="ml-2 bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-full">
                  {communities.trending.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {communities.trending.map((community) => (
                  <CommunityCard key={community.id} community={community} section="trending" />
                ))}
              </div>
            </div>

            {/* Sugestões */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                💡 Sugestões
                <span className="ml-2 bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-full">
                  {communities.suggested.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.suggested.map((community) => (
                  <CommunityCard key={community.id} community={community} section="suggested" />
                ))}
              </div>
            </div>

            {/* Minhas Comunidades */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                ⭐ Minhas Comunidades
                <span className="ml-2 bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded-full">
                  {communities.my.length}
                </span>
              </h2>
              {communities.my.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communities.my.map((community) => (
                    <CommunityCard key={community.id} community={community} section="my" />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma comunidade ainda</h3>
                  <p className="text-gray-600">Explore as comunidades acima e comece a participar!</p>
                </div>
              )}
            </div>

          </div>
        </div>

        <CommunityDetails />
      </Layout>
    </>
  );
}