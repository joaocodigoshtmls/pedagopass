import Layout from '@/components/Layout';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useInfinitePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';
import { useInView } from 'react-intersection-observer';

export default function Feed() {
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfinitePosts({ sortBy, tag: selectedTag });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <Layout>
      <Head>
        <title>Feed - PedagoPass</title>
        <meta name='description' content='Feed de posts da comunidade PedagoPass' />
      </Head>

      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto py-8 px-4'>
          <div className='mb-6'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Feed da Comunidade
            </h1>
            <p className='text-gray-600'>
              Compartilhe suas experiências de viagem educacional!
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-4 mb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <label className='text-sm font-medium text-gray-700'>
                  Ordenar por:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                  className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='recent'>Mais recentes</option>
                  <option value='popular'>Mais populares</option>
                </select>
              </div>

              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(undefined)}
                  className='px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors'
                >
                  Limpar filtro: #{selectedTag} ×
                </button>
              )}
            </div>
          </div>

          <CreatePostForm />

          {isLoading && (
            <div className='text-center py-12'>
              <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
              <p className='mt-4 text-gray-600'>Carregando posts...</p>
            </div>
          )}

          {isError && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-center'>
              <p className='text-red-600'>
                Erro ao carregar posts. Tente novamente mais tarde.
              </p>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {allPosts.length === 0 ? (
                <div className='bg-white rounded-lg shadow-md p-12 text-center'>
                  <p className='text-gray-600 text-lg'>
                    Nenhum post encontrado. Seja o primeiro a compartilhar!
                  </p>
                </div>
              ) : (
                <div className='space-y-6'>
                  {allPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {hasNextPage && (
                <div ref={ref} className='py-8 text-center'>
                  {isFetchingNextPage ? (
                    <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                  ) : (
                    <p className='text-gray-500'>Role para carregar mais...</p>
                  )}
                </div>
              )}

              {!hasNextPage && allPosts.length > 0 && (
                <div className='py-8 text-center text-gray-500'>
                  �� Você viu todos os posts!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
