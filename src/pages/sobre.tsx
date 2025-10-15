import Layout from '@/components/Layout';
import Head from 'next/head';

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre - PedagoPass</title>
        <meta name="description" content="Conheça a PedagoPass, plataforma dedicada a viagens educacionais para professores" />
      </Head>
      
      <Layout>
        <div className="bg-white">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Sobre a PedagoPass
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                  Transformando a educação através de experiências únicas de aprendizado
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
                    Conectar educadores com experiências transformadoras de aprendizado, 
                    proporcionando viagens educacionais que enriquecem a prática pedagógica 
                    e ampliam horizontes profissionais.
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
                    Ser a principal plataforma de viagens educacionais do Brasil, 
                    reconhecida por promover a excelência em educação através de 
                    experiências culturais e pedagógicas inovadoras.
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
                    Excelência educacional, inovação pedagógica, sustentabilidade, 
                    diversidade cultural e compromisso com o desenvolvimento contínuo 
                    dos profissionais da educação.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nossa História */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossa História</h2>
                <div className="prose prose-lg text-gray-600 mx-auto">
                  <p className="mb-6">
                    A PedagoPass nasceu da necessidade de conectar educadores com experiências 
                    transformadoras que vão além da sala de aula. Fundada em 2024, nossa plataforma 
                    foi criada por um grupo de pedagogos e especialistas em turismo educacional.
                  </p>
                  <p className="mb-6">
                    Acreditamos que as melhores práticas pedagógicas surgem quando professores 
                    têm a oportunidade de vivenciar diferentes culturas, metodologias e 
                    contextos educacionais ao redor do mundo.
                  </p>
                  <p>
                    Hoje, já conectamos centenas de educadores com experiências únicas, 
                    contribuindo para uma educação mais rica, diversa e significativa 
                    em todo o Brasil.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nossos Números */}
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Nossos Números
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Professores Atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-gray-600">Destinos Oferecidos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-gray-600">Países Visitados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">Satisfação dos Clientes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Equipe */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Nossa Equipe
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dra. Ana Silva</h3>
                    <p className="text-blue-600 font-medium mb-3">Fundadora e CEO</p>
                    <p className="text-gray-600 text-sm">
                      Doutora em Educação com 15 anos de experiência em turismo pedagógico 
                      e desenvolvimento de metodologias inovadoras.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-green-400 to-green-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Prof. Carlos Romano</h3>
                    <p className="text-green-600 font-medium mb-3">Diretor Pedagógico</p>
                    <p className="text-gray-600 text-sm">
                      Especialista em História Antiga e Metodologias Ativas, 
                      responsável pelo desenvolvimento dos roteiros educacionais.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dra. Sofia Papadopoulos</h3>
                    <p className="text-purple-600 font-medium mb-3">Coordenadora de Intercâmbios</p>
                    <p className="text-gray-600 text-sm">
                      Filósofa e especialista em relações internacionais, 
                      coordena parcerias com instituições educacionais globais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Pronto para transformar sua jornada educacional?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de educadores que já descobriram o poder 
                das viagens pedagógicas com a PedagoPass.
              </p>
              <div className="space-x-4">
                <a
                  href="/destinos"
                  className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                  Ver Destinos
                </a>
                <a
                  href="/"
                  className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-200"
                >
                  Saber Mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
