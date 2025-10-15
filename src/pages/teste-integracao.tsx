import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { getAllDestinos, getDestinoById } from '@/services/destinoService';
import { Destino } from '@/types/destino';

export default function TesteIntegracao() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [destinoDetalhes, setDestinoDetalhes] = useState<Destino | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testarListaDestinos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllDestinos();
      setDestinos(data);
      console.log('✅ Lista de destinos carregada:', data.length, 'destinos');
    } catch (err) {
      setError('Erro ao carregar lista de destinos');
      console.error('❌ Erro na lista:', err);
    } finally {
      setLoading(false);
    }
  };

  const testarDetalhesDestino = async (id: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await getDestinoById(id);
      setDestinoDetalhes(data);
      console.log('✅ Detalhes do destino carregados:', data.titulo);
    } catch (err) {
      setError('Erro ao carregar detalhes do destino');
      console.error('❌ Erro nos detalhes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Testa automaticamente ao carregar a página
    testarListaDestinos();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Teste de Integração Frontend + Backend
          </h1>
          <p className="text-gray-600">
            Esta página testa se a comunicação entre frontend e backend está funcionando
          </p>
        </div>

        {/* Seção de testes */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Testes de API</h2>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={testarListaDestinos}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Testar Lista de Destinos'}
            </button>
            
            <button
              onClick={() => testarDetalhesDestino('1')}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Testar Detalhes (ID: 1)'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>

        {/* Resultados */}
        {destinos.length > 0 && (
          <div className="bg-green-50 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              ✅ Lista de Destinos ({destinos.length} encontrados)
            </h2>
            <div className="grid gap-4">
              {destinos.map(destino => (
                <div key={destino.id} className="bg-white p-4 rounded border">
                  <h3 className="font-semibold">{destino.titulo}</h3>
                  <p className="text-sm text-gray-600">{destino.localizacao}</p>
                  <p className="text-sm text-blue-600">R$ {destino.preco}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {destinoDetalhes && (
          <div className="bg-blue-50 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              ✅ Detalhes do Destino
            </h2>
            <div className="bg-white p-4 rounded border">
              <h3 className="text-lg font-semibold mb-2">{destinoDetalhes.titulo}</h3>
              <p className="text-gray-600 mb-2">{destinoDetalhes.descricao}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Localização:</strong> {destinoDetalhes.localizacao}
                </div>
                <div>
                  <strong>Preço:</strong> R$ {destinoDetalhes.preco}
                </div>
                <div>
                  <strong>Data Início:</strong> {destinoDetalhes.dataInicio}
                </div>
                <div>
                  <strong>Vagas:</strong> {destinoDetalhes.vagas}
                </div>
              </div>
              {destinoDetalhes.professor && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold">Professor Responsável:</h4>
                  <p>{destinoDetalhes.professor.nome} - {destinoDetalhes.professor.especialidade}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Abra o console do navegador (F12) para ver os logs detalhados dos testes
          </p>
        </div>
      </div>
    </Layout>
  );
}
