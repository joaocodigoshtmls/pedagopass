import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface Destino {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  dataInicio: string;
  dataFim: string;
  vagas: number;
  localizacao: string;
  duracao: string;
  destaques: string[];
  inclui: string[];
  professor: {
    nome: string;
    especialidade: string;
    bio: string;
    foto: string;
  };
  itinerario: Array<{
    dia: number;
    titulo: string;
    atividades: string[];
  }>;
}

class DestinoController {
  private loadDestinos(): Destino[] {
    try {
      const dataPath = path.join(__dirname, '../data/destinos.json');
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao carregar destinos:', error);
      return [];
    }
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const destinos = this.loadDestinos();
      
      // Query parameters para filtros (opcional)
      const { categoria, precoMax, search } = req.query;
      
      let filteredDestinos = destinos;
      
      if (categoria) {
        filteredDestinos = filteredDestinos.filter(d => 
          d.categoria.toLowerCase() === String(categoria).toLowerCase()
        );
      }
      
      if (precoMax) {
        filteredDestinos = filteredDestinos.filter(d => 
          d.preco <= Number(precoMax)
        );
      }
      
      if (search) {
        const searchTerm = String(search).toLowerCase();
        filteredDestinos = filteredDestinos.filter(d => 
          d.titulo.toLowerCase().includes(searchTerm) ||
          d.descricao.toLowerCase().includes(searchTerm) ||
          d.localizacao.toLowerCase().includes(searchTerm)
        );
      }
      
      return res.status(200).json({
        success: true,
        data: filteredDestinos,
        total: filteredDestinos.length,
        message: 'Destinos carregados com sucesso'
      });
    } catch (error) {
      console.error('Erro ao buscar destinos:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? String(error) : 'Internal Server Error'
      });
    }
  }

  public show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const destinos = this.loadDestinos();
      
      const destino = destinos.find(d => d.id === id);
      
      if (!destino) {
        return res.status(404).json({
          success: false,
          message: 'Destino não encontrado',
          data: null
        });
      }
      
      return res.status(200).json({
        success: true,
        data: destino,
        message: 'Destino encontrado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao buscar destino:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? String(error) : 'Internal Server Error'
      });
    }
  }
}

export default new DestinoController();
