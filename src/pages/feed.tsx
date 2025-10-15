import Layout from '@/components/Layout';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  getAllPosts, 
  createPost, 
  toggleLikePost, 
  Post,
  CreatePostData 
} from '@/services/postService';
import { awardPoints } from '@/services/pointsService';

// Estado para armazenar posts vindos da API

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState<CreatePostData>({
    title: '',
    content: '',
    location: ''
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Carregar posts quando o componente montar
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await getAllPosts();
      setPosts(postsData);
    } catch (err) {
      setError('Erro ao carregar posts');
      console.error('Erro ao carregar posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title || !newPost.content || !newPost.location) return;
    if (!user) {
      setError('Você precisa estar logado para criar posts');
      return;
    }

    try {
      setSubmitting(true);
      const createdPost = await createPost(newPost);
      
      // Adicionar o novo post no topo da lista
      setPosts([createdPost, ...posts]);
      
      // Dar pontos para o usuário por criar um post
      if (user.id) {
        await awardPoints(user.id, 'post', `Post: ${newPost.title}`, 5);
      }
      
      // Limpar formulário
      setNewPost({ title: '', content: '', location: '' });
      setShowCreateForm(false);
      setError('');
    } catch (err) {
      setError('Erro ao criar post. Tente novamente.');
      console.error('Erro ao criar post:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Função para curtir/descurtir post
  const handleLike = async (postId: string) => {
    if (!user) {
      setError('Você precisa estar logado para curtir posts');
      return;
    }

    try {
      const result = await toggleLikePost(postId);
      
      // Atualizar o post na lista
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: result.likesCount, isLiked: result.liked }
          : post
      ));

      // Dar pontos se curtiu (não descurtiu)
      if (result.liked && user.id) {
        await awardPoints(user.id, 'like', 'Curtida em post', 1);
      }
    } catch (err) {
      console.error('Erro ao curtir post:', err);
    }
  };

  // Função para formatar data
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min atrás`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} h atrás`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} dias atrás`;
    }
  };

  return (
    <>
      <Head>
        <title>Feed - PedagoPass</title>
        <meta name="description" content="Compartilhe suas experiências de viagem educacional com outros professores" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-2xl mx-auto px-4">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed de Experiências</h1>
              <p className="text-gray-600">Compartilhe e descubra experiências de viagem de outros educadores</p>
            </div>

            {/* Botão Criar Post */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
              >
                ✨ Compartilhar Nova Experiência
              </button>
            </div>

            {/* Formulário Criar Post */}
            {showCreateForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Compartilhar Experiência</h3>
                <form onSubmit={handleCreatePost}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título da Experiência
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Viagem incrível para Paris!"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    <input
                      type="text"
                      value={newPost.location}
                      onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Paris, França"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conte sua experiência
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Compartilhe detalhes sobre sua viagem educacional..."
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`px-4 py-2 rounded-md transition duration-300 ${
                        submitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Publicando...
                        </div>
                      ) : (
                        'Publicar (+5 pts)'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Carregando posts...</p>
              </div>
            ) : (
              <>
                {/* Timeline de Posts */}
                <div className="space-y-6">
                  {posts.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum post ainda</h3>
                      <p className="text-gray-600">Seja o primeiro a compartilhar uma experiência!</p>
                    </div>
                  ) : (
                    posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Header do Post */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <p className="text-sm text-gray-500">{formatDate(post.createdAt)} • {post.location}</p>
                      </div>
                      <span className="text-blue-600 text-sm font-medium">+5 pontos</span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="px-6 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Imagem */}
                  {post.images && post.images.length > 0 && (
                    <div className="px-6 pb-4">
                      <img 
                        src={post.images[0]} 
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Ações */}
                  <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300"
                      >
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300">
                        <span>🔗</span>
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </div>
                </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* CTA */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Quer compartilhar mais experiências?</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Criar Novo Post
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}