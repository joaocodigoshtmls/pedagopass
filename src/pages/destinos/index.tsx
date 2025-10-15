import { Destino } from '@/types/destino';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { getAllDestinos } from '@/services/destinoService';
import Link from 'next/link';

// Funções de formatação consistentes para evitar erro de hidratação
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString));
};

// Função para lidar com erros de imagem
const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  // Fallback simples para placeholder
  img.src = `https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Imagem+Indisponivel`;
};

export default function Destinos() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const data = await getAllDestinos();
        setDestinos(data);
      } catch (err) {
        setError('Falha ao carregar os destinos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🌟 Destinos Educacionais Selecionados
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Destinos Disponíveis
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Explore nossas viagens educacionais e encontre a opção perfeita para seu desenvolvimento profissional
            </p>
          </div>

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Carregando destinos...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {destinos.map((destino) => (
              <div key={destino.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={destino.imagem}
                    alt={destino.titulo}
                    onError={handleImageError}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {destino.categoria}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{destino.titulo}</h2>
                  <p className="text-gray-600 line-clamp-2 mb-4">{destino.descricao}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-600 font-bold text-lg">
                      {formatPrice(destino.preco)}
                    </span>
                    <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                      {destino.vagas} vagas
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4 space-y-1">
                    <p className="flex items-center">
                      <span className="mr-2">📍</span> {destino.localizacao}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">📅</span> {formatDate(destino.dataInicio)}
                    </p>
                  </div>
                  <Link
                    href={`/destinos/${destino.id}`}
                    className="block w-full text-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}