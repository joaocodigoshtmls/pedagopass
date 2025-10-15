import React from 'react';
import Link from 'next/link';
import { Community, CommunityTopic } from '../shared/types/community.types';

interface CommunityCardProps {
  community: Community;
}

// Mapa de ícones para cada tópico
const topicIcons: Record<CommunityTopic, string> = {
  [CommunityTopic.PEDAGOGIA]: '👨‍🏫',
  [CommunityTopic.TECNOLOGIA]: '💻',
  [CommunityTopic.INCLUSAO]: '🤝',
  [CommunityTopic.GESTAO]: '📊',
  [CommunityTopic.METODOLOGIAS]: '📚',
  [CommunityTopic.AVALIACAO]: '✅',
  [CommunityTopic.FORMACAO]: '🎓',
  [CommunityTopic.DISCIPLINAS]: '📖',
  [CommunityTopic.INTERCAMBIO]: '🌍',
  [CommunityTopic.PROJETOS]: '🚀',
  [CommunityTopic.OUTROS]: '💡',
};

// Mapa de cores para cada tópico
const topicColors: Record<CommunityTopic, string> = {
  [CommunityTopic.PEDAGOGIA]: 'bg-blue-100 text-blue-700',
  [CommunityTopic.TECNOLOGIA]: 'bg-purple-100 text-purple-700',
  [CommunityTopic.INCLUSAO]: 'bg-green-100 text-green-700',
  [CommunityTopic.GESTAO]: 'bg-orange-100 text-orange-700',
  [CommunityTopic.METODOLOGIAS]: 'bg-pink-100 text-pink-700',
  [CommunityTopic.AVALIACAO]: 'bg-teal-100 text-teal-700',
  [CommunityTopic.FORMACAO]: 'bg-indigo-100 text-indigo-700',
  [CommunityTopic.DISCIPLINAS]: 'bg-yellow-100 text-yellow-700',
  [CommunityTopic.INTERCAMBIO]: 'bg-cyan-100 text-cyan-700',
  [CommunityTopic.PROJETOS]: 'bg-red-100 text-red-700',
  [CommunityTopic.OUTROS]: 'bg-gray-100 text-gray-700',
};

// Formatador de números
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <Link href={`/comunidades/${community.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
        {/* Cover Image */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
          {community.coverImage ? (
            <img
              src={community.coverImage}
              alt={community.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl opacity-80">
              {topicIcons[community.topic]}
            </div>
          )}
          
          {/* Badge de privacidade */}
          {community.isPrivate && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Privada
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Topic Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${topicColors[community.topic]}`}>
              {topicIcons[community.topic]} {community.topic}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {community.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {community.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {/* Members */}
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">{formatNumber(community.membersCount)}</span>
              </div>

              {/* Posts */}
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="font-medium">{formatNumber(community.postsCount)}</span>
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
