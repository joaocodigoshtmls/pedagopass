import { useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Link from 'next/link';

export default function Professores() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; text?: string }>({ type: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null });

    // Client-side validation
    const clientErrors: Record<string, string> = {};
    if (!message || message.trim().length < 10) {
      clientErrors.message = 'A mensagem deve ter ao menos 10 caracteres.';
    } else if (message.trim().length > 2000) {
      clientErrors.message = 'A mensagem pode ter no máximo 2000 caracteres.';
    }

    if (name && name.trim().length > 100) {
      clientErrors.name = 'O nome pode ter no máximo 100 caracteres.';
    }

    if (email && email.trim().length > 200) {
      clientErrors.email = 'O e-mail pode ter no máximo 200 caracteres.';
    }

    if (email && email.trim().length > 0) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
      if (!re.test(email.trim())) {
        clientErrors.email = 'Formato de e-mail inválido.';
      }
    }

    if (Object.keys(clientErrors).length > 0) {
      setStatus({ type: 'error', text: Object.values(clientErrors).join(' ') });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() })
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || 'Erro ao enviar sugestão');
      }

      setStatus({ type: 'success', text: 'Sugestão enviada. Obrigado!' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || 'Erro ao enviar sugestão' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Área dos Professores — PedagoPass</title>
        <meta name="description" content="Recursos e formações para professores." />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Área dos Professores</h1>
          <p className="text-gray-600 mb-6">Bem-vindo(a). Aqui você encontra recursos, formações e materiais para planejar atividades pedagógicas durante as viagens.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-semibold text-gray-900">Recursos Didáticos</h3>
              <p className="text-gray-600 text-sm mt-2">Planos de aula, guias de visita e materiais para trabalhar em sala antes e depois das viagens.</p>
              <Link href="/professores/recursos" className="mt-4 inline-block text-blue-600">Ver recursos →</Link>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900">Formações</h3>
              <p className="text-gray-600 text-sm mt-2">Calendário de cursos e workshops com instrutores especialistas.</p>
              <Link href="/professores/formacoes" className="mt-4 inline-block text-blue-600">Ver formações →</Link>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Sugerir um tema</h2>
            <p className="text-gray-600 mb-2">Tem algum tema ou atividade que gostaria de ver em futuras viagens? Envie sua sugestão.</p>
            <form onSubmit={handleSubmit} className="grid gap-3 max-w-xl">
              <input value={name} onChange={e => setName(e.target.value)} className="border rounded-md px-3 py-2" placeholder="Seu nome" />
              <input value={email} onChange={e => setEmail(e.target.value)} className="border rounded-md px-3 py-2" placeholder="Seu e-mail" />
              <textarea value={message} onChange={e => setMessage(e.target.value)} className="border rounded-md px-3 py-2" rows={4} placeholder="Descrição da sugestão" />

              <div className="flex items-center gap-3">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Enviando...' : 'Enviar sugestão'}
                </button>
                {status.type === 'success' && <p className="text-green-600">{status.text}</p>}
                {status.type === 'error' && <p className="text-red-600">{status.text}</p>}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

