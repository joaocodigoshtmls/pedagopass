import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function AdminSuggestions() {
  const [token, setToken] = useState(process.env.NEXT_PUBLIC_ADMIN_TOKEN || '');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api/suggestions', {
        headers: { 'x-admin-token': token }
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || 'Erro ao buscar sugestões');
      }
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Admin — Sugestões</title>
      </Head>

      <Layout>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Admin — Sugestões</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Token admin</label>
            <input value={token} onChange={e => setToken(e.target.value)} className="border rounded-md px-3 py-2 mt-1 w-full max-w-md" placeholder="Digite o token aqui" />
            <div className="mt-2">
              <button onClick={fetchSuggestions} className="btn-primary">Carregar sugestões</button>
            </div>
          </div>

          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {suggestions.length === 0 && !loading && <p>Nenhuma sugestão encontrada.</p>}

          {suggestions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Nome</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Mensagem</th>
                    <th className="px-4 py-2 border">Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestions.map(s => (
                    <tr key={s.id} className="odd:bg-gray-50">
                      <td className="px-4 py-2 border text-sm">{s.id}</td>
                      <td className="px-4 py-2 border text-sm">{s.name}</td>
                      <td className="px-4 py-2 border text-sm">{s.email}</td>
                      <td className="px-4 py-2 border text-sm">{s.message}</td>
                      <td className="px-4 py-2 border text-sm">{s.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
