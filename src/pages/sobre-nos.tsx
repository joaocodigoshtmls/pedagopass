import Layout from '@/components/Layout';
import Head from 'next/head';

export default function SobreNos() {
  return (
    <>
      <Head>
        <title>Sobre Nós - PedagoPass</title>
        <meta name="description" content="Conheça a PedagoPass, rede social de experiências de viagem para professores" />
      </Head>
      
      <Layout>
        <div className="bg-white">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Sobre Nós
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                  Uma rede social dedicada a conectar professores através de experiências de viagem educacional
                </p>
              </div>
            </div>
          </div>

          {/* Missão, Visão e Valores */}
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Missão */}
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
                  <p className="text-gray-600">
                    Conectar educadores globalmente através de uma plataforma social onde podem 
                    compartilhar experiências de viagem, recomendar destinos e acumular benefícios 
                    para suas próximas aventuras educacionais.
                  </p>
                </div>

                {/* Visão */}
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Visão</h3>
                  <p className="text-gray-600">
                    Ser a principal rede social mundial de professores viajantes, 
                    transformando cada experiência de viagem em uma oportunidade de 
                    crescimento pessoal, profissional e pedagógico.
                  </p>
                </div>

                {/* Valores */}
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossos Valores</h3>
                  <p className="text-gray-600">
                    Comunidade, aprendizado contínuo, diversidade cultural e 
                    sustentabilidade. Acreditamos no poder da educação para 
                    transformar vidas e construir um mundo melhor.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Como Funciona */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Como Funciona o PedagoPass
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Uma plataforma social completa para professores compartilharem e descobrirem experiências de viagem
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Passo 1 */}
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Compartilhe</h4>
                  <p className="text-gray-600 text-sm">
                    Publique fotos, vídeos e relatos de suas experiências de viagem educacional no Feed
                  </p>
                </div>

                {/* Passo 2 */}
                <div className="text-center">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Conecte-se</h4>
                  <p className="text-gray-600 text-sm">
                    Participe de comunidades temáticas e conecte-se com professores de interesses similares
                  </p>
                </div>

                {/* Passo 3 */}
                <div className="text-center">
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h4 className="text-lg font-semibool text-gray-900 mb-2">Acumule Pontos</h4>
                  <p className="text-gray-600 text-sm">
                    Ganhe pontos ao fazer posts, recomendações e interagir com a comunidade
                  </p>
                </div>

                {/* Passo 4 */}
                <div className="text-center">
                  <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Obtenha Benefícios</h4>
                  <p className="text-gray-600 text-sm">
                    Troque seus pontos por descontos em passagens, hospedagem e experiências
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Funcionalidades Principais */}
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Funcionalidades Principais
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Feed */}
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Feed Social</h4>
                  <p className="text-gray-600">
                    Timeline personalizada com posts de experiências de viagem de outros educadores
                  </p>
                </div>

                {/* Comunidades */}
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Comunidades</h4>
                  <p className="text-gray-600">
                    Grupos temáticos para interação e troca de experiências entre professores
                  </p>
                </div>

                {/* Sistema de Pontos */}
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Sistema de Pontos</h4>
                  <p className="text-gray-600">
                    Gamificação que recompensa participação ativa na plataforma
                  </p>
                </div>

                {/* Roteiros */}
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Roteiros</h4>
                  <p className="text-gray-600">
                    Descubra e compartilhe roteiros de viagem educacional testados por outros professores
                  </p>
                </div>

                {/* Benefícios */}
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Benefícios Exclusivos</h4>
                  <p className="text-gray-600">
                    Parcerias com empresas de viagem para descontos especiais para educadores
                  </p>
                </div>

                {/* Perfil */}
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Perfil Personalizado</h4>
                  <p className="text-gray-600">
                    Gerencie suas informações, posts, pontos e acompanhe seu progresso na plataforma
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-blue-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                
                <div>
                  <div className="text-4xl font-bold mb-2">1000+</div>
                  <div className="text-blue-200">Professores Conectados</div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-blue-200">Destinos Recomendados</div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2">25</div>
                  <div className="text-blue-200">Comunidades Ativas</div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-blue-200">Experiências Compartilhadas</div>
                </div>

              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pronto para começar sua jornada?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Junte-se à maior rede social de professores viajantes e transforme suas experiências educacionais
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/cadastro"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                >
                  Criar Conta Gratuita
                </a>
                <a
                  href="/feed"
                  className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition duration-300"
                >
                  Explorar Feed
                </a>
              </div>
            </div>
          </div>

        </div>
      </Layout>
    </>
  );
}