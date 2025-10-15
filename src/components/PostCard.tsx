/**
 * Componente PostCard - Exibe um post individual
 */
import { Post } from '../shared/types';
import { useState } from 'react';
import { useToggleLike, useDeletePost } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';

interface PostCardProps {
  post: Post;
  onCommentClick?: () => void;
}

export default function PostCard({ post, onCommentClick }: PostCardProps) {
  const { user } = useAuth();
  const toggleLike = useToggleLike();
  const deletePost = useDeletePost();
  const [showActions, setShowActions] = useState(false);

  const isAuthor = user?.id === post.authorId;

  const handleLike = () => {
    toggleLike.mutate(post.id);
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      deletePost.mutate(post.id);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Agora há pouco';
    if (diffInHours < 24) return `Há ${diffInHours}h`;
    if (diffInDays < 7) return `Há ${diffInDays}d`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      {/* Cabeçalho do Post */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {post.author?.name?.charAt(0) || 'U'}
          </div>
          
          {/* Informações do Autor */}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">
                {post.author?.name || 'Usuário'}
              </h3>
              {post.author?.verified && (
                <span className="text-blue-500" title="Verificado">✓</span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {post.author?.school && <span>{post.author.school} • </span>}
              {post.author?.subject && <span>{post.author.subject} • </span>}
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Menu de Ações */}
        {isAuthor && (
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              ⋯
            </button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  🗑️ Deletar Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conteúdo do Post */}
      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Mídia (imagens/vídeos) */}
      {post.media && post.media.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {post.media.map((media) => (
            <div key={media.id} className="relative rounded-lg overflow-hidden">
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt="Post media"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  className="w-full h-48 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Estatísticas e Ações */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{post.likesCount} curtidas</span>
          <span>{post.commentsCount} comentários</span>
        </div>

        <div className="flex items-center justify-around border-t pt-3">
          {/* Botão Curtir */}
          <button
            onClick={handleLike}
            disabled={toggleLike.isPending}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              toggleLike.isPending
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <span className="text-xl">👍</span>
            <span className="font-medium">Curtir</span>
          </button>

          {/* Botão Comentar */}
          <button
            onClick={onCommentClick}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
          >
            <span className="text-xl">💬</span>
            <span className="font-medium">Comentar</span>
          </button>

          {/* Botão Compartilhar */}
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + '/feed#' + post.id);
              alert('Link copiado!');
            }}
          >
            <span className="text-xl">🔗</span>
            <span className="font-medium">Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
