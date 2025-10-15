export interface Destino {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  preco: number;
  dataInicio: string;
  dataFim: string;
  vagas: number;
  categoria: string;
  localizacao: string;
  destaques: string[];
  inclui: string[];
  professor: {
    nome: string;
    especialidade: string;
    bio: string;
  };
}
