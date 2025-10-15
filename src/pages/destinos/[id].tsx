import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Destino } from '@/types/destino';
import { getDestinoById } from '@/services/destinoService';
import { useEffect, useState } from 'react';

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

export default function DetalheDestino() {
  const router = useRouter();
  const { id } = router.query;
  
  const [destino, setDestino] = useState<Destino | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestino = async () => {
      if (!id) return;
      
      try {
        const data = await getDestinoById(id as string);
        setDestino(data);
      } catch (err) {
        setError('Falha ao carregar o destino');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestino();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-12 px-4">
          <p className="text-center">Carregando destino...</p>
        </div>
      </Layout>
    );
  }

  if (error || !destino) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-12 px-4">
          <p className="text-center text-red-600">{error || 'Destino não encontrado'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Imagem */}
            <div className="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
              {destino.imagem ? (
                <img
                  src={destino.imagem}
                  alt={destino.titulo}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400">Imagem não disponível</span>
                </div>
              )}
            </div>

            {/* Informações do destino */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {destino.titulo}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Detalhes da viagem</h2>
                <p className="text-3xl text-gray-900">{formatPrice(destino.preco)}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Descrição</h3>
                <div className="text-base text-gray-700 space-y-6">
                  <p>{destino.descricao}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Professor Responsável</h2>
                <div className="mt-4 prose prose-sm text-gray-500">
                  <h3 className="font-medium">{destino.professor.nome}</h3>
                  <p className="italic">{destino.professor.especialidade}</p>
                  <p>{destino.professor.bio}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">O que está incluído</h2>
                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                    {destino.inclui.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Informações importantes</h2>
                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                    <li>Data de início: {formatDate(destino.dataInicio)}</li>
                    <li>Data de término: {formatDate(destino.dataFim)}</li>
                    <li>Vagas disponíveis: {destino.vagas}</li>
                    <li>Localização: {destino.localizacao}</li>
                    <li>Categoria: {destino.categoria}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reservar agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
