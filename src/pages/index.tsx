import Layout from '@/components/Layout';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PedagoPass - Viagens para Professores</title>
        <meta name="description" content="Explore viagens feitas sob medida para professores. Descubra experiências educacionais únicas e enriquecedoras." />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <div className="min-h-[70vh] flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                PedagoPass — viagens e formação pensadas para professores
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Programas de formação, visitas culturais guiadas e oportunidades de networking para enriquecer sua prática pedagógica.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/destinos" className="btn-primary px-6 py-3">Ver destinos</Link>
                <Link href="/professores" className="inline-flex items-center justify-center border border-gray-300 px-5 py-3 rounded-md text-gray-700 hover:bg-gray-50">Área dos Professores</Link>
              </div>
            </div>

            {/* Cards de Destaque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Viagens Educacionais</h3>
                <p className="text-gray-600 text-sm">Destinos com conteúdo pedagógico, roteiros guiados e material de apoio para o professor.</p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Formação Continuada</h3>
                <p className="text-gray-600 text-sm">Workshops e cursos no local, com certificação e materiais práticos.</p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rede Profissional</h3>
                <p className="text-gray-600 text-sm">Conexões com outros educadores, troca de práticas e projetos colaborativos.</p>
              </div>
            </div>

            {/* Depoimentos curtos */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">O que dizem nossos participantes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-700 italic">"As formações aplicadas durante a viagem foram diretamente aproveitadas em sala de aula."</p>
                  <p className="mt-3 text-sm font-medium">— Maria Santos, Professora de História</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-700 italic">"Excelente organização e conteúdo prático. Recomendo a colegas."</p>
                  <p className="mt-3 text-sm font-medium">— João Oliveira, Professor de Geografia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
