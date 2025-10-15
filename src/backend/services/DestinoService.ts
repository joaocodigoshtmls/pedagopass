import { Destino } from '../models/Destino';

class DestinoService {
  private destinos: Destino[] = [
    {
      id: '1',
      titulo: 'Imersão Cultural em São Paulo',
      descricao: 'Uma jornada única pelos principais museus e centros culturais de São Paulo, com workshops especializados para educadores.',
      imagem: 'https://example.com/sp-cultural.jpg',
      preco: 1200,
      dataInicio: '2024-01-15',
      dataFim: '2024-01-20',
      vagas: 20,
      categoria: 'Cultural',
      localizacao: 'São Paulo, SP',
      destaques: [
        'Visita guiada ao MASP',
        'Workshop de arte-educação',
        'Pinacoteca do Estado',
        'Instituto Tomie Ohtake'
      ],
      inclui: [
        'Hospedagem em hotel 4 estrelas',
        'Café da manhã',
        'Traslados',
        'Ingressos para museus',
        'Material didático'
      ],
      professor: {
        nome: 'Dra. Maria Silva',
        especialidade: 'Arte-educação',
        bio: 'Doutora em Educação pela USP, com 15 anos de experiência em museus.'
      }
    },
    {
      id: '2',
      titulo: 'Congresso de Educação no Rio',
      descricao: 'Participe do maior congresso de educação do Rio de Janeiro, com palestras, workshops e networking.',
      imagem: 'https://example.com/rj-congresso.jpg',
      preco: 1500,
      dataInicio: '2024-02-10',
      dataFim: '2024-02-15',
      vagas: 30,
      categoria: 'Congresso',
      localizacao: 'Rio de Janeiro, RJ',
      destaques: [
        'Palestras com especialistas internacionais',
        'Workshops práticos',
        'Certificado de 40 horas',
        'Networking com educadores'
      ],
      inclui: [
        'Hospedagem em hotel 4 estrelas',
        'Café da manhã',
        'Material do congresso',
        'Coquetel de networking',
        'Certificado'
      ],
      professor: {
        nome: 'Dr. João Santos',
        especialidade: 'Metodologias Ativas',
        bio: 'Pesquisador e autor de diversos livros sobre educação inovadora.'
      }
    },
    {
      id: '3',
      titulo: 'Expedição Científica na Amazônia',
      descricao: 'Uma experiência única de campo na Amazônia, ideal para professores de ciências e biologia.',
      imagem: 'https://example.com/amazonia.jpg',
      preco: 2200,
      dataInicio: '2024-03-20',
      dataFim: '2024-03-27',
      vagas: 15,
      categoria: 'Científica',
      localizacao: 'Manaus, AM',
      destaques: [
        'Pesquisa de campo',
        'Observação da fauna e flora',
        'Workshops de sustentabilidade',
        'Visita a comunidades locais'
      ],
      inclui: [
        'Hospedagem em lodge na floresta',
        'Todas as refeições',
        'Equipamentos de campo',
        'Guias especializados',
        'Material didático'
      ],
      professor: {
        nome: 'Dra. Ana Oliveira',
        especialidade: 'Biologia e Sustentabilidade',
        bio: 'Bióloga com vasta experiência em expedições científicas na Amazônia.'
      }
    }
  ];

  public findAll(): Destino[] {
    return this.destinos;
  }

  public findById(id: string): Destino | undefined {
    return this.destinos.find(destino => destino.id === id);
  }

  public search(query: string): Destino[] {
    const searchTerm = query.toLowerCase();
    return this.destinos.filter(destino => 
      destino.titulo.toLowerCase().includes(searchTerm) ||
      destino.descricao.toLowerCase().includes(searchTerm) ||
      destino.categoria.toLowerCase().includes(searchTerm) ||
      destino.localizacao.toLowerCase().includes(searchTerm)
    );
  }
}

export default new DestinoService();
